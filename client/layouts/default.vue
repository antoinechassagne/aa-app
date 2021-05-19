<template>
  <div>
    <BaseHeader :user="user" :unreadNotificationsCount="unreadNotificationsCount" />
    <main class="container mx-auto pl-4 pr-4">
      <Nuxt />
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseHeader from "@/components/BaseHeader";

export default {
  name: "DefaultLayout",
  components: {
    BaseHeader,
  },
  computed: {
    ...mapGetters({
      user: "authentication/user",
      unreadNotificationsCount: "notifications/unreadCount",
    }),
  },
};
</script>
