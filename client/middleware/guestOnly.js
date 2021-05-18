export default function ({ store, redirect }) {
  if (store.getters["authentication/user"]) {
    return redirect("/");
  }
}
