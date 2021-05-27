<template>
  <Loader v-if="loading" />
  <div v-else>
    <FeedbackMessage v-if="error" type="error">
      {{ error }}
    </FeedbackMessage>
    <Heading level="1">{{ game.boardGameName }}</Heading>
    <p>Créée par {{ game.creator.pseudo }}</p>
    <p>Catégorie : {{ game.category.label }}</p>
    <p>{{ game.description }}</p>
    <p>Date : {{ gamePlannedDate }}</p>
    <p>Joueurs manquants : {{ game.missingPlayers }}</p>
    <section v-if="!userIsCreator">
      <div v-if="user">
        <p v-if="hasParticipate">Vous avez participé à cette partie</p>
        <p v-if="willParticipate">Vous êtes inscris à cette partie</p>
        <ButtonPrimary v-if="canCreateParticipation" @click="requestToParticipate">Demander à rejoindre</ButtonPrimary>
        <ButtonDanger v-if="canCancelParticipation" @click="cancelParticipation">Annuler la demande</ButtonDanger>
      </div>
      <route-link v-if="!user && !gameIsPast" to="/login">
        Vous devez être connecté pour rejoindre cette partie
      </route-link>
    </section>
    <section v-if="userIsCreator">
      <Heading level="4">Demande de participations</Heading>
      <template v-if="participationsToDisplay.length">
        <ul v-for="participation in participationsToDisplay" :key="participation.id">
          <li>
            <p>{{ participation.user.pseudo }} - {{ getParticipationStatusLabel(participation.statusId) }}</p>
            <template v-if="!gameIsPast">
              <ButtonDanger
                v-if="canRefuseUserParticipation(participation)"
                @click="refuseUserParticipation(participation)"
              >
                Refuser la demande
              </ButtonDanger>
              <ButtonPrimary
                v-if="canAcceptUserParticipation(participation)"
                @click="acceptUserParticipation(participation)"
              >
                Accepter la demande
              </ButtonPrimary>
              <ButtonDanger
                v-if="canCancelUserParticipation(participation)"
                @click="cancelUserParticipation(participation)"
              >
                Annuler la participation
              </ButtonDanger>
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
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import ButtonDanger from "@/components/buttons/ButtonDanger";
import FeedbackMessage from "@/components/FeedbackMessage";
import participationStatuses from "@/constants/participationStatuses";
export default {
  name: "PageGame",
  components: {
    Loader,
    Heading,
    ButtonPrimary,
    ButtonDanger,
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
      user: "authentication/user",
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
  },
  methods: {
    ...mapActions({
      fetchGame: "games/fetchGame",
      cleanError: "games/cleanError",
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
    requestToParticipate() {
      this.createParticipation(this.game.id).then(() => {
        this.refreshData();
      });
    },
    cancelParticipation() {
      this.deleteParticipation(this.userParticipation.id).then(() => {
        this.refreshData();
      });
    },
    refuseUserParticipation(participation) {
      this.refuseParticipation(participation.id).then(() => {
        this.refreshData();
      });
    },
    acceptUserParticipation(participation) {
      this.acceptParticipation(participation.id).then(() => {
        this.refreshData();
      });
    },
    cancelUserParticipation(participation) {
      this.deleteParticipation(participation.id).then(() => {
        this.refreshData();
      });
    },
    refreshData() {
      Promise.all([this.fetchGame(this.$route.params.id), this.fetchParticipations({ gameId: this.$route.params.id })]);
    },
  },
  destroyed() {
    this.cleanError();
  },
};
</script>
