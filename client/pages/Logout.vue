<template></template>
<script>
import { mapActions } from "vuex";
export default {
  name: "PageLogout",
  methods: {
    ...mapActions({
      logout: "authentication/logout",
    }),
  },
  created() {
    this.logout().then(() => {
      this.$router.push("/login");
    });
  },
};
</script>
