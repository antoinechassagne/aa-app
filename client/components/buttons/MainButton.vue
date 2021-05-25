<template>
  <button :class="colorClasses">
    <slot />
  </button>
</template>

<script>
export default {
  name: "MainButton",
  props: {
    color: {
      type: String,
      require: true,
    },
    background: {
      type: String,
      require: true,
    },
  },
  computed: {
    colorClasses() {
      return `color-${this.color} background-${this.background}`;
    },
  },
};
</script>
<style scoped lang="scss">
button {
  border-radius: 10px;
  padding: 0.5rem;
  border: none;
  max-width: 300px;
  &:hover {
    text-decoration: underline;
  }
  &:disabled {
    text-decoration: none;
  }
}
.color-black {
  color: var(--light-black-color);
}
.background-white {
  background-color: var(--main-white-color);
}
</style>
