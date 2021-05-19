export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async nuxtServerInit(context) {
    try {
      await context.dispatch("authentication/fetchUser");
      await context.dispatch("notifications/fetchNotifications");
    } catch (error) {}
  },
};
