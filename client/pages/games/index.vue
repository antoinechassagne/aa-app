<template>
  <div class="games">
    <div class="games__cards">
      <Heading level="2">Recherchez une partie</Heading>
      <div class="games__filters">
        <div class="input-container w-50">
          <label for="email" class="subheading">Catégorie :</label>
          <select v-model="query.categoryId" id="categoryId" required>
            <option :value="null">Sélectionnez une catégorie</option>
            <template v-for="gameCategory in taxonomies.gameCategories">
              <option :value="gameCategory.id" :key="gameCategory.id">{{ gameCategory.label }}</option>
            </template>
          </select>
        </div>
        <div class="input-container">
          <label class="subheading">Lieu : </label>
          <InputSearchLocation @select-location="updateLocation" />
        </div>
        <div class="inputs-date">
          <div class="input-container w-50">
            <label for="start" class="subheading">A partir du :</label>
            <input v-model="query.start" id="start" type="date" />
          </div>
          <div class="input-container w-50">
            <label for="end" class="subheading">Jusqu'au :</label>
            <input v-model="query.end" id="end" type="date" />
          </div>
        </div>
      </div>
      <Loader v-if="loading.games" />
      <template v-else>
        <p v-if="!games.length">Aucunes parties trouvées.</p>
        <template v-else>
          <div v-for="game in games" :key="game.id">
            <CardGame :game="game" class="games__cards__card" />
          </div>
        </template>
      </template>
    </div>
    <GamesMap :center="location" :games="games" :loading="loading.games" class="games__map" />
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapGetters, mapActions } from "vuex";
import Heading from "@/components/texts/Heading";
import CardGame from "@/components/game/CardGame";
import GamesMap from "@/components/map/GamesMap";
import InputSearchLocation from "@/components/InputSearchLocation";

export default {
  name: "PageGames",
  components: {
    Heading,
    CardGame,
    GamesMap,
    InputSearchLocation,
  },
  async fetch({ store, query }) {
    const fetchQuery = { missingPlayers: true, start: dayjs().subtract(12, "hours").toISOString() };
    if (query.categoryId) {
      fetchQuery.categoryId = JSON.parse(query.categoryId);
    }
    await store.dispatch("games/fetchGames", fetchQuery);
  },
  data() {
    return {
      location: null,
      query: {
        missingPlayers: true,
        start: dayjs().subtract(12, "hours").toISOString(),
        end: null,
        categoryId: null,
      },
    };
  },
  watch: {
    query: {
      handler() {
        const query = this.query;
        if (!query.start) {
          query.start = dayjs().subtract(12, "hours").toISOString();
        }
        this.fetchGames(query);
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      games: "games/games",
      loading: "games/loading",
      error: "games/error",
      taxonomies: "taxonomies/taxonomies",
    }),
  },
  methods: {
    ...mapActions({
      fetchGames: "games/fetchGames",
      cleanError: "games/cleanError",
    }),
    updateLocation(location) {
      this.location = location;
    },
  },
  created() {
    if (this.$route.query && this.$route.query.categoryId) {
      this.query.categoryId = JSON.parse(this.$route.query.categoryId);
    }
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

  &__filters {
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

  .inputs-date {
    display: flex;
    justify-content: space-between;
  }
  .w-50 {
    width: calc(50% - 1rem);
  }
}
</style>
