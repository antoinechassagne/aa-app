const participationStatuses = require("../../common/constants/participationStatuses");

export const state = () => ({
  loading: false,
  error: null,
  participations: [],
});

export const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  participations: (state) => state.participations,
};

export const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_PARTICIPATIONS(state, participations) {
    state.participations = participations;
  },
};

export const actions = {
  fetchParticipations(context, query = {}) {
    return new Promise((resolve, reject) => {
      context.commit("SET_ERROR", null);
      context.commit("SET_LOADING", true);
      this.$axios
        .$get("/participations", { params: { ...query } })
        .then((participations) => {
          context.commit("SET_PARTICIPATIONS", participations);
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
  createParticipation(context, gameId) {
    return new Promise((resolve, reject) => {
      context.commit("SET_ERROR", null);
      context.commit("SET_LOADING", true);
      const { user } = context.rootState.authentication;
      this.$axios
        .$post("/participations", { userId: user.id, gameId, statusId: participationStatuses.PENDING })
        .then((participationId) => resolve(participationId))
        .catch((error) => {
          context.commit("SET_ERROR", error);
          return reject();
        })
        .finally(() => {
          context.commit("SET_LOADING", false);
        });
    });
  },
  acceptParticipation(context, participationId) {
    return new Promise((resolve, reject) => {
      context.commit("SET_ERROR", null);
      context.commit("SET_LOADING", true);
      this.$axios
        .$put(`/participations/${participationId}`, { statusId: participationStatuses.ACCEPTED })
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
  refuseParticipation(context, participationId) {
    return new Promise((resolve, reject) => {
      context.commit("SET_ERROR", null);
      context.commit("SET_LOADING", true);
      this.$axios
        .$put(`/participations/${participationId}`, { statusId: participationStatuses.REFUSED })
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
  deleteParticipation(context, participationId) {
    return new Promise((resolve, reject) => {
      context.commit("SET_ERROR", null);
      context.commit("SET_LOADING", true);
      this.$axios
        .$delete(`/participations/${participationId}`)
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
