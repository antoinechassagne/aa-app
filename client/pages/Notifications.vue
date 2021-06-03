<template>
  <div class="container notification-page">
    <Heading level="2">Notifications</Heading>
    <FeedbackMessage v-if="error" type="error">
      {{ error }}
    </FeedbackMessage>
    <div v-else class="notification-container">
      <div>
        <Notification
          v-for="notification in notifications"
          :key="notification.id"
          :notification="notification"
          :markAsRead="markAsRead"
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
  data() {
    return {
      error: null,
    };
  },
  computed: {
    ...mapGetters({
      notifications: "notifications/notifications",
    }),
  },
  methods: {
    ...mapActions({
      readNotification: "notifications/readNotification",
      fetchNotifications: "notifications/fetchNotifications",
    }),
    async markAsRead(notificationId) {
      try {
        await this.readNotification(notificationId);
        await this.fetchNotifications();
      } catch (err) {
        this.error = err;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.notification-page {
  width: 80%;
  margin: 2rem auto;

  @include on-mobile {
    width: 100%;
  }
}

.notification-container {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}
</style>
