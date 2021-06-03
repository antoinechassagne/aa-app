<template>
  <div class="container">
    <div class="hero">
      <div class="hero__content">
        <Heading level="1">Trouvez les parties <br />autour de vous</Heading>
        <p class="subheading">
          Ludis est une application permetant de trouver facilement des partenaires de jeux de société autour de vous.
        </p>
        <div>
          <RouteLink to="/games" class="button button--primary">Commencer</RouteLink>
        </div>
      </div>
      <img src="~/assets/images/illustration_1.png" alt="Illustration" class="hero__image" />
    </div>
    <div class="categories">
      <Heading level="2">Explorez nos catégories</Heading>
      <div class="categories__list">
        <CardCategory
          v-for="gameCategory in taxonomies.gameCategories"
          :key="gameCategory.id"
          :category="gameCategory"
          :gamesCount="getCategoryGamesCount(gameCategory.id)"
        />
      </div>
    </div>
    <div class="map">
      <Heading level="2">Explorez les parties aux alentours</Heading>
      <GamesMap :games="games" :zoom="10" class="map__map" />
    </div>
    <div class="games">
      <Heading level="2">Aujourd'hui</Heading>
      <div class="games__list">
        <template v-if="todayGames.length">
          <CardGame v-for="game in todayGames" :key="game.id" :game="game" />
        </template>
        <p v-else>Pour le moment, aucune partie n'est organisée aujourd'hui.</p>
      </div>
    </div>
    <div class="hero hero--colored">
      <div class="hero__content">
        <Heading level="2">Besoin de joueurs ?</Heading>
        <p class="subheading">Créer votre propre partie afin de trouver de nouvelles personnes pour jouer avec vous.</p>
        <div>
          <RouteLink to="/games/add" class="button button--secondary">Créer votre partie</RouteLink>
        </div>
      </div>
      <img src="~/assets/images/illustration_2.png" alt="Illustration" class="hero__image" />
    </div>
    <div class="games">
      <Heading level="2">Cette semaine</Heading>
      <div class="games__list">
        <template v-if="thisWeekGames.length">
          <CardGame v-for="game in thisWeekGames" :key="game.id" :game="game" />
        </template>
        <p v-else>Pour le moment, aucune partie n'est organisée cette semaine.</p>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isToday from "dayjs/plugin/isToday";
import "dayjs/locale/fr";
import { mapGetters } from "vuex";
import Heading from "@/components/texts/Heading";
import GamesMap from "@/components/map/GamesMap";
import CardCategory from "@/components/game/CardCategory";
import CardGame from "@/components/game/CardGame";

dayjs.extend(isBetween);
dayjs.extend(isToday);

export default {
  name: "PageHome",
  components: {
    Heading,
    GamesMap,
    CardCategory,
    CardGame,
  },
  async asyncData({ store, error }) {
    try {
      const games = await store.dispatch("games/fetchGames", {
        missingPlayers: true,
        start: dayjs().subtract(12, "hours").toISOString(),
      });
      return { games };
    } catch (err) {
      error({ error: err });
    }
  },
  computed: {
    ...mapGetters({
      user: "authentication/user",
      taxonomies: "taxonomies/taxonomies",
    }),
    todayGames() {
      const limit = 3;
      const todayGames = this.games.filter((game) => dayjs(game.plannedDate).isToday());
      return todayGames.length > limit ? todayGames.slice(todayGames.length - limit, todayGames.length) : todayGames;
    },
    thisWeekGames() {
      const limit = 3;
      const thisWeekGames = this.games.filter((game) =>
        dayjs(game.plannedDate).isBetween(dayjs(), dayjs().locale("fr").endOf("week"))
      );
      return thisWeekGames.length > limit
        ? thisWeekGames.slice(thisWeekGames.length - limit, thisWeekGames.length)
        : thisWeekGames;
    },
  },
  methods: {
    getCategoryGamesCount(categoryId) {
      return this.games.filter((game) => game.categoryId === categoryId).length;
    },
  },
};
</script>

<style lang="scss" scoped>
.hero {
  width: 80%;
  margin: 0 auto;
  padding: 2rem 0;
  display: flex;

  &--colored {
    background-color: $color-primary;
    width: 100%;
    padding: 3rem;
    border-radius: 10px;
    max-height: 33vh;

    @include on-mobile {
      max-height: none;
    }
  }

  &__content {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @include on-mobile {
      width: 100%;
    }

    h1,
    h2 {
      margin-bottom: 2rem;
    }

    p {
      margin-bottom: 3rem;
      width: 75%;
    }
  }

  &__image {
    width: 50%;
    object-fit: contain;

    @include on-mobile {
      display: none;
    }
  }
}

.categories {
  padding: 2rem 0;

  h2 {
    margin-bottom: 2rem;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;

    a {
      width: calc(33% - 2rem);
      margin: 1rem;

      @include on-tablet {
        width: calc(50% - 2rem);
      }

      @include on-mobile {
        width: calc(100% - 2rem);
      }
    }
  }
}

.map {
  padding: 2rem 0;

  h2 {
    margin-bottom: 2rem;
  }

  &__map {
    height: 50vh;
    width: 100%;
  }
}

.games {
  padding: 4rem 0;

  h2 {
    margin-bottom: 2rem;
  }

  &__list {
    display: flex;
    flex-wrap: wrap;

    a {
      width: calc(33% - 2rem);
      margin: 1rem;

      @include on-tablet {
        width: calc(50% - 2rem);
      }

      @include on-mobile {
        width: calc(100% - 2rem);
      }
    }
  }
}
</style>
