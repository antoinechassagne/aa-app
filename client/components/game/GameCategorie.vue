<template>
  <div class="container">
    <div class="illu-container">
      <img
        src="https://cdn.dribbble.com/users/3958760/screenshots/14926492/media/1cb4efc4014f7a7173287ee9baa66ac6.jpg"
        alt=""
      />
    </div>
    <div class="text-container">
      <span>Jeux de cartes</span>
      <p>873 parties</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameCategorie",
  props: {},
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  width: 25%;
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
  font-weight: normal;
}
.text-container span {
  font-weight: bold;
}
.text-container p {
  color: #555555;
  font-weight: lighter;
}
</style>
