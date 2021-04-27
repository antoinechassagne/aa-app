<template>
  <fragment>
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
    <FeedbackMessage v-if="isThereMapError" type="error" class="mb-4">
      Une erreur est survenue lors de l'affichage de la carte. Veuillez réessayer dans quelques minutes.
    </FeedbackMessage>
    <div class="relative w-full h-half-screen flex flex-col items-center justify-center">
      <Loader v-if="loading" class="absolute top-2/4 right-2/4 translate-x-2/4 translate-y-2/4" />
      <div ref="map" class="w-full h-full" :class="mapClass"></div>
    </div>
  </fragment>
</template>

<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import FeedbackMessage from "@/components/FeedbackMessage";
import Loader from "@/components/Loader";
import { isGeolocationSupported, getCurrentGeolocation } from "@/services/Geolocation";

export default {
  name: "Map",
  components: {
    FeedbackMessage,
    Loader,
  },
  props: {
    games: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      map: null,
      markers: [],
      loading: true,
      currentUserGeolocation: null,
      isGeolocationSupported: true,
      isGeolocationEnabled: true,
      isThereGeoLocationError: false,
      isThereMapError: false,
    };
  },
  computed: {
    mapClass() {
      return this.loading ? "opacity-0" : null;
    },
  },
  methods: {
    initMap() {
      mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;
      this.map = new mapboxgl.Map({
        container: this.$refs.map,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [this.currentUserGeolocation.longitude, this.currentUserGeolocation.latitude],
        zoom: 14,
      });
      this.attachMapEventListeners();
    },
    renderMarkers() {
      this.markers = this.games.forEach((game) => {
        const marker = new mapboxgl.Marker({ color: "#667EEA" }).setLngLat([game.longitude, game.latitude]);
        const popup = new mapboxgl.Popup().setText(
          `[${game.missingPlayers}] ${game.boardGameName} - ${game.description}`
        );
        marker.setPopup(popup).addTo(this.map);
      });
    },
    attachMapEventListeners() {
      this.map.on("load", () => {
        this.renderMarkers();
        this.loading = false;
      });
      this.map.on("error", () => {
        this.isThereMapError = true;
      });
    },
  },
  mounted() {
    this.isGeolocationSupported = isGeolocationSupported();
    getCurrentGeolocation()
      .then(({ latitude, longitude }) => {
        this.currentUserGeolocation = { latitude, longitude };
        this.initMap();
      })
      .catch((error) => {
        if (error.code === 1) {
          this.isGeolocationEnabled = false;
        } else {
          this.isThereGeoLocationError = true;
        }
      });
  },
};
</script>

<style scoped>
.h-half-screen {
  height: 50vh;
}
</style>
