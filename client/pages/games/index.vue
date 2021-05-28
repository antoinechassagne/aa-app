<template>
  <div class="games">
    <div class="games__cards">
      <Heading level="2">Recherchez une partie</Heading>
      <p v-if="!games.length">Aucunes parties trouvées.</p>
      <template v-else>
        <div v-for="game in games" :key="game.id">
          <CardGame :game="game" class="games__cards__card" />
        </div>
      </template>
    </div>
    <GamesMap :center="location" :games="games" :loading="loading.games" class="games__map" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Heading from "@/components/texts/Heading";
import CardGame from "@/components/game/CardGame";
import GamesMap from "@/components/map/GamesMap";

export default {
  name: "PageGames",
  components: {
    Heading,
    CardGame,
    GamesMap,
  },
  async fetch({ store, query }) {
    const fetchQuery = {};
    if (query.categoryId) {
      fetchQuery.categoryId = JSON.parse(query.categoryId);
    }
    await store.dispatch("games/fetchGames", fetchQuery);
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
  overflow: hidden;
  max-height: calc(100vh - 92px);

  h2 {
    margin-bottom: 2rem;
  }

  &__cards {
    width: 50%;
    display: flex;
    flex-direction: column;
    padding: 4rem 2rem 0 2rem;
    overflow: scroll;

    &__card {
      margin-bottom: 1rem;
    }
  }

  &__map {
    width: 50%;
  }
}
</style>
