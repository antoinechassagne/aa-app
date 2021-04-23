<template>
  <div :class="levelClasses">
    <slot />
  </div>
</template>

<script>
export default {
  name: "InformationBanner",
  props: {
    level: {
      type: String,
      required: true,
      validator(value) {
        const levels = ["info", "warning", "error"];
        if (!levels.includes(value)) {
          console.log(`Props validation]: Type must be ${levels.join(" or ")}`);
          return false;
        }
        return true;
      },
    },
  },
  computed: {
    levelClasses() {
      switch (this.type) {
        case "info":
          return "green";
        case "warning":
          return "orange";
        case "error":
          return "red";
        default:
          return null;
      }
    },
  },
};
</script>
