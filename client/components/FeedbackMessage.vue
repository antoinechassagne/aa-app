<template>
  <div :class="typeClasses">
    <slot />
  </div>
</template>

<script>
export default {
  name: "FeedbackMessage",
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        const types = ["info", "success", "warning", "error"];
        if (!types.includes(value)) {
          console.log(`Props validation]: Type must be ${types.join(" or ")}`);
          return false;
        }
        return true;
      },
    },
  },
  computed: {
    typeClasses() {
      switch (this.type) {
        case "info":
          return "text-blue-600";
        case "success":
          return "text-green-600";
        case "warning":
          return "text-orange-600";
        case "error":
          return "text-red-600";
        default:
          return null;
      }
    },
  },
};
</script>
