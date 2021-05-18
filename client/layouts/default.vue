<template>
  <div>
    <BaseHeader :user="user" />
    <main class="container mx-auto pl-4 pr-4">
      <Nuxt />
    </main>
  </div>
</template>

<script>
import BaseHeader from "@/components/BaseHeader";

export default {
  name: "DefaultLayout",
  components: {
    BaseHeader,
  },
  computed: {
    user() {
      return this.$user;
    },
  },
};
</script>
