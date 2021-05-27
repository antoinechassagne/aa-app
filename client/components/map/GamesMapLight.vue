<template>
  <div class="game-map">
    <Loader v-if="loadingMap || loading" />
    <div ref="map" class="game-map__map" :class="mapClass"></div>
  </div>
</template>

<script>
import Vue from "vue";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Loader from "@/components/Loader";
import GameMarker from "./GameMarker";
import GamePopup from "./GamePopup";
import Geolocation from "@/services/Geolocation";

export default {
  name: "GamesMapLight",
  components: {
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
  },
  data() {
    return {
      map: null,
      markers: [],
      loadingMap: true,
      location: null,
      defaultLocation: {
        latitude: 46.227638,
        longitude: 2.213749,
      },
    };
  },
  computed: {
    mapClass() {
      return this.loadingMap ? "game-map__map--hidden" : null;
    },
  },
  methods: {
    initMap() {
      mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;
      this.map = new mapboxgl.Map({
        container: this.$refs.map,
        style: "mapbox://styles/mapbox/streets-v11",
        center: this.location
          ? [this.location.longitude, this.location.latitude]
          : [this.defaultLocation.longitude, this.defaultLocation.latitude],
        zoom: this.location ? 14 : 5,
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
    },
  },
  async mounted() {
    const { location } = await Geolocation();
    this.location = location;
    this.initMap();
  },
};
</script>

<style lang="scss" scoped>
.game-map {
  position: relative;
  height: calc(100vh - 50px);
  overflow: hidden;

  &__map {
    height: 100%;

    &--hidden {
      opacity: 0;
    }
  }
}
</style>
