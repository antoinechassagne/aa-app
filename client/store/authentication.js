export const state = () => ({
  loading: false,
  error: null,
  loggedUser: null,
});

export const getters = {
  loading: (state) => state.loading,
  error: (state) => state.error,
  loggedUser: (state) => state.loggedUser,
};

export const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_LOGGED_USER(state, loggedUser) {
    state.loggedUser = loggedUser;
  },
};

export const actions = {
  register(context, form) {
    return new Promise((resolve, reject) => {
      context.commit("SET_ERROR", null);
      context.commit("SET_LOADING", true);
      this.$axios
        .$post("/register", form)
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
  login(context, credentials) {
    return new Promise((resolve, reject) => {
      context.commit("SET_ERROR", null);
      context.commit("SET_LOADING", true);
      this.$axios
        .$post("/login", {
          email: credentials.email,
          password: credentials.password,
        })
        .then(() => {
          return context
            .dispatch("fetchLoggedUser")
            .then(() => resolve())
            .catch((error) => {
              context.commit("SET_ERROR", error);
            });
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
  logout(context) {
    return new Promise((resolve, reject) => {
      context.commit("SET_ERROR", null);
      context.commit("SET_LOADING", true);
      this.$axios
        .$get("/logout")
        .then(() => {
          context.commit("SET_LOGGED_USER", null);
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
  fetchLoggedUser(context) {
    context.commit("SET_ERROR", null);
    context.commit("SET_LOADING", true);
    return new Promise((resolve, reject) => {
      this.$axios
        .$get("/logged-user")
        .then((user) => {
          context.commit("SET_LOGGED_USER", user);
          return resolve();
        })
        .catch((error) => reject(error))
        .finally(() => {
          context.commit("SET_LOADING", false);
        });
    });
  },
  cleanError(context) {
    context.commit("SET_ERROR", null);
  },
};
