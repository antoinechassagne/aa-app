<template>
  <div class="container flex">
    <div class="form-container">
      <Heading level="2">Créer une partie</Heading>
      <form>
        <div>
          <label class="subheading" for="boardGameName">Nom du jeu </label>
          <input
            v-model="boardGameName"
            id="boardGameName"
            type="text"
            placeholder="Saisissez le nom du jeu"
            required
          />
        </div>
        <div>
          <label class="subheading" for="email"> Description </label>
          <textarea
            v-model="description"
            id="description"
            type="text"
            placeholder="Saisissez une description"
            rows="6"
          />
        </div>
        <div class="double-input">
          <div>
            <label class="subheading" for="email"> Catégorie </label>
            <select v-model="categoryId" id="categoryId" required>
              <option :value="null">Sélectionnez une catégorie</option>
              <template v-for="gameCategory in taxonomies.gameCategories">
                <option :value="gameCategory.id" :key="gameCategory.id">{{ gameCategory.label }}</option>
              </template>
            </select>
          </div>
          <div>
            <label class="subheading" for="missingPlayers">Nombre de places</label>
            <input
              v-model.number="missingPlayers"
              id="missingPlayers"
              type="number"
              min="0"
              placeholder="Saisissez le nombre de joueurs manquants"
              required
            />
          </div>
        </div>
        <div class="double-input">
          <div>
            <label class="subheading" for="date">Date </label>
            <input v-model="date" id="date" type="date" required />
          </div>
          <div>
            <label class="subheading" for="time">Heure </label>
            <input v-model="time" id="time" type="time" required />
          </div>
        </div>
        <div>
          <label class="subheading" for="location">Localisation </label>
          <InputSearchLocation id="location" @select-location="updateLocation" required />
        </div>

        <FeedbackMessage v-if="error" type="error"> {{ error }} </FeedbackMessage>
        <ButtonPrimary connecter type="submit" @click="submit" :loading="loading.create" :disabled="!canSubmitForm">
          Créer
        </ButtonPrimary>
      </form>
    </div>
    <div class="right-side">
      <img src="../../assets/images/illustration_1.png" alt="Illustration" class="right-side__image" />
      <p class="right-side__text">
        Utilisez ce module afin de créer des nouvelles parties. les informations comme votre adresse ne seront
        divulguées aux autres jouers que lorsque vous aurez validé leur participation
      </p>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapGetters, mapActions } from "vuex";
import Heading from "@/components/texts/Heading";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import FeedbackMessage from "@/components/FeedbackMessage";
import InputSearchLocation from "@/components/InputSearchLocation";

export default {
  name: "PageGamesAdd",
  middleware: ["authenticatedOnly"],
  components: {
    Heading,
    ButtonPrimary,
    FeedbackMessage,
    InputSearchLocation,
  },
  data() {
    return {
      boardGameName: null,
      categoryId: null,
      description: null,
      date: dayjs().format("YYYY-MM-DD"),
      time: dayjs().format("HH:mm"),
      location: null,
      missingPlayers: 0,
    };
  },
  computed: {
    ...mapGetters({
      loading: "games/loading",
      error: "games/error",
      taxonomies: "taxonomies/taxonomies",
    }),
    plannedDate() {
      if (!this.date || !this.time) {
        return null;
      }
      const date = dayjs(this.date);
      const hour = this.time.substring(0, 2);
      const minute = this.time.substring(3, 5);
      date.hour(hour);
      date.minute(minute);
      return date.toISOString();
    },
    canSubmitForm() {
      return !this.loading.create;
    },
  },
  methods: {
    ...mapActions({
      createGame: "games/createGame",
      cleanError: "games/cleanError",
    }),
    updateLocation(location) {
      this.location = location;
    },
    submit() {
      this.createGame({
        plannedDate: this.plannedDate,
        latitude: this.location.latitude,
        longitude: this.location.longitude,
        location: this.location.label,
        boardGameName: this.boardGameName,
        categoryId: this.categoryId,
        description: this.description,
        missingPlayers: this.missingPlayers,
      }).then((gameId) => {
        this.$router.push(`/games/${gameId}`);
      });
    },
  },
  destroyed() {
    this.cleanError();
  },
};
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
}
.form-container {
  width: 50%;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  @include on-mobile {
    width: 100%;
  }
}
form {
  margin-top: 2rem;
}
form > div {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}
.double-input {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @include on-mobile {
    flex-direction: column;
  }
}
.double-input > div {
  display: flex;
  flex-direction: column;
  width: 45%;

  @include on-mobile {
    width: 100%;
    margin-top: 1rem;
  }
}
.input-search-location {
  max-width: 100%;
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
</style>
