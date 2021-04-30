<template>
  <Loader v-if="loading" />
  <div v-else>
    <FeedbackMessage v-if="error" type="error">
      {{ error }}
    </FeedbackMessage>
    <Heading level="1" class="mb-10">{{ game.boardGameName }}</Heading>
    <p>Créée par {{ game.creator.pseudo }}</p>
    <p>{{ game.description }}</p>
    <p>Joueurs manquants : {{ game.missingPlayers }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "@/components/Loader";
import Heading from "@/components/texts/Heading";
import FeedbackMessage from "@/components/FeedbackMessage";

export default {
  name: "PageGame",
  components: {
    Loader,
    Heading,
    FeedbackMessage,
  },
  async asyncData({ params, store }) {
    await store.dispatch("games/fetchGame", params.id);
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
