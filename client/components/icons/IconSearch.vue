<template>
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    :width="`${width}px`"
    :height="`${height}px`"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="miter"
    fill="none"
    :class="`icon icon--${color}`"
  >
    <path d="M14.4121122,14.4121122 L20,20" />
    <circle cx="10" cy="10" r="6" />
  </svg>
</template>

<script>
import Icon from "./Icon";

export default {
  name: "IconSearch",
  mixins: [Icon],
};
</script>
