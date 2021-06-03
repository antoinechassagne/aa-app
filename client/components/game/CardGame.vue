<template>
  <RouteLink :to="`/games/${game.id}`" class="card-game">
    <div class="card-game__left">
      <img
        :src="require(`~/assets/images/gameCategories/${game.category.imageName}.png`)"
        :alt="`Illustration ${game.category.label}`"
        class="card-game__image"
      />
      <div class="card-game__slots">
        <span class="subheading color-white card-game__pastille">{{ game.missingPlayers }}</span>
        <span class="subheading">{{ game.missingPlayers > 1 ? "places" : "place" }}</span>
      </div>
    </div>
    <div class="card-game__right">
      <p class="card-game__category tertiary">{{ game.category.label }}</p>
      <p class="card-game__creator secondary">{{ game.creator.pseudo }} propose :</p>
      <p class="card-game__title subheading">{{ game.boardGameName }}</p>
      <p class="card-game__description">{{ game.description }}</p>
      <p class="card-game__date semi-bold"><IconCalendar width="25" height="25" color="primary" /> {{ dateFormat }}</p>
    </div>
  </RouteLink>
</template>

<script>
import dayjs from "dayjs";
import "dayjs/locale/fr";
import IconCalendar from "@/components/icons/IconCalendar";

export default {
  name: "CardGame",
  components: {
    IconCalendar,
  },
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

<style lang="scss" scoped>
.card-game {
  display: flex;
  text-decoration: none;
  border-radius: 5px;
  padding: 1.25rem;
  background-color: white;

  &:hover {
    background-color: rgba($color-primary, 0.25);
  }

  &__left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  &__right {
    margin-left: 1rem;
  }

  &__image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 1rem;
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
  }

  &__category {
    margin-bottom: 0.5rem;
  }

  &__creator {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }

  &__title {
    margin-bottom: 0.5rem;
  }

  &__description {
    padding-bottom: 2rem;
  }

  &__date {
    display: flex;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
}
</style>
