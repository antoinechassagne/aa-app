<template>
  <div>
    <Heading level="1">S'inscrire</Heading>
    <form @submit="submit">
      <div>
        <label for="pseudo">Pseudo :</label>
        <input v-model="pseudo" id="pseudo" type="text" placeholder="Saisissez votre adresse pseudo" required />
      </div>
      <div>
        <label for="phone">Numéro de téléphone :</label>
        <input
          v-model="phone"
          id="phone"
          type="tel"
          pattern="^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$"
          placeholder="Saisissez votre numéro de téléphone"
          required
        />
      </div>
      <div>
        <label for="email">Email :</label>
        <input v-model="email" id="email" type="text" placeholder="Saisissez votre adresse email" required />
      </div>
      <div>
        <label for="password">Mot de passe :</label>
        <input v-model="password" id="password" type="password" placeholder="Saisissez votre mot de passe" required />
        <p>8 caractères minimum dont au moins une majuscule, un chiffre et un caractère spécial.</p>
      </div>
      <div>
        <label for="password">Confirmez votre mot de passe :</label>
        <input
          v-model="passwordConfirmation"
          id="passwordConfirmation"
          type="password"
          placeholder="Confirmez votre mot de passe"
          required
        />
      </div>
      <FeedbackMessage v-if="error" type="error">
        {{ error }}
      </FeedbackMessage>
      <button type="submit" @click.prevent="submit" :disabled="loading">
        <template v-if="loading">Inscription...</template>
        <template v-else>S'inscrire</template>
      </button>
      <div>
        <RouteLink to="/login">Vous êtes déjà inscrit ? Connectez-vous dès maintenant</RouteLink>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Heading from "@/components/texts/Heading";
import FeedbackMessage from "@/components/FeedbackMessage";

export default {
  name: "PageRegister",
  middleware: ["guestOnly"],
  components: {
    Heading,
    FeedbackMessage,
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
      this.register({ pseudo: this.pseudo, phone: this.phone, email: this.email, password: this.password }).then(() => {
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
