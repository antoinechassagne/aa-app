<template>
  <div class="container">
    <div class="game-content">
      <div class="left-side">
        <div class="game-hero">
          <img
            :src="require(`~/assets/images/gameCategories/${game.category.imageName}.png`)"
            :alt="`Illustration ${game.category.label}`"
            class="card-game__image"
          />
          <div class="text-content">
            <Heading level="3" class="color-grey capitalize"> {{ game.creator.pseudo }} Propose</Heading>
            <Heading level="2">{{ game.boardGameName }}</Heading>
            <p class="color-primary">{{ gamePlannedDate }}</p>
            <p class="tertiary">{{ game.category.label }}</p>
          </div>
        </div>
        <span class="subheading">Description</span>
        <p class="description">{{ game.description }}</p>
        <GamesMap :location="location" :games="[game]" :showPopups="false" class="map" />
      </div>
      <div class="right-side">
        <div class="status">
          <section v-if="!userIsCreator">
            <div v-if="user" class="status-not-creator">
              <p v-if="hasParticipate" class="color-green">Vous avez participé à cette partie</p>
              <p v-if="willParticipate" class="color-green">Vous êtes inscris à cette partie</p>
              <p v-if="canCreateParticipation">Demandez pour participer</p>
              <p v-if="canCancelParticipation">Annuler la demande</p>
              <ButtonPrimary
                v-if="canCreateParticipation"
                :loading="loading.createParticipation"
                @click="requestToParticipate"
              >
                Demander à rejoindre
              </ButtonPrimary>
              <ButtonDanger
                v-if="canCancelParticipation"
                :loading="loading.deleteParticipation"
                @click="cancelParticipation"
                :empty="true"
              >
                Annuler la demande
              </ButtonDanger>
            </div>
            <route-link v-if="!user && !gameIsPast" to="/login">
              Vous devez être connecté pour rejoindre cette partie
            </route-link>
          </section>
          <section v-if="userIsCreator">
            <span class="subheading creator-title">Mes participations</span>
            <div class="user-is-creator">
              <template v-if="participationsToDisplay.length">
                <ul v-for="participation in participationsToDisplay" :key="participation.id">
                  <li class="list-participation">
                    <div class="participation-text">
                      <span>
                        {{ participation.user.pseudo }}
                      </span>
                      <p>
                        {{ getParticipationStatusLabel(participation.statusId) }}
                      </p>
                    </div>
                    <div class="participation-button-container">
                      <template v-if="!gameIsPast">
                        <ButtonPrimary
                          v-if="canAcceptUserParticipation(participation)"
                          :loading="loading.updateParticipation"
                          @click="acceptUserParticipation(participation)"
                        >
                          Accepter
                        </ButtonPrimary>
                        <ButtonPrimary
                          v-if="canRefuseUserParticipation(participation)"
                          :loading="loading.updateParticipation"
                          @click="refuseUserParticipation(participation)"
                          :empty="true"
                        >
                          Refuser
                        </ButtonPrimary>

                        <ButtonDanger
                          v-if="canCancelUserParticipation(participation)"
                          :loading="loading.deleteParticipation"
                          @click="cancelUserParticipation(participation)"
                          :empty="true"
                        >
                          Annuler
                        </ButtonDanger>
                      </template>
                    </div>
                  </li>
                </ul>
              </template>
              <span v-else class="color-grey">Aucune demande participation pour le moment</span>
            </div>
          </section>
        </div>
        <div class="missing-players">
          <Heading class="color-white pastille" level="2">{{ game.missingPlayers }}</Heading>
          <p>Joueurs manquants</p>
        </div>

        <div v-if="userIsCreator || willParticipate" class="user-info">
          <div>
            <div class="info-heading">
              <img src="~/assets/images/icons/location.svg" alt="" />
              <span class="subheading">Addresse</span>
            </div>
            <p class="description">{{ game.location }}</p>
          </div>
          <div>
            <div class="info-heading">
              <img src="~/assets/images/icons/phone.svg" alt="" />
              <span class="subheading">Telephone</span>
            </div>
            <p class="description">{{ game.creator.phone }}</p>
          </div>
        </div>
        <div class="time-to-game">
          <div class="info-heading">
            <img src="~/assets/images/icons/time.svg" alt="" />
            <p v-if="gameIsPast">La partie s'est déroulé il y a:</p>
            <p v-else>La partie commence dans :</p>
          </div>
          <Heading class="color-primary" level="3">{{ timeToGame }}</Heading>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";
import { mapGetters, mapActions } from "vuex";
import Loader from "@/components/Loader";
import Heading from "@/components/texts/Heading";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import ButtonDanger from "@/components/buttons/ButtonDanger";
import participationStatuses from "@/constants/participationStatuses";
import GamesMap from "@/components/map/GamesMap";

dayjs.extend(relativeTime);

export default {
  name: "PageGame",
  components: {
    Loader,
    Heading,
    ButtonPrimary,
    ButtonDanger,
    GamesMap,
  },
  async asyncData({ params, store, error }) {
    try {
      const [game, participations] = await Promise.all([
        store.dispatch("games/fetchGame", params.id),
        store.dispatch("participations/fetchParticipations", { gameId: params.id }),
      ]);
      return { game, participations };
    } catch (err) {
      error({ error: err });
    }
  },
  data() {
    return {
      loading: {
        createParticipation: false,
        deleteParticipation: false,
        updateParticipation: false,
      },
    };
  },
  computed: {
    ...mapGetters({
      user: "authentication/user",
    }),
    participationsToDisplay() {
      if (!this.participations || !this.participations.length) {
        return [];
      }
      if (this.gameIsPast) {
        return this.participations.filter((participation) => participation.statusId === participationStatuses.ACCEPTED);
      }
      return this.participations.filter((participation) =>
        [participationStatuses.PENDING, participationStatuses.ACCEPTED].includes(participation.statusId)
      );
    },
    gamePlannedDate() {
      const date = dayjs(this.game.plannedDate).locale("fr").format("ddd DD MMM YYYY");
      const hour = dayjs(this.game.plannedDate).locale("fr").format("HH:mm");
      return `${date} à ${hour}`;
    },
    timeToGame() {
      const timeToGame = dayjs(this.game.plannedDate).locale("fr").fromNow(true);
      return timeToGame;
    },
    userIsCreator() {
      return this.user && this.game.creatorId === this.user.id;
    },
    userParticipation() {
      return !this.userIsCreator && this.participations
        ? this.participations.find((participation) => participation.userId === this.user.id)
        : null;
    },
    gameIsPast() {
      return dayjs(this.game.plannedDate).isBefore(dayjs());
    },
    canCreateParticipation() {
      return !this.userIsCreator && !this.gameIsPast && !this.userParticipation;
    },
    canCancelParticipation() {
      if (!this.userParticipation) {
        return false;
      }
      const isCancelable = [participationStatuses.PENDING, participationStatuses.ACCEPTED].includes(
        this.userParticipation.statusId
      );
      return isCancelable && !this.gameIsPast;
    },
    hasParticipate() {
      return (
        this.gameIsPast && this.userParticipation && this.userParticipation.statusId === participationStatuses.ACCEPTED
      );
    },
    willParticipate() {
      return (
        !this.gameIsPast && this.userParticipation && this.userParticipation.statusId === participationStatuses.ACCEPTED
      );
    },
    location() {
      return { longitude: this.game.longitude, latitude: this.game.latitude };
    },
  },
  methods: {
    ...mapActions({
      fetchGame: "games/fetchGame",
      fetchParticipations: "participations/fetchParticipations",
      createParticipation: "participations/createParticipation",
      acceptParticipation: "participations/acceptParticipation",
      refuseParticipation: "participations/refuseParticipation",
      deleteParticipation: "participations/deleteParticipation",
    }),
    getParticipationStatusLabel(statusId) {
      switch (statusId) {
        case 1:
          return "En attente de confirmation";
        case 2:
          return "Accepté";
        default:
          break;
      }
    },
    canRefuseUserParticipation(participation) {
      return participation.statusId === participationStatuses.PENDING;
    },
    canAcceptUserParticipation(participation) {
      return participation.statusId === participationStatuses.PENDING;
    },
    canCancelUserParticipation(participation) {
      return participation.statusId === participationStatuses.ACCEPTED;
    },
    async requestToParticipate() {
      await this.createParticipation(this.game.id);
      this.refreshData();
    },
    async cancelParticipation() {
      await this.deleteParticipation(this.userParticipation.id);
      this.refreshData();
    },
    async refuseUserParticipation(participation) {
      await this.refuseParticipation(participation.id);
      this.refreshData();
    },
    async acceptUserParticipation(participation) {
      await this.acceptParticipation(participation.id);
      this.refreshData();
    },
    async cancelUserParticipation(participation) {
      await this.deleteParticipation(participation.id);
      this.refreshData();
    },
    async refreshData() {
      const [game, participations] = await Promise.all([
        this.fetchGame(this.$route.params.id),
        this.fetchParticipations({ gameId: this.$route.params.id }),
      ]);
      this.game = game;
      this.participations = participations;
    },
  },
};
</script>

<style scoped lang="scss">
.game-content {
  display: flex;

  @include on-mobile {
    display: flex;
    flex-direction: column;
  }
}
.left-side {
  width: 55%;

  @include on-mobile {
    width: 100%;
  }
}
.game-hero {
  margin-top: 2rem;
  display: flex;
  margin-bottom: 2rem;
  align-items: center;

  @include on-mobile {
    display: flex;
    flex-direction: column;
  }
}
.game-hero img {
  width: 200px;
  height: auto;
  border-radius: 100%;

  @include on-mobile {
    width: 150px;
    margin-bottom: 1rem;
  }
}
.text-content {
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;

  @include on-mobile {
    align-items: center;
    margin-left: 0;
  }
}
.text-content > * {
  margin: 0.5rem 0 0.5rem 0;
}
.description {
  margin: 2rem 0 1rem 0;
}
.map {
  width: 100%;
  height: 33vh;
  border-radius: 10px;
  margin: 2rem 0 2rem 0;
}
.right-side {
  width: 50%;
  padding: 1rem 0 1rem 1rem;

  @include on-mobile {
    width: 100%;
  }
}
.missing-players {
  width: 100%;
  display: flex;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  border: 1px solid $color-grey;
  border-radius: 5px;
}
.missing-players p {
  margin-left: 2rem;
}
.status {
  width: 100%;
  padding: 2rem;
  border: 1px solid $color-grey;
  border-radius: 5px;
  margin: 2rem 0 2rem 0;
}
.status-not-creator {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.user-is-creator {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}
.creator-title {
  margin-bottom: 2rem;
}
.list-participation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0 1rem 0;
  border-bottom: 1px solid $color-grey;

  @include on-mobile {
    flex-direction: column;
    align-items: flex-start;
  }
}
.participation-button-container {
  display: flex;

  @include on-mobile {
    width: 100%;
    justify-content: space-between;
  }
}
.participation-button-container button {
  font-size: 0.8rem;
  margin-left: 1rem;
  line-height: 1;

  @include on-mobile {
    margin-left: 0;
  }
}
.participation-text {
  display: flex;
  flex-direction: column;
  width: 25%;

  @include on-mobile {
    width: 100%;
    margin-bottom: 1rem;
  }
}
.participation-text span {
  font-size: 1rem;
  color: $color-primary;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.participation-text p {
  font-size: 0.8rem;
}

.pastille {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 2rem;
  background-color: $color-primary;
}

.user-info {
  display: flex;
  justify-content: space-between;
  margin: 2rem 0 2rem 0;
  padding: 0 1rem 0 1rem;

  @include on-mobile {
    width: 100%;
    margin: 1rem 0 1rem 0;
    flex-direction: column;
  }
}
.user-info > div {
  width: 40%;

  @include on-mobile {
    width: 100%;
    margin: 1rem 0 1rem 0;
  }
}
.info-heading {
  display: flex;
  align-items: center;
}
.info-heading img {
  margin-right: 1rem;
}
.time-to-game {
  display: flex;
  padding: 0 1rem 0 1rem;
  align-items: center;
}
.time-to-game p {
  margin-right: 1rem;
  line-height: 1;
}
</style>
