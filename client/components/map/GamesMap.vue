<template>
  <div>
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
    <FeedbackMessage v-if="error" type="error" class="mb-4">
      {{ error }}
    </FeedbackMessage>
    <div class="relative w-full h-half-screen flex flex-col items-center justify-center overflow-hidden rounded-3xl">
      <Loader v-if="loadingMap || loading" class="absolute top-2/4 right-2/4 translate-x-2/4 translate-y-2/4" />
      <div ref="map" class="w-full h-full" :class="mapClass"></div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import FeedbackMessage from "@/components/FeedbackMessage";
import Loader from "@/components/Loader";
import GameMarker from "./GameMarker";
import GamePopup from "./GamePopup";
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
    loading: {
      type: Boolean,
      required: true,
    },
    error: {
      type: String,
    },
  },
  data() {
    return {
      map: null,
      markers: [],
      loadingMap: true,
      currentUserGeolocation: null,
      isGeolocationSupported: true,
      isGeolocationEnabled: true,
      isThereGeoLocationError: false,
      isThereMapError: false,
    };
  },
  computed: {
    mapClass() {
      return this.loadingMap ? "opacity-0" : null;
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
    initMarkersAndPopups() {
      this.games.forEach((game) => {
        const markerComponent = new Vue({
          router: this.$router,
          ...GameMarker,
          propsData: { game },
        }).$mount();
        const popupComponent = new Vue({
          router: this.$router,
          ...GamePopup,
          propsData: { game },
        }).$mount();
        const marker = new mapboxgl.Marker({ element: markerComponent.$el }).setLngLat([game.longitude, game.latitude]);
        const popup = new mapboxgl.Popup().setDOMContent(popupComponent.$el);
        marker.setPopup(popup).addTo(this.map);
      });
    },
    attachMapEventListeners() {
      this.map.on("load", () => {
        this.initMarkersAndPopups();
        this.loadingMap = false;
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
