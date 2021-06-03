<template>
  <div class="container flex">
    <div class="form-container">
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
        <ButtonPrimary type="submit" @click="submit" :loading="loading.register" :disabled="loading.register">
          S'inscrire
        </ButtonPrimary>
      </form>
      <div>
        <RouteLink to="/login">Vous êtes déjà inscrit ? Connectez-vous dès maintenant</RouteLink>
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
  name: "PageRegister",
  middleware: ["guestOnly"],
  components: {
    Heading,
    ButtonPrimary,
    FeedbackMessage,
  },
  data() {
    return {
      loading: {
        register: false,
      },
      error: null,
      pseudo: null,
      phone: null,
      email: null,
      password: null,
      passwordConfirmation: null,
    };
  },
  methods: {
    ...mapActions({
      register: "authentication/register",
      login: "authentication/login",
      fetchUser: "authentication/fetchUser",
    }),
    async submit() {
      this.error = null;
      this.loading.register = true;
      try {
        await this.register({ pseudo: this.pseudo, phone: this.phone, email: this.email, password: this.password });
        await this.login({ email: this.email, password: this.password });
        await this.fetchUser();
        this.$router.push("/");
      } catch (err) {
        this.error = err;
      } finally {
        this.loading.register = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
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
  margin: 4rem 0;

  @include on-tablet {
    margin: 2rem 0 4rem 0;
  }

  @include on-mobile {
    margin: 2rem 0;
  }
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
p {
  margin-top: 1rem;
}
</style>
