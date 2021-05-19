<template>
  <div>
    <Heading level="1" class="mb-10">{{ welcomeMessage }}</Heading>
    <GamesMap :games="games" :loading="loading" :error="error" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Heading from "@/components/texts/Heading";
import GamesMap from "@/components/map/GamesMap";

export default {
  name: "PageHome",
  middleware: ["authenticatedOnly"],
  components: {
    Heading,
    GamesMap,
  },
  async fetch({ store }) {
    await store.dispatch("games/fetchGames", {});
  },
  computed: {
    ...mapGetters({
      games: "games/games",
      loading: "games/loading",
      error: "games/error",
    }),
    welcomeMessage() {
      return `Bonjour ${this.$user.pseudo}`;
    },
  },
};
</script>
