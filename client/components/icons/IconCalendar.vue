<template>
  <svg
    :width="`${width}px`"
    :height="`${height}px`"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    stroke-width="1.5"
    stroke-linecap="square"
    stroke-linejoin="miter"
    fill="none"
    :class="`icon icon--${color}`"
  >
    <path d="M3 5H21V21H3V5Z" />
    <path d="M21 9H3" />
    <path d="M7 5V3" />
    <path d="M17 5V3" />
    <rect x="15" y="15" width="2" height="2" />
  </svg>
</template>

<script>
import Icon from "./Icon";

export default {
  name: "IconCalendar",
  mixins: [Icon],
};
</script>
