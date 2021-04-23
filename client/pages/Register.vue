<template>
  <fragment>
    <Heading level="1">S'inscrire</Heading>
    <form @submit="submit">
      <div class="flex flex-col">
        <label for="pseudo">Pseudo :</label>
        <input
          v-model="pseudo"
          id="pseudo"
          type="text"
          placeholder="Saisissez votre adresse pseudo"
          required
          class="border-2 border-indigo-400 rounded p-1"
        />
      </div>
      <div class="flex flex-col">
        <label for="email">Email :</label>
        <input
          v-model="email"
          id="email"
          type="text"
          placeholder="Saisissez votre adresse email"
          required
          class="border-2 border-indigo-400 rounded p-1"
        />
      </div>
      <div class="flex flex-col my-2">
        <label for="password">Mot de passe :</label>
        <input
          v-model="password"
          id="password"
          type="password"
          placeholder="Saisissez votre mot de passe"
          required
          class="border-2 border-indigo-400 rounded p-1"
        />
      </div>
      <div class="flex flex-col my-2">
        <label for="password">Confirmez votre mot de passe :</label>
        <input
          v-model="passwordConfirmation"
          id="passwordConfirmation"
          type="password"
          placeholder="Confirmez votre mot de passe"
          required
          class="border-2 border-indigo-400 rounded p-1"
        />
      </div>
      <InformationBanner v-if="error" type="error">
        {{ error }}
      </InformationBanner>
      <button
        type="submit"
        @click.prevent="submit"
        class="border-2 border-indigo-400 rounded p-1 my-2"
        :disabled="loading"
      >
        <template v-if="loading">Inscription...</template>
        <template v-else>S'inscrire</template>
      </button>
      <div class="flex flex-col my-2">
        <RouteLink path="/login">Vous êtes déjà inscrit ? Connectez-vous dès maintenant</RouteLink>
      </div>
    </form>
  </fragment>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Heading from "@/components/texts/Heading";
import InformationBanner from "@/components/InformationBanner";
import RouteLink from "@/components/texts/RouteLink";

export default {
  name: "PageRegister",
  middleware: ["guestOnly"],
  components: {
    Heading,
    InformationBanner,
    RouteLink,
  },
  data() {
    return {
      pseudo: null,
      email: null,
      password: null,
      passwordConfirmation: null,
    };
  },
  computed: {
    ...mapGetters({
      loading: "authentication/loading",
      error: "authentication/error",
    }),
  },
  methods: {
    ...mapActions({
      register: "authentication/register",
      login: "authentication/login",
      cleanError: "authentication/cleanError",
    }),
    submit() {
      this.register({ pseudo: this.pseudo, email: this.email, password: this.password }).then(() => {
        this.login({ email: this.email, password: this.password }).then(() => {
          this.$router.push("/");
        });
      });
    },
  },
  destroyed() {
    this.cleanError();
  },
};
</script>
