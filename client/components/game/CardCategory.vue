<template>
  <RouteLink :to="`/games?categoryId=${category.id}`" class="card-category">
    <img
      :src="require(`~/assets/images/gameCategories/${category.imageName}.png`)"
      :alt="`Illustration ${category.label}`"
      class="card-category__image"
    />
    <div class="card-category__content">
      <p class="subheading card-category__label">{{ category.label }}</p>
      <p>{{ countSentence }}</p>
    </div>
  </RouteLink>
</template>

<script>
export default {
  name: "CardCategory",
  props: {
    category: {
      type: Object,
      required: true,
    },
    gamesCount: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    countSentence() {
      switch (this.gamesCount) {
        case 0:
          return "Aucune partie";
        case 1:
          return "1 partie";
        default:
          return `${this.gamesCount} parties`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card-category {
  display: flex;
  align-items: center;
  text-decoration: none;
  border-radius: 5px;
  padding: 1rem;

  &:hover {
    background-color: rgba($color-primary, 0.25);
  }

  &__image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 5px;
  }

  &__content {
    margin-left: 1rem;
  }

  &__label {
    margin-bottom: 1rem;
  }
}
</style>
