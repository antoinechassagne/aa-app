export const state = () => ({
  loading: {
    notifications: false,
    read: false,
  },
  error: null,
  notifications: [],
});

export const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  notifications: (state) => state.notifications,
  unreadCount: (state) => state.notifications.filter((n) => !n.read).length,
};

export const mutations = {
  SET_LOADING(state, loading) {
    state.loading = { ...state.loading, ...loading };
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_NOTIFICATIONS(state, notifications) {
    state.notifications = notifications;
  },
};

export const actions = {
  fetchNotifications(context, query = {}) {
    return new Promise((resolve, reject) => {
      context.commit("SET_ERROR", null);
      context.commit("SET_LOADING", { notifications: true });
      const { user } = context.rootState.authentication;
      if (!user) {
        return resolve();
      }
      this.$axios
        .$get("/notifications", { params: { ...query, userId: user.id } })
        .then((notifications) => {
          context.commit("SET_NOTIFICATIONS", notifications || []);
          return resolve(context.state.notifications);
        })
        .catch((error) => {
          context.commit("SET_ERROR", error);
          return reject();
        })
        .finally(() => {
          context.commit("SET_LOADING", { notifications: false });
        });
    });
  },
  pollNotifications(context) {
    return new Promise((resolve, reject) => {
      const { user } = context.rootState.authentication;
      if (!user) {
        return;
      }
      this.$axios
        .$get("/notifications", { params: { read: false, userId: user.id } })
        .then((unreadNotifications) => {
          const readNotifications = context.state.notifications.filter((n) => n.read);
          context.commit("SET_NOTIFICATIONS", [...unreadNotifications, ...readNotifications] || []);
          return resolve(context.state.notifications);
        })
        .catch((error) => {
          return reject();
        });
    });
  },
  readNotification(context, notificationId) {
    return new Promise((resolve, reject) => {
      context.commit("SET_ERROR", null);
      context.commit("SET_LOADING", { read: true });
      this.$axios
        .$put(`/notifications/${notificationId}`, { read: true })
        .then(() => resolve())
        .catch((error) => {
          context.commit("SET_ERROR", error);
          return reject();
        })
        .finally(() => {
          context.commit("SET_LOADING", { read: false });
        });
    });
  },
  cleanError(context) {
    context.commit("SET_ERROR", null);
  },
};
