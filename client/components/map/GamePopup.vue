<template>
  <RouteLink :to="`/games/${game.id}`" class="game-popup">
    <div class="game-popup__slots">
      <span class="subheading color-white game-popup__pastille">{{ game.missingPlayers }}</span>
      <span class="subheading">{{ game.missingPlayers > 1 ? "places" : "place" }}</span>
    </div>
    <div>
      <p class="game-popup__title subheading">{{ game.boardGameName }}</p>
      <p class="game-popup__date semi-bold">{{ dateFormat }}</p>
    </div>
  </RouteLink>
</template>

<script>
import dayjs from "dayjs";
import "dayjs/locale/fr";

export default {
  name: "GamePopup",
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
  computed: {
    dateFormat() {
      const date = dayjs(this.game.plannedDate).locale("fr").format("ddd DD MMMM YYYY");
      const hour = dayjs(this.game.plannedDate).locale("fr").format("HH:mm");
      const formattedDate = `${date} à ${hour}`;
      return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    },
  },
};
</script>

<style lang="scss">
.mapboxgl-popup-content {
  padding: 0;
  border-radius: 5px;
  box-shadow: none;
  min-width: 290px;

  .mapboxgl-popup-close-button {
    right: 0;
    top: 0;
    transform: translate(-0.5rem, 0.5rem);
    font-size: 2rem;
    color: $color-black;
  }
}

.game-popup {
  display: flex;
  text-decoration: none;
  padding: 1.25rem;

  &:focus {
    border-color: $color-primary;
    box-shadow: none;
    outline: 0 none;
  }

  &__pastille {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 2rem;
    background-color: $color-primary;
    margin-bottom: 0.5rem;
  }

  &__slots {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 1rem;
  }

  &__title {
    margin-bottom: 0.5rem;
  }

  &__date {
    display: flex;
    align-items: center;
  }
}
</style>
