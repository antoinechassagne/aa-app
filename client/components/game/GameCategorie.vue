<template>
  <div class="container">
    <div class="illu-container">
      <img
        :src="require(`~/assets/images/gameCategories/${category.imageName}.png`)"
        :alt="`Image ${category.label}`"
      />
    </div>
    <div class="text-container">
      <span>{{ category.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameCategorie",
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  width: 25%;
  margin-bottom: 3%;
}
.illu-container {
  width: 64px;
  height: 64px;
}
.illu-container img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.text-container {
  margin-left: 5%;
  display: flex;
  flex-direction: column;
}
.text-container span {
  font-weight: 500;
  margin-bottom: 5%;
}
.text-container p {
  color: #555555;
  font-weight: lighter;
  font-size: 0.8rem;
}
</style>
