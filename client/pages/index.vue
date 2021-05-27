<template>
  <div>
    <header class="header"></header>
    <main>
      <div>
        <Heading level="4">Explorez nos catégories</Heading>
        <div class="categorie-container">
          <CardCategory
            v-for="gameCategory in taxonomies.gameCategories"
            :key="gameCategory.id"
            :category="gameCategory"
          />
        </div>
      </div>
      <div>
        <Heading level="4">Explorez les parties au alentour</Heading>
        <!-- <GamesMap :games="games" :loading="loading" :error="error" class="map" /> -->
        <div class="placeholder">map</div>
      </div>
      <div>
        <Heading level="4">Aujourd'hui</Heading>
        <div class="game-card-container">
          <div class="card-unit" v-for="game in todayGames" :key="game.id">
            <CardGame :game="game" />
          </div>
        </div>
      </div>
      <div class="create-container">
        <div class="create-text-container">
          <Heading level="4">Besion de joueurs ?</Heading>
          <span>Créer votre propre partie afin de trouver de nouvelles personnes pour jouer avec vous. </span>
          <MainButton color="white" background="black">Créer ma partie</MainButton>
        </div>
      </div>
      <div>
        <Heading level="4">Cette semaine</Heading>
        <div class="game-card-container">
          <div class="card-unit" v-for="game in thisWeekGames" :key="game.id">
            <CardGame :game="game" />
          </div>
        </div>
      </div>
    </main>
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
import MainButton from "@/components/buttons/MainButton";
import CardGame from "@/components/game/CardGame";

dayjs.extend(isBetween);
dayjs.extend(isToday);

export default {
  name: "PageHome",
  middleware: ["authenticatedOnly"],
  components: {
    Heading,
    GamesMap,
    CardCategory,
    MainButton,
    CardGame,
  },
  async fetch({ store }) {
    await store.dispatch("games/fetchGames", {});
  },
  computed: {
    ...mapGetters({
      user: "authentication/user",
      games: "games/games",
      loading: "games/loading",
      error: "games/error",
      taxonomies: "taxonomies/taxonomies",
    }),
    todayGames() {
      const limit = 4;
      const todayGames = this.games.filter((game) => dayjs(game.plannedDate).isToday());
      return todayGames.slice(todayGames.length - limit, todayGames.length);
    },
    thisWeekGames() {
      const limit = 4;
      const thisWeekGames = this.games.filter((game) =>
        dayjs(game.plannedDate).isBetween(dayjs(), dayjs().locale("fr").endOf("week"))
      );
      return thisWeekGames.slice(thisWeekGames.length - limit, thisWeekGames.length);
    },
  },
};
</script>
<style lang="scss" scoped>
.map {
  width: 100%;
  display: flex;
}
.header {
  width: 100%;
  height: 60vh;
  background: url("https://cdn.dribbble.com/users/1420243/screenshots/11863092/media/ab7c5ee0f85e3fb94bc7b55489129074.png");
  background-size: cover;
}
main {
  padding: 3% 5% 3% 5%;
}
.categorie-container {
  display: flex;
  margin: 3% 0 3% 0;
  flex-wrap: wrap;
}
.map {
  height: 33vh;
  position: relative;
  width: 100%;
}
.placeholder {
  height: 33vh;
  width: 100%;
  border-radius: 10px;
  background-color: #e7e7e7e7;
  margin: 3% 0 3% 0;
}
.create-container {
  height: 33vh;
  width: 100%;
  border-radius: 10px;
  background: url("https://cdn.dribbble.com/users/2087893/screenshots/15036881/media/f54eb08629cb4229520931af14419444.jpg");
  background-size: cover;
  margin: 3% 0 3% 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.create-text-container {
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 10%;
  height: 70%;
}
.game-card-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.card-unit {
  width: 25%;
  min-width: 300px;
}
</style>
