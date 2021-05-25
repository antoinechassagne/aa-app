<template>
  <component :is="`h${level}`" :class="levelClasses">
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
  computed: {
    levelClasses() {
      switch (this.level) {
        /**
         * @TODO Change classes
         */
        case "1":
          return "h1";
        case "2":
          return "h2";
        case "3":
          return "h3";
        case "4":
          return "h4";
        case "5":
          return "h5";
        case "6":
          return "h6";
      }
    },
  },
};
</script>
<style scoped>
.h1 {
  font-size: 3.75rem;
  line-height: 1;
}
.h2 {
  font-size: 3rem;
  line-height: 1;
}
.h3 {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.h4 {
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: bold;
}
.h5 {
  font-size: 1.5rem;
  line-height: 2rem;
}
.h6 {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
</style>
