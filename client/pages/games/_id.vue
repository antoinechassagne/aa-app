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
        <button v-if="canCreateParticipation" @click="requestToParticipate">Demander à rejoindre</button>
        <button v-if="canCancelParticipation" @click="cancelParticipation">Annuler la demande</button>
        <p v-if="hasParticipate">Vous avez participé à cette partie</p>
      </div>
      <route-link v-if="!loggedUser && !gameIsPast" to="/login">
        Vous devez être connecté pour rejoindre cette partie
      </route-link>
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
    await store.dispatch("games/fetchGame", params.id);
  },
  computed: {
    ...mapGetters({
      game: "games/game",
      loading: "games/loading",
      error: "games/error",
      loggedUser: "authentication/loggedUser",
    }),
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
      return this.loggedUserParticipation && this.loggedUserParticipation.statusId === participationStatuses.ACCEPTED;
    },
  },
  methods: {
    ...mapActions({
      fetchGame: "games/fetchGame",
      cleanError: "games/cleanError",
      createParticipation: "participations/createParticipation",
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
  },
  destroyed() {
    this.cleanError();
  },
};
</script>
