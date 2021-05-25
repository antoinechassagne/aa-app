<template>
  <header>
    <nav class="nav">
      <ul>
        <li><RouteLink to="/">LUDIS</RouteLink></li>
        <li><RouteLink to="/games">Rechercher une partie</RouteLink></li>
        <template v-if="user">
          <li><RouteLink to="/games/add">Créer une partie</RouteLink></li>
          <li>
            <RouteLink to="/notifications">Notifications {{ unreadNotificationsCountLabel }}</RouteLink>
          </li>
          <li><RouteLink to="/logout">Se déconnecter</RouteLink></li>
        </template>
        <template v-else>
          <li><RouteLink to="/login">Se connecter</RouteLink></li>
          <li><RouteLink to="/register">S'inscrire</RouteLink></li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "BaseHeader",
  props: {
    user: {
      type: Object,
    },
    unreadNotificationsCount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    unreadNotificationsCountLabel() {
      return this.unreadNotificationsCount ? `(${this.unreadNotificationsCount})` : null;
    },
  },
};
</script>
<style scoped>
.nav {
  height: 10vh;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 0px 6px 5px rgba(196, 196, 196, 0.62);
}
ul {
  display: flex;
  width: 100%;
  list-style: none;
  justify-content: space-around;
  align-items: center;
}
</style>
