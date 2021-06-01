<template>
  <button @click.prevent="$emit('click')" class="button button--danger" :class="emptyClass">
    <Loader v-if="loading" color="white" width="20" height="20" />
    <slot v-else />
  </button>
</template>

<script>
import Loader from "@/components/Loader";

export default {
  name: "ButtonDanger",
  components: {
    Loader,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    empty: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    emptyClass() {
      return this.empty ? `button--danger--empty` : null;
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  border-radius: 5px;
  padding: 0.5rem 0.75rem;
  border: none;
  font-size: 1rem;
  min-width: 100px;
  max-width: 300px;
  line-height: 20px;
  background-color: $color-danger;
  color: $color-white;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  &:disabled {
    text-decoration: none;
  }
}
</style>
