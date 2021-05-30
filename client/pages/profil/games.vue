<template>
  <div class="container">
    <Heading level="2">Mes parties</Heading>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Heading from "@/components/texts/Heading";

export default {
  name: "PageUserGames",
  middleware: ["authenticatedOnly"],
  components: {
    Heading,
  },
  async fetch({ store }) {
    await store.dispatch("games/fetchGames", {
      missingPlayers: false,
    });
  },
  computed: {
    ...mapGetters({
      user: "authentication/user",
      games: "games/games",
    }),
  },
};
</script>

<style lang="scss" scoped></style>
