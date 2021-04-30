<template>
  <div>
    <Heading level="1">Se connecter</Heading>
    <form @submit="submit">
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
      <FeedbackMessage v-if="error" type="error">
        {{ error }}
      </FeedbackMessage>
      <button
        type="submit"
        @click.prevent="submit"
        class="border-2 border-indigo-400 rounded p-1 my-2"
        :disabled="loading"
      >
        <template v-if="loading">Connexion...</template>
        <template v-else>Se connecter</template>
      </button>
      <div class="flex flex-col my-2">
        <RouteLink to="/register">Vous n'êtes pas encore inscrit ? Inscrivez-vous dès maintenant</RouteLink>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Heading from "@/components/texts/Heading";
import FeedbackMessage from "@/components/FeedbackMessage";

export default {
  name: "PageLogin",
  middleware: ["guestOnly"],
  components: {
    Heading,
    FeedbackMessage,
  },
  data() {
    return {
      email: null,
      password: null,
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
      login: "authentication/login",
      cleanError: "authentication/cleanError",
    }),
    submit() {
      this.login({ email: this.email, password: this.password }).then(() => {
        this.$router.push("/");
      });
    },
  },
  destroyed() {
    this.cleanError();
  },
};
</script>
