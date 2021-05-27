<template>
  <footer class="footer">Footer</footer>
</template>

<script>
export default {
  name: "BaseFooter",
};
</script>

<style lang="scss" scoped>
.footer {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: $color-white;
  z-index: 10;
}
</style>
