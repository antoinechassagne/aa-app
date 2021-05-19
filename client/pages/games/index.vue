<template>
  <div>
    <Heading level="1" class="mb-10">Parties autour de vous</Heading>
    <GamesMap :games="games" :loading="loading" :error="error" />
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
