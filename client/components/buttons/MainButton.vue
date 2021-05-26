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
  border-radius: 5px;
  padding: 0.5rem;
  border: none;
  width: 150px;
  font-size: 0.9rem;
  &:disabled {
    text-decoration: none;
  }
}
.color-black {
  color: var(--light-black-color);
}
.color-white {
  color: var(--main-white-color);
}
.background-white {
  background-color: var(--main-white-color);
}
.background-black {
  background-color: var(--main-black-color);
}
</style>
