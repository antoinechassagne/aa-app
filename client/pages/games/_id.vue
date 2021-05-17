<template>
  <Loader v-if="loading" />
  <div v-else>
    <FeedbackMessage v-if="error" type="error">
      {{ error }}
    </FeedbackMessage>
    <Heading level="1" class="mb-10">{{ game.boardGameName }}</Heading>
    <p>Créée par {{ game.creator.pseudo }}</p>
    <p>{{ game.description }}</p>
    <p>Date : {{ gamePlannedDate }}</p>
    <p>Joueurs manquants : {{ game.missingPlayers }}</p>
    <section v-if="!loggedUserIsCreator" class="mt-10">
      <div v-if="loggedUser">
        <p v-if="hasParticipate">Vous avez participé à cette partie</p>
        <p v-if="willParticipate">Vous êtes inscris à cette partie</p>
        <button v-if="canCreateParticipation" @click="requestToParticipate">Demander à rejoindre</button>
        <button v-if="canCancelParticipation" @click="cancelParticipation">Annuler la demande</button>
      </div>
      <route-link v-if="!loggedUser && !gameIsPast" to="/login">
        Vous devez être connecté pour rejoindre cette partie
      </route-link>
    </section>
    <section v-if="loggedUserIsCreator">
      <Heading level="4" class="mt-10 mb-5">Demande de participations</Heading>
      <template v-if="participationsToDisplay.length">
        <ul v-for="participation in participationsToDisplay" :key="participation.id">
          <li>
            <p>{{ participation.user.pseudo }} - {{ getParticipationStatusLabel(participation.statusId) }}</p>
            <template v-if="!gameIsPast">
              <button v-if="canRefuseUserParticipation(participation)" @click="refuseUserParticipation(participation)">
                Refuser la demande
              </button>
              <button v-if="canAcceptUserParticipation(participation)" @click="acceptUserParticipation(participation)">
                Accepter la demande
              </button>
              <button v-if="canCancelUserParticipation(participation)" @click="cancelUserParticipation(participation)">
                Annuler la participation
              </button>
            </template>
          </li>
        </ul>
      </template>
      <p v-else>Aucune participations pour le moment.</p>
    </section>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapGetters, mapActions } from "vuex";
import Loader from "@/components/Loader";
import Heading from "@/components/texts/Heading";
import FeedbackMessage from "@/components/FeedbackMessage";
const participationStatuses = require("../../../common/constants/participationStatuses");

export default {
  name: "PageGame",
  components: {
    Loader,
    Heading,
    FeedbackMessage,
  },
  async fetch({ params, store }) {
    await Promise.all([
      store.dispatch("games/fetchGame", params.id),
      store.dispatch("participations/fetchParticipations", { gameId: params.id }),
    ]);
  },
  computed: {
    ...mapGetters({
      loggedUser: "authentication/loggedUser",
      game: "games/game",
      loading: "games/loading",
      error: "games/error",
      participations: "participations/participations",
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
      const date = dayjs(this.game.plannedDate).format("DD/MM/YYYY");
      const hour = dayjs(this.game.plannedDate).format("hh:mm");
      return `${date} à ${hour}`;
    },
    loggedUserIsCreator() {
      return this.loggedUser && this.game.creatorId === this.loggedUser.id;
    },
    loggedUserParticipation() {
      return !this.loggedUserIsCreator && this.game.participations
        ? this.game.participations.find((participation) => participation.userId === this.loggedUser.id)
        : null;
    },
    gameIsPast() {
      return dayjs(this.game.plannedDate).isBefore(dayjs());
    },
    canCreateParticipation() {
      return !this.loggedUserIsCreator && !this.gameIsPast && !this.loggedUserParticipation;
    },
    canCancelParticipation() {
      if (!this.loggedUserParticipation) {
        return false;
      }
      const isCancelable = [participationStatuses.PENDING, participationStatuses.ACCEPTED].includes(
        this.loggedUserParticipation.statusId
      );
      return isCancelable && !this.gameIsPast;
    },
    hasParticipate() {
      return (
        this.gameIsPast &&
        this.loggedUserParticipation &&
        this.loggedUserParticipation.statusId === participationStatuses.ACCEPTED
      );
    },
    willParticipate() {
      return (
        !this.gameIsPast &&
        this.loggedUserParticipation &&
        this.loggedUserParticipation.statusId === participationStatuses.ACCEPTED
      );
    },
  },
  methods: {
    ...mapActions({
      fetchGame: "games/fetchGame",
      cleanError: "games/cleanError",
      createParticipation: "participations/createParticipation",
      acceptParticipation: "participations/acceptParticipation",
      refuseParticipation: "participations/refuseParticipation",
      deleteParticipation: "participations/deleteParticipation",
    }),
    requestToParticipate() {
      this.createParticipation(this.game.id).then(() => {
        this.fetchGame(this.$route.params.id);
      });
    },
    cancelParticipation() {
      this.deleteParticipation(this.loggedUserParticipation.id).then(() => {
        this.fetchGame(this.$route.params.id);
      });
    },
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
    refuseUserParticipation(participation) {
      this.refuseParticipation(participation.id).then(() => {
        Promise.all([
          this.fetchGame(this.$route.params.id),
          this.fetchParticipations({ gameId: this.$route.params.id }),
        ]);
      });
    },
    acceptUserParticipation(participation) {
      this.acceptParticipation(participation.id).then(() => {
        Promise.all([
          this.fetchGame(this.$route.params.id),
          this.fetchParticipations({ gameId: this.$route.params.id }),
        ]);
      });
    },
    cancelUserParticipation(participation) {
      this.deleteParticipation(participation.id).then(() => {
        Promise.all([
          this.fetchGame(this.$route.params.id),
          this.fetchParticipations({ gameId: this.$route.params.id }),
        ]);
      });
    },
  },
  destroyed() {
    this.cleanError();
  },
};
</script>
