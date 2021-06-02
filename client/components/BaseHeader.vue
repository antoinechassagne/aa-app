<template>
  <header class="header">
    <nav>
      <RouteLink to="/" class="header__logo">
        <IconHome width="30" height="30" color="black" class="mobile-only" />
        <span class="desktop-only">Ludis</span>
      </RouteLink>
      <RouteLink to="/games">
        <IconSearch width="30" height="30" color="black" />
        <span class="desktop-only">Rechercher</span>
      </RouteLink>
      <template v-if="user">
        <RouteLink to="/games/add">
          <IconAdd width="30" height="30" color="black" />
          <span class="desktop-only">Créer</span>
        </RouteLink>
        <RouteLink to="/notifications" class="mobile-only">
          <IconNotification width="30" height="30" color="black" />
        </RouteLink>
        <div class="header__profil">
          <RouteLink to="/notifications" class="desktop-only">
            <div class="header__notification">
              <IconNotification width="30" height="30" color="white" />
            </div>
            <template v-if="unreadNotificationsCount">
              <div class="header__notification__pastille">{{ unreadNotificationsCountLabel }}</div>
            </template>
            <IconNotification width="30" height="30" color="black" class="mobile-only" />
          </RouteLink>
          <div v-click-outside="closeProfilMenu" class="header__profil__container">
            <span class="header__profil__pseudo" @click="toggleProfilMenu">
              <IconUser width="30" height="30" color="black" />
              <span class="desktop-only">{{ this.user.pseudo }}</span>
            </span>
            <ul class="header__profil__menu" :class="profilMenuClass">
              <li><RouteLink to="/profil">Profil</RouteLink></li>
              <li><RouteLink to="/profil/games">Mes parties</RouteLink></li>
              <li><RouteLink to="/logout">Se déconnecter</RouteLink></li>
            </ul>
          </div>
        </div>
      </template>
      <template v-else>
        <RouteLink to="/login">
          <IconUser width="30" height="30" color="black" class="mobile-only" />
          <span class="desktop-only">Se connecter</span>
        </RouteLink>
      </template>
    </nav>
  </header>
</template>

<script>
import IconHome from "@/components/icons/IconHome";
import IconNotification from "@/components/icons/IconNotification";
import IconSearch from "@/components/icons/IconSearch";
import IconAdd from "@/components/icons/IconAdd";
import IconUser from "@/components/icons/IconUser";

export default {
  name: "BaseHeader",
  components: {
    IconHome,
    IconNotification,
    IconSearch,
    IconAdd,
  },
  props: {
    user: {
      type: Object,
    },
    unreadNotificationsCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      showProfilMenu: false,
    };
  },
  computed: {
    unreadNotificationsCountLabel() {
      return this.unreadNotificationsCount ? `${this.unreadNotificationsCount}` : null;
    },
    profilMenuClass() {
      return this.showProfilMenu ? "header__profil__menu--visible" : null;
    },
  },
  methods: {
    toggleProfilMenu() {
      this.showProfilMenu = !this.showProfilMenu;
    },
    closeProfilMenu() {
      this.showProfilMenu = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  width: 100%;
  height: 80px;
  background-color: $color-white;
  z-index: 2;
  border-bottom: 1px solid $color-grey;
  padding: 0 2rem;

  @include on-mobile {
    position: fixed;
    bottom: 0%;
    top: initial;
    height: 60px;
    padding: 0 1rem;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;

    & > a {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: $color-black;
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;

      svg {
        margin-right: 0.5rem;

        @include on-mobile {
          margin-right: 0;
        }
      }

      &:hover {
        color: $color-primary;

        svg {
          stroke: $color-primary;
        }
      }
    }

    a.header__logo {
      font-weight: 700;
      text-decoration: none;
      color: $color-black;
      font-size: 1.25rem;
      font-family: $font-heading;
      letter-spacing: 2px;
    }
  }

  &__profil {
    display: flex;
    align-content: center;

    &__container {
      display: flex;
      align-items: center;
      position: relative;
    }

    &__pseudo {
      display: flex;
      align-items: center;
      font-weight: 600;

      svg {
        margin-right: 0.5rem;

        @include on-mobile {
          margin-right: 0;
        }
      }

      &:hover {
        cursor: pointer;
        color: $color-primary;

        svg {
          stroke: $color-primary;
        }
      }
    }

    &__menu {
      display: none;
      position: absolute;
      flex-direction: column;
      justify-content: center;
      top: 0;
      right: 0;
      transform: translate(1rem, 2rem);
      background-color: white;
      border: solid 1px $color-primary;
      border-radius: 5px;
      width: 200px;
      padding: 0.5rem;

      @include on-mobile {
        transform: translate(0, calc(-100% - 0.5rem));
      }

      li a {
        display: block;
        text-decoration: none;
        color: $color-black;
        font-size: 14px;
        font-weight: 500;
        text-transform: uppercase;
        padding: 0.5rem;

        &:hover {
          color: $color-primary;
        }
      }

      &--visible {
        display: flex;
      }
    }
  }

  &__notification {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: $color-primary;
    border-radius: 10px;
    margin-right: 1rem;

    &__pastille {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translate(200%, -50%);
      width: 1rem;
      height: 1rem;
      font-size: 0.6rem;
      color: $color-white;
      background-color: $color-danger;
      border-radius: 10px;
    }
  }

  .mobile-only {
    display: none;

    @include on-mobile {
      display: inline;
    }
  }

  .desktop-only {
    @include on-mobile {
      display: none;
    }
  }
}
</style>
