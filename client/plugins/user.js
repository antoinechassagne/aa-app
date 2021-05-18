export default async function ({ app, store }, inject) {
  await store.dispatch("authentication/fetchUser");
  const user = store.getters["authentication/user"];
  inject("user", user);
}
