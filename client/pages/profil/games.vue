<template>
  <div class="container">
    <div>
      <Heading level="2">Historique des parties créées</Heading>
      <template v-if="createdGames.length">
        <CardGame v-for="game in createdGames" :key="game.id" :game="game" />
      </template>
      <p v-else>Vous n'avez pas encore créé de partie.</p>
    </div>
    <div>
      <Heading level="2">Historique des parties rejointes</Heading>
      <template v-if="joinedGames.length">
        <CardGame v-for="game in joinedGames" :key="game.id" :game="game" />
      </template>
      <p v-else>Vous n'avez pas encore rejoint de partie.</p>
    </div>
  </div>
</template>

<script>
import Heading from "@/components/texts/Heading";
import CardGame from "@/components/game/CardGame";

export default {
  name: "PageUserGames",
  middleware: ["authenticatedOnly"],
  components: {
    Heading,
    CardGame,
  },
  async asyncData({ store }) {
    const user = store.getters["authentication/user"];
    const participations = await store.dispatch("participations/fetchParticipations", { userId: user.id });
    const participationsGameIds = participations.map((participation) => participation.gameId);
    const createdGames = await store.dispatch("games/fetchGames", { creatorId: user.id });
    const joinedGames = await store.dispatch("games/fetchGames", { ids: participationsGameIds });
    return { createdGames, joinedGames };
  },
};
</script>

<style lang="scss" scoped></style>
