<template>
  <div class="footer-content">
    <div>
      <RouteLink to="/">
        <Heading level="2" class="color-white capitalize">Ludis</Heading>
      </RouteLink>
      <p>
        Ludis est une application permetant de trouver facilement des partenaires de jeux de société autour de vous.
      </p>
    </div>
    <div>
      <span class="subheading color-white">Parties</span>
      <RouteLink to="/games">
        <span>Rechercher </span>
      </RouteLink>
      <RouteLink to="/games">
        <span>Créer </span>
      </RouteLink>
      <RouteLink to="/games">
        <span>Mes parties </span>
      </RouteLink>
    </div>
    <div>
      <span class="subheading color-white">Informations</span>
      <RouteLink to="/games">
        <span>Notifications </span>
      </RouteLink>
      <RouteLink to="/games">
        <span> Profile </span>
      </RouteLink>
      <RouteLink to="/games">
        <span> Se déconnecter </span>
      </RouteLink>
    </div>
  </div>
</template>

<script>
import Heading from "@/components/texts/Heading";

export default {
  name: "BaseFooter",
  components: {
    Heading,
  },
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
}
.footer-content {
  display: flex;
  background-color: $color-primary;
  justify-content: space-around;
  padding: 3rem;

  @include on-mobile {
    flex-direction: column;
  }
}
.footer-content > div {
  display: flex;
  flex-direction: column;
  max-width: 45%;

  @include on-mobile {
    margin-bottom: 2rem;
    max-width: 100%;
  }
}
.footer-content > div :first-child {
  margin-bottom: 20px;
}
a {
  text-decoration: none;
  color: $color-black;
  font-size: 0.9;
  margin-bottom: 0.5rem;
}
</style>
