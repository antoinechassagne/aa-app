<template>
  <div class="input-search-location">
    <label for="search">Lieu :</label>
    <div class="input-search-location__container">
      <input
        v-model="search"
        id="search"
        type="text"
        placeholder="Rechercher une adresse"
        autocomplete="off"
        :disabled="loadingGetCurrentLocation"
        :required="required"
        class="input-search-location__input"
        @keyup="onTyping"
      />
      <MainButton
        type="button"
        color="white"
        background="black"
        :loading="loadingGetCurrentLocation"
        @click="onUseCurrentLocation"
      >
        Utiliser la position actuelle
      </MainButton>
      <FeedbackMessage v-if="!isGeolocationSupported" type="warning">
        Votre navigateur internet ne dispose pas de la fonctionnalité de géolocalisation. Veuillez utiliser un
        navigateur internet plus récent.
      </FeedbackMessage>
      <FeedbackMessage v-if="!isGeolocationEnabled" type="warning">
        Votre navigateur a bloqué la fonctionnalité de géolocalisation. Veuillez l'activer afin de poursuivre la
        création de la partie.
      </FeedbackMessage>
      <FeedbackMessage v-if="isThereGeoLocationError" type="error">
        Une erreur est survenue lors de votre géolocalisation. Veuillez réessayer dans quelques minutes.
      </FeedbackMessage>
      <div v-if="showResults" v-click-outside="closeResults" class="input-search-location__results">
        <Loader v-if="loadingSearch" />
        <ul v-else>
          <li
            v-for="(result, index) in results"
            :key="index"
            class="input-search-location__results__row"
            @click="onSelectLocation(result)"
          >
            <p>{{ result.properties.label }}</p>
            <p>{{ result.properties.context }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import MainButton from "@/components/buttons/MainButton";
import Loader from "@/components/Loader";
import { isGeolocationSupported, getCurrentGeolocation } from "@/services/Geolocation";

export default {
  name: "InputSearchLocation",
  components: {
    MainButton,
    Loader,
  },
  props: {
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      search: null,
      results: [],
      showResults: false,
      loadingSearch: false,
      loadingGetCurrentLocation: false,
      isGeolocationSupported: true,
      isGeolocationEnabled: true,
      isThereGeoLocationError: false,
    };
  },
  methods: {
    async onTyping() {
      if (!this.search || this.search.length < 3) {
        this.results = [];
        return;
      }
      this.loadingSearch = true;
      const response = await this.$axios.get(`https://api-adresse.data.gouv.fr/search/?q=${this.search}`);
      this.results = response.data.features || [];
      this.showResults = true;
      this.loadingSearch = false;
    },
    onUseCurrentLocation() {
      this.search = null;
      this.loadingGetCurrentLocation = true;
      this.isGeolocationSupported = isGeolocationSupported();
      if (!isGeolocationSupported) {
        return;
      }
      getCurrentGeolocation()
        .then(async ({ latitude, longitude }) => {
          const response = await this.$axios.get(
            `https://api-adresse.data.gouv.fr/reverse/?lon=${longitude}&lat=${latitude}`
          );
          if (!response || !response.data || !response.data.features || !response.data.features.length) {
            this.isThereGeoLocationError = true;
          }
          this.onSelectLocation(response.data.features[0]);
        })
        .catch((error) => {
          if (error.code === 1) {
            this.isGeolocationEnabled = false;
          } else {
            this.isThereGeoLocationError = true;
          }
        })
        .finally(() => {
          this.loadingGetCurrentLocation = false;
        });
    },
    onSelectLocation(location) {
      this.results = [];
      this.search = location.properties.label;
      const [longitude, latitude] = location.geometry.coordinates;
      this.$emit("select-location", { longitude, latitude, label: location.properties.label });
    },
    closeResults() {
      this.showResults = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.input-search-location {
  &__container {
    position: relative;
  }
  &__input {
  }

  &__results {
    position: absolute;
    top: 25px;
    background: white;

    &__row {
      margin-bottom: 0.5rem;
      border: solid 1px black;
      padding: 0.25rem;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
