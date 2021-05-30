<template>
  <div class="container">
    <Heading level="2">Profil</Heading>
    <p>{{ user.pseudo }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Heading from "@/components/texts/Heading";

export default {
  name: "PageProfil",
  middleware: ["authenticatedOnly"],
  components: {
    Heading,
  },
  computed: {
    ...mapGetters({
      user: "authentication/user",
    }),
  },
};
</script>

<style lang="scss" scoped></style>
