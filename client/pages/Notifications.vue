<template>
  <div class="notification-page">
    <Heading level="4">Notifications</Heading>
    <hr />
    <FeedbackMessage v-if="error" type="error">
      {{ error }}
    </FeedbackMessage>
    <Loader v-if="loading" />
    <div v-else class="notification-container">
      <div>
        <Notification
          v-for="notification in notifications"
          :key="notification.id"
          :notification="notification"
          @markAsRead="onMarkAsRead"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Heading from "@/components/texts/Heading";
import FeedbackMessage from "@/components/FeedbackMessage";
import Loader from "@/components/Loader";
import Notification from "@/components/Notification";

export default {
  name: "Notifications",
  middleware: ["authenticatedOnly"],
  components: {
    Heading,
    FeedbackMessage,
    Loader,
    Notification,
  },
  async fetch({ store }) {
    await store.dispatch("notifications/fetchNotifications");
  },
  computed: {
    ...mapGetters({
      notifications: "notifications/notifications",
      loading: "notifications/loading",
      error: "notifications/error",
    }),
  },
  methods: {
    ...mapActions({
      cleanError: "notifications/cleanError",
      readNotification: "notifications/readNotification",
      fetchNotifications: "notifications/fetchNotifications",
    }),
    onMarkAsRead(notificationId) {
      this.readNotification(notificationId).then(() => {
        this.fetchNotifications();
      });
    },
  },
  destroyed() {
    this.cleanError();
  },
};
</script>
<style scoped>
.notification-page {
  width: 80%;
  margin: 5% 10% 5% 10%;
}
hr {
  border: 1px solid var(--super-light-grey);
}
.notification-container {
  display: flex;
  flex-direction: column;
  margin-top: 5%;
}
</style>
