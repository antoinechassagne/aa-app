<template>
  <div class="container flex">
    <div class="form-container">
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
        <ButtonPrimary type="submit" @click="submit" :loading="loading.login" :disabled="loading.login">
          Se connecter
        </ButtonPrimary>
      </form>
      <div>
        <RouteLink to="/register">Vous n'êtes pas encore inscrit ? Inscrivez-vous dès maintenant</RouteLink>
      </div>
    </div>
    <div class="right-side">
      <img src="~/assets/images/main-illustration-2.png" alt="Illustration" class="right-side__image" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
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
      loading: {
        login: false,
      },
      error: null,
      email: null,
      password: null,
    };
  },
  methods: {
    ...mapActions({
      login: "authentication/login",
      fetchUser: "authentication/fetchUser",
    }),
    async submit() {
      this.error = null;
      this.loading.login = true;
      try {
        await this.login({ email: this.email, password: this.password });
        await this.fetchUser();
        this.$router.push("/");
      } catch (err) {
        this.error = err;
      } finally {
        this.loading.login = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 90vh;
  display: flex;
  justify-content: center;

  @include on-tablet {
    margin: 2rem 0 4rem 0;
  }

  @include on-mobile {
    margin: 2rem 0;
  }
}
.flex {
  display: flex;

  @include on-tablet {
    flex-direction: column-reverse;
  }
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

  @include on-tablet {
    width: 100%;
    margin: 2rem 0;
  }
}
a {
  text-decoration: none;
  color: $color-primary;
}
</style>
