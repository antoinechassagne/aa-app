<template>
  <div>
    <BaseHeader :user="user" :unreadNotificationsCount="unreadNotificationsCount" />
    <main>
      <Nuxt />
    </main>
    <BaseFooter />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { poll, stopPolling } from "@/services/Polling";
import BaseHeader from "@/components/BaseHeader";
import BaseFooter from "@/components/BaseFooter";

export default {
  name: "DefaultLayout",
  components: {
    BaseHeader,
    BaseFooter,
  },
  data() {
    return {
      currentPollingId: null,
    };
  },
  computed: {
    ...mapGetters({
      user: "authentication/user",
      unreadNotificationsCount: "notifications/unreadCount",
    }),
  },
  watch: {
    user() {
      this.startPolling();
    },
  },
  methods: {
    ...mapActions({
      pollNotifications: "notifications/pollNotifications",
      fetchGameCategories: "taxonomies/fetchGameCategories",
    }),
    startPolling() {
      if (this.currentPollingId) {
        stopPolling(this.currentPollingId);
      }
      if (this.user) {
        const currentPollingId = poll(this.pollNotifications, 10);
        this.currentPollingId = currentPollingId;
      }
    },
  },
  mounted() {
    this.startPolling();
  },
  created() {
    this.fetchGameCategories();
  },
};
</script>
