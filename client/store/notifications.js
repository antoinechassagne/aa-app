export const state = () => ({
  notifications: [],
});

export const getters = {
  notifications: (state) => state.notifications,
  unreadCount: (state) => state.notifications.filter((n) => !n.read).length,
};

export const mutations = {
  SET_NOTIFICATIONS(state, notifications) {
    state.notifications = notifications;
  },
};

export const actions = {
  fetchNotifications(context, query = {}) {
    return new Promise((resolve, reject) => {
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
        .catch((error) => reject(error));
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
        .catch((error) => reject(error));
    });
  },
  readNotification(context, notificationId) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$put(`/notifications/${notificationId}`, { read: true })
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  },
};
