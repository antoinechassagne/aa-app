<template>
  <div class="container">
    <Heading level="2">Profil</Heading>
    <div>
      <span class="subheading">Pseudo</span>
      <p>{{ user.pseudo }}</p>
    </div>
    <div>
      <span class="subheading">Télephone</span>
      <p>{{ user.phone }}</p>
    </div>
    <div>
      <span class="subheading">Email</span>
      <p>{{ user.email }}</p>
    </div>
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

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 4rem 0;
}
.container > div {
  width: 50%;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px $color-grey;
  margin-bottom: 2rem;
  padding: 1rem 0 2rem 0;

  @include on-mobile {
    width: 100%;
  }
}
h2 {
  margin: 2rem 0 2rem 0;
}
</style>
