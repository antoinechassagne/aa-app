export const state = () => ({
  loading: false,
  error: null,
  taxonomies: {
    gameCategories: [],
  },
});

export const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  taxonomies: (state) => state.taxonomies,
};

export const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_TAXONOMIES(state, taxonomies) {
    state.taxonomies = { ...state.taxonomies, ...taxonomies };
  },
};

export const actions = {
  fetchGameCategories(context, query = {}) {
    return new Promise((resolve, reject) => {
      context.commit("SET_ERROR", null);
      context.commit("SET_LOADING", true);
      this.$axios
        .$get("/game-categories", { params: { ...query } })
        .then((gameCategories) => {
          context.commit("SET_TAXONOMIES", { gameCategories: gameCategories || [] });
          return resolve(context.state.taxonomies);
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
  cleanError(context) {
    context.commit("SET_ERROR", null);
  },
};
