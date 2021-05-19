export const state = () => ({
  loading: false,
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
    state.loading = loading;
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
      context.commit("SET_LOADING", true);
      this.$axios
        .$get(`/games/${gameId}`)
        .then((game) => {
          context.commit("SET_GAME", game || null);
          return resolve();
        })
        .catch((error) => {
          context.commit("SET_ERROR", error);
          return reject();
        })
        .finally(() => {
          context.commit("SET_LOADING", false);
        });
    });
  },
  fetchGames(context, query = {}) {
    return new Promise((resolve, reject) => {
      context.commit("SET_ERROR", null);
      context.commit("SET_LOADING", true);
      this.$axios
        .$get("/games", { params: { ...query } })
        .then((games) => {
          context.commit("SET_GAMES", games || []);
          return resolve();
        })
        .catch((error) => {
          context.commit("SET_ERROR", error);
          return reject();
        })
        .finally(() => {
          context.commit("SET_LOADING", false);
        });
    });
  },
  createGame(context, form) {
    return new Promise((resolve, reject) => {
      context.commit("SET_ERROR", null);
      context.commit("SET_LOADING", true);
      const { user } = context.rootState.authentication;
      this.$axios
        .$post("/games", { ...form, creatorId: user.id })
        .then((gameId) => resolve(gameId))
        .catch((error) => {
          context.commit("SET_ERROR", error);
          return reject();
        })
        .finally(() => {
          context.commit("SET_LOADING", false);
        });
    });
  },
  updateGame(context, payload) {
    return new Promise((resolve, reject) => {
      context.commit("SET_ERROR", null);
      context.commit("SET_LOADING", true);
      this.$axios
        .$put(`/games/${payload.gameId}`, payload.form)
        .then(() => resolve())
        .catch((error) => {
          context.commit("SET_ERROR", error);
          return reject();
        })
        .finally(() => {
          context.commit("SET_LOADING", false);
        });
    });
  },
  deleteGame(context, gameId) {
    return new Promise((resolve, reject) => {
      context.commit("SET_ERROR", null);
      context.commit("SET_LOADING", true);
      this.$axios
        .$delete(`/games/${gameId}`)
        .then(() => resolve())
        .catch((error) => {
          context.commit("SET_ERROR", error);
          return reject();
        })
        .finally(() => {
          context.commit("SET_LOADING", false);
        });
    });
  },
  cleanError(context) {
    context.commit("SET_ERROR", null);
  },
};
