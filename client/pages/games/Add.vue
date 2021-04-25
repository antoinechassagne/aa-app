<template>
  <fragment>
    <Heading level="1" class="mb-10">Créer une nouvelle partie</Heading>
    <InformationBanner v-if="!isGeolocationSupported" type="warning" class="mb-4">
      Votre navigateur internet ne dispose pas de la fonctionnalité de géolocalisation. Veuillez utiliser un navigateur
      internet plus récent.
    </InformationBanner>
    <InformationBanner v-if="!isGeolocationEnabled" type="warning" class="mb-4">
      Votre navigateur a bloqué la fonctionnalité de géolocalisation. Veuillez l'activer afin de poursuivre la création
      de la partie.
    </InformationBanner>
    <InformationBanner v-if="isThereGeoLocationError" type="warning" class="mb-4">
      Une erreur est survenue lors de votre géolocalisation. Veuillez réessayer dans quelques minutes.
    </InformationBanner>
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
        <label for="missingPlayers">Joueurs manquants:</label>
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
      <InformationBanner v-if="error" type="error">
        {{ error }}
      </InformationBanner>
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
  </fragment>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Heading from "@/components/texts/Heading";
import InformationBanner from "@/components/InformationBanner";
import { isGeolocationSupported, getLocation } from "@/services/Geolocation";

export default {
  name: "PageGamesAdd",
  components: {
    Heading,
    InformationBanner,
  },
  data() {
    return {
      isGeolocationSupported: true,
      isGeolocationEnabled: true,
      isThereGeoLocationError: false,
      geolocation: null,
      boardGameName: null,
      description: null,
      missingPlayers: 0,
    };
  },
  computed: {
    ...mapGetters({
      loading: "games/loading",
      error: "games/error",
    }),
    canSubmitForm() {
      return (
        !this.loading &&
        this.isGeolocationSupported &&
        this.isGeolocationEnabled &&
        !this.isThereGeoLocationError &&
        this.geolocation
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
        geolocation: this.geolocation,
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
    getLocation()
      .then((position) => {
        this.geolocation = { latitude: position.coords.latitude, longitude: position.coords.longitude };
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
