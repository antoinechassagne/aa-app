<template>
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    :width="`${width}px`"
    :height="`${height}px`"
    viewBox="0 0 24 24"
    aria-labelledby="mapIconTitle"
    stroke-width="1"
    stroke-linecap="round"
    stroke-linejoin="miter"
    fill="none"
    :class="`icon icon--${color}`"
  >
    <polygon points="9 19 3 21 3 5 9 3 15 5 21 3 21 18.5 15 21" />
    <path stroke-linecap="round" d="M15 5L15 21M9 3L9 19" />
  </svg>
</template>

<script>
import Icon from "./Icon";

export default {
  name: "IconMap",
  mixins: [Icon],
};
</script>
