export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  fetchGame(context, gameId) {
    return this.$axios.$get(`/games/${gameId}`);
  },
  fetchGames(context, query = {}) {
    return this.$axios.$get("/games", { params: { ...query } });
  },
  createGame(context, form) {
    const { user } = context.rootState.authentication;
    return this.$axios.$post("/games", { ...form, creatorId: user.id });
  },
  updateGame(context, payload) {
    return this.$axios.$put(`/games/${payload.gameId}`, payload.form);
  },
  deleteGame(context, gameId) {
    return this.$axios.$delete(`/games/${gameId}`);
  },
};
