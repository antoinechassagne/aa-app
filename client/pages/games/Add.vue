<template>
  <div>
    <Heading level="1" class="mb-10">Créer une nouvelle partie</Heading>
    <FeedbackMessage v-if="!isGeolocationSupported" type="warning" class="mb-4">
      Votre navigateur internet ne dispose pas de la fonctionnalité de géolocalisation. Veuillez utiliser un navigateur
      internet plus récent.
    </FeedbackMessage>
    <FeedbackMessage v-if="!isGeolocationEnabled" type="warning" class="mb-4">
      Votre navigateur a bloqué la fonctionnalité de géolocalisation. Veuillez l'activer afin de poursuivre la création
      de la partie.
    </FeedbackMessage>
    <FeedbackMessage v-if="isThereGeoLocationError" type="error" class="mb-4">
      Une erreur est survenue lors de votre géolocalisation. Veuillez réessayer dans quelques minutes.
    </FeedbackMessage>
    <form @submit="submit">
      <div class="flex flex-col">
        <label for="boardGameName">Nom du jeu :</label>
        <input
          v-model="boardGameName"
          id="boardGameName"
          type="text"
          placeholder="Saisissez le nom du jeu"
          required
          class="border-2 border-indigo-400 rounded p-1"
        />
      </div>
      <div class="flex flex-col">
        <label for="email">Description :</label>
        <textarea
          v-model="description"
          id="description"
          type="text"
          placeholder="Saisissez une description"
          rows="6"
          class="border-2 border-indigo-400 rounded p-1"
        />
      </div>
      <div class="flex flex-col">
        <label for="date">Date :</label>
        <input v-model="date" id="date" type="date" required class="border-2 border-indigo-400 rounded p-1" />
      </div>
      <div class="flex flex-col">
        <label for="time">Heure :</label>
        <input v-model="time" id="time" type="time" required class="border-2 border-indigo-400 rounded p-1" />
      </div>
      <div class="flex flex-col">
        <label for="missingPlayers">Nombre de joueurs manquants:</label>
        <input
          v-model.number="missingPlayers"
          id="missingPlayers"
          type="number"
          min="0"
          placeholder="Saisissez le nombre de joueurs manquants"
          required
          class="border-2 border-indigo-400 rounded p-1"
        />
      </div>
      <FeedbackMessage v-if="error" type="error">
        {{ error }}
      </FeedbackMessage>
      <button
        type="submit"
        @click.prevent="submit"
        class="border-2 border-indigo-400 rounded p-1 my-2"
        :disabled="!canSubmitForm"
      >
        <template v-if="loading">Création...</template>
        <template v-else>Créer</template>
      </button>
    </form>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapGetters, mapActions } from "vuex";
import Heading from "@/components/texts/Heading";
import FeedbackMessage from "@/components/FeedbackMessage";
import { isGeolocationSupported, getCurrentGeolocation } from "@/services/Geolocation";

export default {
  name: "PageGamesAdd",
  middleware: ["authenticatedOnly"],
  components: {
    Heading,
    FeedbackMessage,
  },
  data() {
    return {
      isGeolocationSupported: true,
      isGeolocationEnabled: true,
      isThereGeoLocationError: false,
      currentUserGeolocation: null,
      boardGameName: null,
      description: null,
      date: dayjs().format("YYYY-MM-DD"),
      time: dayjs().format("hh:mm"),
      missingPlayers: 0,
    };
  },
  computed: {
    ...mapGetters({
      loading: "games/loading",
      error: "games/error",
    }),
    plannedDate() {
      if (!this.date || !this.time) {
        return null;
      }
      const date = dayjs(this.date);
      const hour = this.time.substring(0, 1);
      const minute = this.time.substring(3, 4);
      date.hour(hour);
      date.minute(minute);
      return date.toISOString();
    },
    canSubmitForm() {
      return (
        !this.loading &&
        this.isGeolocationSupported &&
        this.isGeolocationEnabled &&
        !this.isThereGeoLocationError &&
        this.currentUserGeolocation
      );
    },
  },
  methods: {
    ...mapActions({
      createGame: "games/createGame",
      cleanError: "games/cleanError",
    }),
    submit() {
      this.createGame({
        plannedDate: this.plannedDate,
        latitude: this.currentUserGeolocation.latitude,
        longitude: this.currentUserGeolocation.longitude,
        boardGameName: this.boardGameName,
        description: this.description,
        missingPlayers: this.missingPlayers,
      }).then((gameId) => {
        this.$router.push(`/games/${gameId}`);
      });
    },
  },
  mounted() {
    this.isGeolocationSupported = isGeolocationSupported();
    getCurrentGeolocation()
      .then(({ latitude, longitude }) => {
        this.currentUserGeolocation = { latitude, longitude };
      })
      .catch((error) => {
        if (error.code === 1) {
          this.isGeolocationEnabled = false;
        } else {
          this.isThereGeoLocationError = true;
        }
      });
  },
  destroyed() {
    this.cleanError();
  },
};
</script>
