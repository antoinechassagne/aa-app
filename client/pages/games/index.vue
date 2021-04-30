<template>
  <div>
    <Heading level="1" class="mb-10">Parties autour de vous</Heading>
    <FeedbackMessage v-if="error" type="error" class="mb-4">
      {{ error }}
    </FeedbackMessage>
    <Loader v-if="loading" />
    <GamesMap v-else :games="games" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Heading from "@/components/texts/Heading";
import FeedbackMessage from "@/components/FeedbackMessage";
import Loader from "@/components/Loader";
import GamesMap from "@/components/map/GamesMap";

export default {
  name: "PageGames",
  components: {
    FeedbackMessage,
    Loader,
    Heading,
    GamesMap,
  },
  async asyncData({ store }) {
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
