<template>
  <div class="container flex">
    <div class="form-container">
      <Heading level="1">Se connecter</Heading>
      <form @submit="submit">
        <div>
          <label class="subheading" for="email">Email :</label>
          <input v-model="email" id="email" type="text" placeholder="Saisissez votre adresse email" required />
        </div>
        <div>
          <label class="subheading" for="password">Mot de passe :</label>
          <input v-model="password" id="password" type="password" placeholder="Saisissez votre mot de passe" required />
        </div>
        <FeedbackMessage v-if="error" type="error">
          {{ error }}
        </FeedbackMessage>
        <ButtonPrimary type="submit" @click="submit" :loading="loading.login" :disabled="loading.login">
          Se connecter
        </ButtonPrimary>
      </form>
      <div>
        <RouteLink to="/register">Vous n'êtes pas encore inscrit ? Inscrivez-vous dès maintenant</RouteLink>
      </div>
    </div>
    <div class="right-side">
      <img src="~/assets/images/illustration_1.png" alt="Illustration" class="right-side__image" />
      <p class="right-side__text">
        Utilisez ce module afin de créer des nouvelles parties. les informations comme votre adresse ne seront
        divulguées aux autres jouers que lorsque vous aurez validé leur participation
      </p>
    </div>
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
<style lang="scss" scoped>
.container {
  margin-top: 2rem !important;
  height: 90vh;
  display: flex;
  justify-content: center;
}
.flex {
  display: flex;
}
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
form {
  margin: 2rem 0 2rem 0 !important;
}
form > div {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem !important;
}
label {
  margin-bottom: 1rem;
}
.right-side {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;

  &__image {
    width: 75%;
    object-fit: contain;
  }

  &__text {
    width: 75%;
    text-align: center;
    color: $color-grey;
    margin-top: 2rem;
  }

  @include on-mobile {
    display: none;
  }
}
a {
  text-decoration: none;
  color: $color-primary;
}
</style>
