<template>
  <component :is="`h${level}`">
    <slot />
  </component>
</template>

<script>
export default {
  name: "Heading",
  props: {
    level: {
      type: String,
      required: true,
    },
  },
};
</script>
