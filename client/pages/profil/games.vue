<template>
  <div class="container profil-games">
    <div class="games-list">
      <Heading level="2">Mes parties créées</Heading>
      <template v-if="createdGames.length">
        <CardGame v-for="game in createdGames" :key="game.id" :game="game" />
      </template>
      <p v-else>Vous n'avez pas encore créé de partie.</p>
    </div>
    <div class="games-list">
      <Heading level="2">Mes parties rejointes</Heading>
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

<style lang="scss" scoped>
.profil-games {
  display: flex;
  justify-content: space-around;
  margin: 4rem 0;

  @include on-mobile {
    flex-direction: column;
  }
}

.games-list {
  width: 45%;
  margin-bottom: 2rem;

  @include on-mobile {
    width: 100%;
  }
}

h2 {
  margin-bottom: 2rem;
}

a {
  margin: 1rem 0;
}
</style>
