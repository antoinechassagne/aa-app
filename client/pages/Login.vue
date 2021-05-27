<template>
  <div>
    <Heading level="1">Se connecter</Heading>
    <form @submit="submit">
      <div>
        <label for="email">Email :</label>
        <input v-model="email" id="email" type="text" placeholder="Saisissez votre adresse email" required />
      </div>
      <div>
        <label for="password">Mot de passe :</label>
        <input v-model="password" id="password" type="password" placeholder="Saisissez votre mot de passe" required />
      </div>
      <FeedbackMessage v-if="error" type="error">
        {{ error }}
      </FeedbackMessage>
      <ButtonPrimary type="submit" @click="submit" :loading="loading" :disabled="loading"> Se connecter </ButtonPrimary>
      <div>
        <RouteLink to="/register">Vous n'êtes pas encore inscrit ? Inscrivez-vous dès maintenant</RouteLink>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Heading from "@/components/texts/Heading";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import FeedbackMessage from "@/components/FeedbackMessage";

export default {
  name: "PageLogin",
  middleware: ["guestOnly"],
  components: {
    Heading,
    ButtonPrimary,
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
