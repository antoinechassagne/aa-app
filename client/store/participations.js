import participationStatuses from "../constants/participationStatuses";

export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  fetchParticipations(context, query = {}) {
    return this.$axios.$get("/participations", { params: { ...query } });
  },
  createParticipation(context, gameId) {
    const { user } = context.rootState.authentication;
    return this.$axios.$post("/participations", { userId: user.id, gameId, statusId: participationStatuses.PENDING });
  },
  acceptParticipation(context, participationId) {
    return this.$axios.$put(`/participations/${participationId}`, { statusId: participationStatuses.ACCEPTED });
  },
  refuseParticipation(context, participationId) {
    return this.$axios.$put(`/participations/${participationId}`, { statusId: participationStatuses.REFUSED });
  },
  deleteParticipation(context, participationId) {
    return this.$axios.$delete(`/participations/${participationId}`);
  },
};
