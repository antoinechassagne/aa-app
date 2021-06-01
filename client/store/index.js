export const state = () => ({});

export const getters = {};

export const mutations = {};

export const actions = {
  async nuxtServerInit(context) {
    try {
      await context.dispatch("authentication/fetchUser");
      await Promise.all[
        (context.dispatch("notifications/fetchNotifications"), context.dispatch("taxonomies/fetchGameCategories"))
      ];
    } catch (error) {}
  },
};
