export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async nuxtServerInit(context) {
    try {
      await context.dispatch("authentication/fetchUser");
      await context.dispatch("notifications/fetchNotifications");
      await context.dispatch("taxonomies/fetchGameCategories");
    } catch (error) {}
  },
};
