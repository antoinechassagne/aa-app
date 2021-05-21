<template>
  <div>
    <Heading level="1">Notifications</Heading>
    <FeedbackMessage v-if="error" type="error">
      {{ error }}
    </FeedbackMessage>
    <Loader v-if="loading" />
    <ul v-else v-for="notification in notifications" :key="notification.id">
      <li><Notification :notification="notification" @markAsRead="onMarkAsRead" /></li>
    </ul>
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
