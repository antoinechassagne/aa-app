<template>
  <div class="game-card">
    <div
      class="illu-container"
      :style="{
        backgroundImage: 'url(' + require(`~/assets/images/gameCategories/${game.category.imageName}.png`) + ')',
      }"
    >
      <div class="pastille">
        <span>Places restantes : </span>
        <p>{{ game.missingPlayers }}</p>
      </div>
      <div class="pastille-date">
        <p>Le {{ dateFormat }}</p>
      </div>
    </div>
    <div class="text-container">
      <span class="game-name">{{ game.boardGameName }}</span>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "GameCardHome",
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
.game-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  padding: 5% 0 5% 0;
}
.illu-container {
  width: 100%;
  height: 33vh;
  background-size: cover;
  border-radius: 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}

.pastille {
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  backdrop-filter: blur(2px);
  color: $color-white;
  margin: 5% 5% 0 0;
  font-size: 0.8rem;
  border: 1px solid $color-grey;
  justify-self: flex-start;
  align-self: flex-end;
}
.pastille-date {
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  backdrop-filter: blur(2px);
  color: $color-white;
  margin: 0 0 5% 5%;
  font-size: 0.8rem;
  border: 1px solid $color-grey;
  justify-self: flex-start;
}
.pastille p {
  padding-left: 5px;
}
.text-container {
  margin-top: 5%;
  font-weight: normal;
  display: flex;
  flex-direction: column;
}
.game-name {
  text-transform: capitalize;
  margin-top: 5%;
  font-weight: 500;
}

.text-container p {
  color: #555555;
  font-weight: lighter;
}
</style>
