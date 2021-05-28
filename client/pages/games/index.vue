<template>
  <div>
    <Heading level="2">Recherchez une partie</Heading>
    <div class="games">
      <div class="games__cards">
        <div v-for="game in games" :key="game.id">
          {{ game.boardGameName }}
        </div>
      </div>
      <GamesMap :center="location" :games="games" :loading="loading.games" class="games__map" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Heading from "@/components/texts/Heading";
import GamesMap from "@/components/map/GamesMap";

export default {
  name: "PageGames",
  components: {
    Heading,
    GamesMap,
  },
  async fetch({ store }) {
    await store.dispatch("games/fetchGames", {});
  },
  data() {
    return {
      location: null,
    };
  },
  computed: {
    ...mapGetters({
      games: "games/games",
      loading: "games/loading",
      error: "games/error",
    }),
  },
  methods: {
    ...mapActions({
      cleanError: "games/cleanError",
    }),
  },
  destroyed() {
    this.cleanError();
  },
};
</script>

<style lang="scss" scoped>
.games {
  display: flex;
  flex-wrap: nowrap;

  &__cards {
    width: 50%;
    display: flex;
    flex-direction: column;
  }

  &__map {
    width: 50%;
  }
}
</style>
