<template>
  <NuxtLink :to="to" class="text-indigo-500 hover:underline">
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
  },
};
</script>
