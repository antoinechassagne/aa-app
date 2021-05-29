<template>
  <Loader />
</template>

<script>
import { mapActions } from "vuex";
import Loader from "@/components/Loader";

export default {
  name: "PageLogout",
  components: {
    Loader,
  },
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
