<template>
  <NuxtLink :to="to" :prefetch="prefetch" class="text-indigo-500 hover:underline">
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
