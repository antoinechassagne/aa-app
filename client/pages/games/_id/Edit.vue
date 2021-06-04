<template>
  <div class="container flex">
    <div class="form-container">
      <Heading level="2">Modifier {{ game.boardGameName }}</Heading>
      <form>
        <div class="input-container">
          <label for="boardGameName">Nom du jeu </label>
          <input
            v-model="boardGameName"
            id="boardGameName"
            type="text"
            placeholder="Saisissez le nom du jeu"
            required
          />
        </div>
        <div class="input-container">
          <label for="email"> Description </label>
          <textarea
            v-model="description"
            id="description"
            type="text"
            placeholder="Saisissez une description"
            rows="6"
          />
        </div>
        <div class="input-group">
          <div class="input-container">
            <label for="email"> Catégorie </label>
            <select v-model="categoryId" id="categoryId" required>
              <option :value="null">Sélectionnez une catégorie</option>
              <template v-for="gameCategory in taxonomies.gameCategories">
                <option :value="gameCategory.id" :key="gameCategory.id">{{ gameCategory.label }}</option>
              </template>
            </select>
          </div>
          <div class="input-container">
            <label for="missingPlayers">Nombre de places</label>
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
        <div class="input-group">
          <div class="input-container">
            <label for="date">Date </label>
            <input v-model="date" id="date" type="date" required />
          </div>
          <div class="input-container">
            <label for="time">Heure </label>
            <input v-model="time" id="time" type="time" required />
          </div>
        </div>
        <div class="input-container">
          <label for="location">Localisation </label>
          <InputSearchLocation
            id="location"
            :predefinedLocation="{ latitude: game.latitude, longitude: game.longitude }"
            required
            @select-location="updateLocation"
          />
        </div>
        <FeedbackMessage v-if="error" type="error"> {{ error }} </FeedbackMessage>
        <ButtonPrimary type="submit" @click="submit" :loading="loading.edit" :disabled="!canSubmitForm">
          Valider
        </ButtonPrimary>
      </form>
    </div>
    <div class="right-side">
      <img src="~/assets/images/add-illustration.png" alt="Illustration" class="right-side__image" />
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
  name: "PageGamesEdit",
  middleware: ["authenticatedOnly"],
  components: {
    Heading,
    ButtonPrimary,
    FeedbackMessage,
    InputSearchLocation,
  },
  async asyncData({ params, store, error }) {
    try {
      const game = await store.dispatch("games/fetchGame", params.id);
      return { game };
    } catch (err) {
      error({ error: err });
    }
  },
  data() {
    return {
      loading: {
        edit: false,
      },
      error: null,
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
      taxonomies: "taxonomies/taxonomies",
    }),
    plannedDate() {
      if (!this.date || !this.time) {
        return null;
      }
      const hour = parseFloat(this.time.substring(0, 2));
      const minute = parseFloat(this.time.substring(3, 5));
      const date = dayjs(this.date).hour(hour).minute(minute);
      return date.toISOString();
    },
    canSubmitForm() {
      return !this.loading.edit;
    },
  },
  methods: {
    ...mapActions({
      updateGame: "games/updateGame",
    }),
    updateLocation(location) {
      this.location = location;
    },
    async submit() {
      this.error = null;
      this.loading.edit = true;
      try {
        const gameId = await this.updateGame({
          gameId: this.game.id,
          form: {
            creatorId: this.game.creatorId,
            plannedDate: this.plannedDate,
            latitude: this.location.latitude,
            longitude: this.location.longitude,
            location: this.location.label,
            boardGameName: this.boardGameName,
            categoryId: this.categoryId,
            description: this.description,
            missingPlayers: this.missingPlayers,
          },
        });
        this.$router.push(`/games/${this.game.id}`);
      } catch (err) {
        this.error = err;
      } finally {
        this.loading.edit = false;
      }
    },
  },
  created() {
    this.boardGameName = this.game.boardGameName;
    this.categoryId = this.game.categoryId;
    this.description = this.game.description;
    this.date = dayjs(this.game.plannedDate).format("YYYY-MM-DD");
    this.time = dayjs(this.game.plannedDate).format("HH:mm");
    this.location = this.game.location;
    this.missingPlayers = this.game.missingPlayers;
  },
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;

  @include on-tablet {
    flex-direction: column-reverse;
  }
}

.form-container {
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: 4rem 0;

  @include on-tablet {
    width: 100%;
  }
}

form {
  margin-top: 2rem;
}

.input-group {
  display: flex;
  justify-content: space-between;

  @include on-mobile {
    flex-direction: column;
  }

  .input-container {
    width: calc(50% - 1rem);

    @include on-mobile {
      width: 100%;
    }
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

  @include on-tablet {
    width: 100%;
  }

  &__image {
    width: 75%;
    object-fit: contain;

    @include on-tablet {
      width: 50%;
      margin-top: 2rem;
    }

    @include on-mobile {
      width: 100%;
    }
  }

  &__text {
    width: 75%;
    text-align: center;
    color: $color-grey;
    margin-top: 2rem;
  }

  @include on-mobile {
    width: 100%;
    margin-top: 2rem;
  }
}
</style>
