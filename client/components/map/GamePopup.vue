<template>
  <div>
    <Heading level="4">{{ game.boardGameName }}</Heading>
    <p>{{ game.description }}</p>
    <p>Créée par {{ game.creator.pseudo }}</p>
    <p>
      Joueurs manquants : <span>{{ game.missingPlayers }}</span>
    </p>
    <RouteLink :to="`/games/${game.id}`" :prefetch="false">Voir la partie</RouteLink>
  </div>
</template>

<script>
import Heading from "@/components/texts/Heading";

export default {
  name: "GamePopup",
  components: {
    Heading,
  },
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.mapboxgl-popup-content {
  padding: 1rem;
  border-radius: 1rem;

  .mapboxgl-popup-close-button {
    right: 16px;
    top: 7px;
  }
}
</style>
