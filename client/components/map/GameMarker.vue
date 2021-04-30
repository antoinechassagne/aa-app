<template>
  <div class="marker"></div>
</template>

<script>
export default {
  name: "GameMarker",
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.marker {
  width: 25px;
  height: 25px;
  background: #667eea;
  display: block;
  border-radius: 50%;
}
</style>
