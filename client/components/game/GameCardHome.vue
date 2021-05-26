<template>
  <div class="container">
    <div class="illu-container">
      <div class="pastille">
        <span> Places : </span>
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
  name: "GameCategorie",
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

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  padding: 5%;
}
.illu-container {
  width: 100%;
  height: 33vh;
  background: url("https://cdn.dribbble.com/users/329207/screenshots/4165459/2001_bemocs_space_park_cosmic_canyon_dribbble.jpg");
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
  color: var(--main-white-color);
  margin: 5% 5% 0 0;
  font-size: 0.8rem;
  border: 1px solid var(--super-light-grey);
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
  color: var(--main-white-color);
  margin: 0 0 5% 5%;
  font-size: 0.8rem;
  border: 1px solid var(--super-light-grey);
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
  font-weight: 500;
}

.text-container p {
  color: #555555;
  font-weight: lighter;
}
</style>
