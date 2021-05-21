<template>
  <NuxtLink :to="to" :prefetch="prefetch">
    <slot />
  </NuxtLink>
</template>

<script>
export default {
  name: "RouteLink",
  props: {
    to: {
      type: String,
      required: true,
    },
    prefetch: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
