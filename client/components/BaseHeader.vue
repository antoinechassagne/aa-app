<template>
  <header>
    <nav>
      <ul>
        <li><RouteLink to="/">Ludis</RouteLink></li>
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
