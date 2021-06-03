export const state = () => ({
  taxonomies: {
    gameCategories: [],
  },
});

export const getters = {
  taxonomies: (state) => state.taxonomies,
};

export const mutations = {
  SET_TAXONOMIES(state, taxonomies) {
    state.taxonomies = { ...state.taxonomies, ...taxonomies };
  },
};

export const actions = {
  fetchGameCategories(context, query = {}) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get("/game-categories", { params: { ...query } })
        .then((gameCategories) => {
          context.commit("SET_TAXONOMIES", { gameCategories: gameCategories || [] });
          return resolve(context.state.taxonomies);
        })
        .catch((error) => reject(error));
    });
  },
  cleanError(context) {
    context.commit("SET_ERROR", null);
  },
};
