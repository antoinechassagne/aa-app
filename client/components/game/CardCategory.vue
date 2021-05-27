<template>
  <div class="card-category">
    <img
      :src="require(`~/assets/images/gameCategories/${category.imageName}.png`)"
      :alt="`Illustration ${category.label}`"
      class="card-category__image"
    />
    <div class="card-category__label">
      <span>{{ category.label }}</span>
    </div>
    <div class="card-category__games">
      <span>867 parties</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardCategory",
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.game-category {
  display: flex;
  align-items: center;
  width: 25%;
  margin-bottom: 3%;

  &__image {
  }

  &__label {
  }

  &__games {
  }
}
</style>
