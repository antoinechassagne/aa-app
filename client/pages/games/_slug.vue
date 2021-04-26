<template>
  <Loader v-if="loading" />
  <fragment v-else>
    <InformationBanner v-if="error" type="error">
      {{ error }}
    </InformationBanner>
    <Heading level="1" class="mb-10">{{ game.boardGameName }}</Heading>
    <p>{{ game.description }}</p>
    <p>Joueurs manquants : {{ game.missingPlayers }}</p>
  </fragment>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "@/components/Loader";
import Heading from "@/components/texts/Heading";
import InformationBanner from "@/components/InformationBanner";

export default {
  name: "PageGame",
  components: {
    Loader,
    Heading,
    InformationBanner,
  },
  async asyncData({ params, store }) {
    await store.dispatch("games/fetchGame", params.slug);
  },
  computed: {
    ...mapGetters({
      game: "games/game",
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
