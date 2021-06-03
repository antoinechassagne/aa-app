<template>
  <div class="page">
    <div class="container">
      <h1 v-if="error.statusCode === 404">Cette page n'existe pas</h1>
      <h1 v-else>Une erreur s'est produite...</h1>
      <RouteLink to="/" class="button button--primary">Retour à l'accueil</RouteLink>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorLayout",
  props: ["error"],
  layout: "error",
};
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 2rem;
}
</style>
