<template>
  <fragment>
    <Heading level="1" class="mb-10">{{ welcomeMessage }}</Heading>
    <ul>
      <li>
        <RouteLink to="/games/add">Créer une partie</RouteLink>
      </li>
      <li>
        <RouteLink to="/games">Voir les parties autour de soi</RouteLink>
      </li>
    </ul>
  </fragment>
</template>

<script>
import { mapGetters } from "vuex";
import Heading from "@/components/texts/Heading";

export default {
  name: "PageHome",
  middleware: ["authenticatedOnly"],
  components: {
    Heading,
  },
  computed: {
    ...mapGetters({
      loggedUser: "authentication/loggedUser",
    }),
    welcomeMessage() {
      return `Bonjour ${this.loggedUser.pseudo}`;
    },
  },
};
</script>
