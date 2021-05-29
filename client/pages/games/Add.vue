<template>
  <div>
    <Heading level="1">Créer une nouvelle partie</Heading>
    <form>
      <div>
        <label for="boardGameName">Nom du jeu :</label>
        <input v-model="boardGameName" id="boardGameName" type="text" placeholder="Saisissez le nom du jeu" required />
      </div>
      <div>
        <label for="email">Description :</label>
        <textarea v-model="description" id="description" type="text" placeholder="Saisissez une description" rows="6" />
      </div>
      <div>
        <label for="email">Catégorie :</label>
        <select v-model="categoryId" id="categoryId" required>
          <option :value="null">--Sélectionnez une catégorie--</option>
          <template v-for="gameCategory in taxonomies.gameCategories">
            <option :value="gameCategory.id" :key="gameCategory.id">{{ gameCategory.label }}</option>
          </template>
        </select>
      </div>
      <div>
        <label for="date">Date :</label>
        <input v-model="date" id="date" type="date" required />
      </div>
      <div>
        <label for="time">Heure :</label>
        <input v-model="time" id="time" type="time" required />
      </div>
      <div>
        <label>Lieu : </label>
        <InputSearchLocation @select-location="updateLocation" required />
      </div>
      <div>
        <label for="missingPlayers">Nombre de joueurs manquants:</label>
        <input
          v-model.number="missingPlayers"
          id="missingPlayers"
          type="number"
          min="0"
          placeholder="Saisissez le nombre de joueurs manquants"
          required
        />
      </div>
      <FeedbackMessage v-if="error" type="error"> {{ error }} </FeedbackMessage>
      <ButtonPrimary type="submit" @click="submit" :loading="loading.create" :disabled="!canSubmitForm">
        Créer
      </ButtonPrimary>
    </form>
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
      time: dayjs().format("hh:mm"),
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
      const hour = this.time.substring(0, 1);
      const minute = this.time.substring(3, 4);
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
