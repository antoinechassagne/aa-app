<template>
  <div>
    <BaseHeader :loggedUser="loggedUser" />
    <main class="container mx-auto pl-4 pr-4">
      <Nuxt />
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import BaseHeader from "@/components/BaseHeader";
export default {
  name: "DefaultLayout",
  components: {
    BaseHeader,
  },
  computed: {
    ...mapGetters({
      loggedUser: "authentication/loggedUser",
    }),
  },
};
</script>
