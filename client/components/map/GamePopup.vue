<template>
  <div>
    <Heading level="4" class="mb-2">{{ game.boardGameName }}</Heading>
    <p class="mb-2">{{ game.description }}</p>
    <p class="mb-2">
      Joueurs manquants : <span class="font-bold">{{ game.missingPlayers }}</span>
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
