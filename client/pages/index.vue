<template>
  <div>
    <header class="header"></header>
    <main>
      <div>
        <Heading level="4">Explorer nos catégories</Heading>
        <div class="categorie-container">
          <GameCategorie></GameCategorie>
        </div>
      </div>
      <div>
        <Heading level="4">Explorer nos catégories</Heading>
        <!-- <GamesMap :games="games" :loading="loading" :error="error" class="map" /> -->
        <div class="placeholder">map</div>
      </div>
      <div>
        <Heading level="4">Aujourd'hui</Heading>
        <div class="categorie-container">
          <GameCategorie></GameCategorie>
        </div>
      </div>
      <div class="create-container">
        <div class="create-text-container">
          <Heading level="4">Besion de joueurs ?</Heading>
          <span>Créer votre propre partie afin de trouver de nouvelles personnes pour jouer avec vous. </span>
          <MainButton color="black" background="white">Créer ma partie</MainButton>
        </div>
      </div>
      <div>
        <Heading level="4">Cette Semaine</Heading>
        <div class="categorie-container">
          <GameCategorie></GameCategorie>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Heading from "@/components/texts/Heading";
import GamesMap from "@/components/map/GamesMap";
import GameCategorie from "@/components/game/GameCategorie";
import MainButton from "@/components/buttons/MainButton";

export default {
  name: "PageHome",
  middleware: ["authenticatedOnly"],
  components: {
    Heading,
    GamesMap,
    GameCategorie,
    MainButton,
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
    welcomeMessage() {
      return `Bonjour ${this.user.pseudo}`;
    },
  },
};
</script>
<style scoped>
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
  margin: 3% 0 3% 0;
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
  background-color: #e7e7e7e7;
  margin: 3% 0 3% 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.create-text-container {
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10%;
}
</style>
