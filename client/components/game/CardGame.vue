<template>
  <div class="card-game">
    <img
      :src="require(`~/assets/images/gameCategories/${game.category.imageName}.png`)"
      :alt="`Illustration ${game.category.label}`"
      class="card-game__image"
    />
    <div class="card-game__slots">
      <span>Places restantes : </span>
      <p>{{ game.missingPlayers }}</p>
    </div>
    <div class="card-game__date">
      <p>Le {{ dateFormat }}</p>
    </div>
    <div class="card-game__title">
      <p>Le {{ game.boardGameName }}</p>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "CardGame",
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
  computed: {
    dateFormat() {
      const date = dayjs(this.game.plannedDate).format("DD/MM/YYYY");
      const hour = dayjs(this.game.plannedDate).format("hh:mm");
      return `${date} à ${hour}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.card-game {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  padding: 5% 0 5% 0;

  &__image {
  }

  &__slots {
  }

  &__date {
  }

  &__title {
  }
}
</style>
