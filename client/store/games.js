export const state = () => ({
  loading: {
    game: false,
    games: false,
    create: false,
    update: false,
    delete: false,
  },
  error: null,
  game: null,
  games: [],
});

export const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  game: (state) => state.game,
  games: (state) => state.games,
};

export const mutations = {
  SET_LOADING(state, loading) {
    state.loading = { ...state.loading, ...loading };
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_GAME(state, game) {
    state.game = game;
  },
  SET_GAMES(state, games) {
    state.games = games;
  },
};

export const actions = {
  fetchGame(context, gameId) {
    return new Promise((resolve, reject) => {
      context.commit("SET_ERROR", null);
      context.commit("SET_LOADING", { game: true });
      this.$axios
        .$get(`/games/${gameId}`)
        .then((game) => {
          context.commit("SET_GAME", game || null);
          return resolve(context.state.game);
        })
        .catch((error) => {
          context.commit("SET_ERROR", error);
          return reject();
        })
        .finally(() => {
          context.commit("SET_LOADING", { game: false });
        });
    });
  },
  fetchGames(context, query = {}) {
    return new Promise((resolve, reject) => {
      context.commit("SET_ERROR", null);
      context.commit("SET_LOADING", { games: true });
      this.$axios
        .$get("/games", { params: { ...query } })
        .then((games) => {
          context.commit("SET_GAMES", games || []);
          return resolve(games || []);
        })
        .catch((error) => {
          context.commit("SET_ERROR", error);
          return reject();
        })
        .finally(() => {
          context.commit("SET_LOADING", { games: false });
        });
    });
  },
  createGame(context, form) {
    return new Promise((resolve, reject) => {
      context.commit("SET_ERROR", null);
      context.commit("SET_LOADING", { create: true });
      const { user } = context.rootState.authentication;
      this.$axios
        .$post("/games", { ...form, creatorId: user.id })
        .then((gameId) => resolve(gameId))
        .catch((error) => {
          context.commit("SET_ERROR", error);
          return reject();
        })
        .finally(() => {
          context.commit("SET_LOADING", { create: false });
        });
    });
  },
  updateGame(context, payload) {
    return new Promise((resolve, reject) => {
      context.commit("SET_ERROR", null);
      context.commit("SET_LOADING", { update: true });
      this.$axios
        .$put(`/games/${payload.gameId}`, payload.form)
        .then(() => resolve())
        .catch((error) => {
          context.commit("SET_ERROR", error);
          return reject();
        })
        .finally(() => {
          context.commit("SET_LOADING", { update: false });
        });
    });
  },
  deleteGame(context, gameId) {
    return new Promise((resolve, reject) => {
      context.commit("SET_ERROR", null);
      context.commit("SET_LOADING", { delete: true });
      this.$axios
        .$delete(`/games/${gameId}`)
        .then(() => resolve())
        .catch((error) => {
          context.commit("SET_ERROR", error);
          return reject();
        })
        .finally(() => {
          context.commit("SET_LOADING", { delete: false });
        });
    });
  },
  cleanError(context) {
    context.commit("SET_ERROR", null);
  },
};
