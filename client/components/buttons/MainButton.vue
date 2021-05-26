<template>
  <button :class="colorClasses" @click="$emit('click')">
    <Loader v-if="loading" :color="color" width="20" height="20" />
    <slot v-else />
  </button>
</template>

<script>
import Loader from "@/components/Loader";

export default {
  name: "MainButton",
  components: {
    Loader,
  },
  props: {
    color: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
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
  min-width: 100px;
  max-width: 300px;
  max-height: 36px;
  line-height: 20px;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
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
