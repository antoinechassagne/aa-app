<template>
  <button @click.prevent="$emit('click')" class="button button--primary" :class="emptyClass">
    <Loader v-if="loading" color="white" width="20" height="20" />
    <slot v-else />
  </button>
</template>

<script>
import Loader from "@/components/Loader";

export default {
  name: "ButtonPrimary",
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
      return this.empty ? `button--primary--empty` : null;
    },
  },
};
</script>
