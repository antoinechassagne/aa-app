<template>
  <header>
    <nav class="p-4">
      <ul class="flex flex-row">
        <li v-for="(entry, index) in menu" :key="index" class="px-2">
          <RouteLink :to="entry.path">{{ entry.label }}</RouteLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "BaseHeader",
  data() {
    return {
      commonEntries: [
        { label: "AA App", path: "/" },
        { label: "Rechercher une partie", path: "/games" },
      ],
      privateEntries: [
        { label: "Créer une partie", path: "/games/add" },
        { label: "Notifications", path: "/notifications" },
        { label: "Se déconnecter", path: "/logout" },
      ],
      publicEntries: [
        { label: "Se connecter", path: "/login" },
        { label: "S'inscrire", path: "/register" },
      ],
    };
  },
  computed: {
    menu() {
      return this.$user
        ? [...this.commonEntries, ...this.privateEntries]
        : [...this.commonEntries, ...this.publicEntries];
    },
  },
};
</script>
