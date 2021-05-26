<template>
  <header class="sticky">
    <nav class="nav">
      <ul>
        <li><RouteLink to="/">Ludis</RouteLink></li>
        <li><RouteLink to="/games">Rechercher une partie</RouteLink></li>
        <template v-if="user">
          <li><RouteLink to="/games/add">Créer une partie</RouteLink></li>
          <li class="router-notification">
            <RouteLink to="/notifications">
              <div class="notification">
                <img src="./../assets/images/bell.svg" alt="" />
              </div>
              <template v-if="unreadNotificationsCount">
                <div class="pastille-notification">{{ unreadNotificationsCountLabel }}</div>
              </template>
            </RouteLink>
          </li>

          <li class="deroulant">
            <a href="#">{{ this.user.pseudo }}</a>
            <ul class="sous">
              <li><RouteLink to="/logout">Se déconnecter</RouteLink></li>
            </ul>
          </li>
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
      return this.unreadNotificationsCount ? `${this.unreadNotificationsCount}` : null;
    },
  },
};
</script>
<style scoped>
.sticky {
  position: sticky;
  top: 0;
  width: 100%;
  background-color: var(--main-white-color);
  z-index: 10;
}
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
.router-notification {
  position: relative;
}
.notification {
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: var(--light-purple-color);
  border-radius: 10px;
}
.pastille-notification {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  font-size: 0.6rem;
  font-weight: 500;
  color: var(--main-white-color);
  background-color: var(--main-red-color);
  border-radius: 10px;
  position: absolute;
  bottom: -3px;
  right: -3px;
}
</style>
