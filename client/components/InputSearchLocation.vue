<template>
  <div class="input-search-location">
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
      @focus="onFocus"
    />
    <FeedbackMessage v-if="isThereGeoLocationError" type="error">
      Une erreur est survenue lors de votre géolocalisation.
    </FeedbackMessage>
    <div v-if="showResults" v-click-outside="closeResults" class="input-search-location__results">
      <Loader v-if="loadingSearch" color="primary" />
      <ul v-else class="input-search-location__list">
        <li @click="onUseCurrentLocation()" class="input-search-location__list__row">
          Utiliser ma position actuelle <Loader v-if="loadingGetCurrentLocation" width="16" height="16" />
        </li>
        <li
          v-for="(result, index) in results"
          :key="index"
          class="input-search-location__list__row"
          @click="onSelectLocation(result)"
        >
          <p>{{ result.properties.label }}</p>
          <p>{{ result.properties.context }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader";
import Geolocation from "@/services/Geolocation";

export default {
  name: "InputSearchLocation",
  components: {
    Loader,
  },
  props: {
    required: {
      type: Boolean,
      default: false,
    },
    predefinedLocation: {
      type: Object,
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
    onFocus() {
      this.showResults = true;
    },
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
    async onUseCurrentLocation(predefinedLocation = null) {
      if (predefinedLocation) {
        console.log("here");
        const response = await this.$axios.get(
          `https://api-adresse.data.gouv.fr/reverse/?lon=${predefinedLocation.longitude}&lat=${predefinedLocation.latitude}`
        );
        this.onSelectLocation(response.data.features[0]);
      } else {
        this.search = null;
        this.loadingGetCurrentLocation = true;
        const { location, error, enabled, supported } = await Geolocation();
        if (error || !enabled || !supported) {
          this.isThereGeoLocationError = true;
          return;
        }
        const response = await this.$axios.get(
          `https://api-adresse.data.gouv.fr/reverse/?lon=${location.longitude}&lat=${location.latitude}`
        );
        if (!response || !response.data || !response.data.features || !response.data.features.length) {
          this.isThereGeoLocationError = true;
        } else {
          this.onSelectLocation(response.data.features[0]);
        }
        this.loadingGetCurrentLocation = false;
      }
    },
    onSelectLocation(location) {
      this.results = [];
      this.search = location.properties.label;
      const [longitude, latitude] = location.geometry.coordinates;
      this.$emit("select-location", { longitude, latitude, label: location.properties.label });
      this.closeResults();
    },
    closeResults() {
      this.showResults = false;
    },
  },
  created() {
    if (this.predefinedLocation) {
      this.location = this.predefinedLocation;
      this.onUseCurrentLocation(this.location);
    }
  },
};
</script>

<style lang="scss" scoped>
.input-search-location {
  width: 100%;
  position: relative;

  &__input {
    width: 100%;
    border: solid 1px $color-primary;
    border-radius: 5px;
    padding: 0.75rem;

    &:focus {
      border-color: $color-primary;
      box-shadow: none;
      outline: 0 none;
    }
  }

  &__results {
    position: absolute;
    background: white;
    display: flex;
    justify-content: center;
    width: 100%;
    min-width: 100%;
    top: 44px;
    border: solid 1px $color-primary;
    border-radius: 5px;
    z-index: 2;
  }

  &__list {
    width: 100%;

    li:last-of-type {
      border-bottom: none;
    }

    &__row {
      border-bottom: solid 1px $color-primary;
      padding: 0.75rem;

      &:hover {
        background-color: rgba($color-primary, 0.25);
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
