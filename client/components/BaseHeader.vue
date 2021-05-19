<template>
  <header>
    <nav class="p-4">
      <ul class="flex flex-row">
        <li class="px-2"><RouteLink to="/">AA App</RouteLink></li>
        <li class="px-2"><RouteLink to="/games">Rechercher une partie</RouteLink></li>
        <template v-if="user">
          <li class="px-2"><RouteLink to="/games/add">Créer une partie</RouteLink></li>
          <li class="px-2">
            <RouteLink to="/notifications">Notifications {{ unreadNotificationsCountLabel }}</RouteLink>
          </li>
          <li class="px-2"><RouteLink to="/logout">Se déconnecter</RouteLink></li>
        </template>
        <template v-else>
          <li class="px-2"><RouteLink to="/login">Se connecter</RouteLink></li>
          <li class="px-2"><RouteLink to="/register">S'inscrire</RouteLink></li>
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
