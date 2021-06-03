export const state = () => ({
  user: null,
});

export const getters = {
  user: (state) => state.user,
};

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
};

export const actions = {
  register(context, form) {
    return this.$axios.$post("/register", form);
  },
  login(context, credentials) {
    return this.$axios.$post("/login", {
      email: credentials.email,
      password: credentials.password,
    });
  },
  logout(context) {
    return new Promise((resolve, reject) => {
      this.$axios.$get("/logout").then(() => {
        context.commit("SET_USER", null);
        return resolve();
      });
    }).catch((error) => reject(error));
  },
  fetchUser(context) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get("/logged-user")
        .then((user) => {
          context.commit("SET_USER", user || null);
          return resolve();
        })
        .catch((error) => reject(error));
    });
  },
};
