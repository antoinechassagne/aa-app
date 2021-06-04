<template>
  <div class="games">
    <div class="games__cards">
      <Heading level="2">Rechercher une partie</Heading>
      <div class="games__filters">
        <div class="input-container w-50">
          <label for="email">Catégorie :</label>
          <select v-model="query.categoryId" id="categoryId" required>
            <option :value="null">Sélectionnez une catégorie</option>
            <template v-for="gameCategory in taxonomies.gameCategories">
              <option :value="gameCategory.id" :key="gameCategory.id">{{ gameCategory.label }}</option>
            </template>
          </select>
        </div>
        <div class="input-container">
          <label>Lieu : </label>
          <InputSearchLocation @select-location="updateLocation" />
        </div>
        <div class="inputs-date">
          <div class="input-container w-50">
            <label for="start">A partir du :</label>
            <input v-model="query.start" id="start" type="date" />
          </div>
          <div class="input-container w-50">
            <label for="end">Jusqu'au :</label>
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
    <ButtonPrimary @click="toggleMobileMap" class="games__map__open-btn" :class="openButtonClass">
      Carte <IconMap width="20" height="20" color="white" class="margin--left--s" />
    </ButtonPrimary>
    <div @click="toggleMobileMap" class="games__map__close-btn" :class="closeButtonClass">X</div>
    <GamesMap :center="location" :games="games" :loading="loading.games" class="games__map" :class="mapClass" />
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapGetters, mapActions } from "vuex";
import Heading from "@/components/texts/Heading";
import CardGame from "@/components/game/CardGame";
import GamesMap from "@/components/map/GamesMap";
import InputSearchLocation from "@/components/InputSearchLocation";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import IconMap from "@/components/icons/IconMap";

export default {
  name: "PageGames",
  components: {
    Heading,
    CardGame,
    GamesMap,
    InputSearchLocation,
    ButtonPrimary,
    IconMap,
  },
  async asyncData({ store, route, error }) {
    const fetchQuery = { missingPlayers: true, start: dayjs().subtract(1, "hours").toISOString() };
    if (route.query.categoryId) {
      fetchQuery.categoryId = JSON.parse(route.query.categoryId);
    }
    try {
      const games = await store.dispatch("games/fetchGames", fetchQuery);
      return { games };
    } catch (err) {
      error({ error: err });
    }
  },
  data() {
    return {
      loading: {
        games: false,
      },
      location: null,
      query: {
        missingPlayers: true,
        start: dayjs().subtract(1, "hours").toISOString(),
        end: null,
        categoryId: null,
      },
      showMobileMap: false,
    };
  },
  watch: {
    query: {
      async handler() {
        const query = this.query;
        if (!query.start) {
          query.start = dayjs().subtract(1, "hours").toISOString();
        }
        this.loading.games = true;
        this.games = await this.fetchGames(query);
        this.loading.games = false;
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters({
      taxonomies: "taxonomies/taxonomies",
    }),
    mapClass() {
      return this.showMobileMap ? "games__map--visible" : null;
    },
    openButtonClass() {
      return this.showMobileMap ? null : "games__map__open-btn--visible";
    },
    closeButtonClass() {
      return this.showMobileMap ? "games__map__close-btn--visible" : null;
    },
  },
  methods: {
    ...mapActions({
      fetchGames: "games/fetchGames",
    }),
    updateLocation(location) {
      this.location = location;
    },
    toggleMobileMap() {
      this.showMobileMap = !this.showMobileMap;
    },
  },
  created() {
    if (this.$route.query && this.$route.query.categoryId) {
      this.query.categoryId = JSON.parse(this.$route.query.categoryId);
    }
  },
};
</script>

<style lang="scss" scoped>
.games {
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  max-height: calc(100vh - 92px);

  @include on-mobile {
    max-height: calc(100vh - 60px);
  }

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
    margin-bottom: 3rem;
    overflow: scroll;

    @include on-tablet {
      width: 100%;
    }

    &__card {
      margin-bottom: 1rem;
    }
  }

  &__map {
    width: 50%;

    @include on-tablet {
      opacity: 0;
      z-index: -1;
      width: 100%;
      position: absolute;
    }

    &--visible {
      @include on-tablet {
        opacity: 1;
        z-index: 2;
      }
    }

    &__open-btn {
      display: none;

      &--visible {
        @include on-tablet {
          display: flex;
          position: absolute;
          bottom: 5rem;
          right: 50%;
          transform: translateX(50%);
        }
      }
    }

    &__close-btn {
      display: none;
      background-color: $color-primary;
      color: $color-white;
      width: 36px;
      height: 36px;
      border-radius: 2rem;
      justify-content: center;
      align-items: center;

      &--visible {
        @include on-tablet {
          display: flex;
          position: absolute;
          top: 10vh;
          left: 3rem;
          z-index: 3;
        }

        @include on-mobile {
          top: 10vh;
          left: 2rem;
        }
      }
    }
  }

  .inputs-date {
    display: flex;
    justify-content: space-between;

    @include on-mobile {
      flex-wrap: wrap;
    }
  }

  .w-50 {
    width: calc(50% - 1rem);

    @include on-mobile {
      width: 100%;
    }
  }
}
</style>
