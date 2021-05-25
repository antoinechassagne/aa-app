<template>
  <div>
    <div>
      <p>{{ notificationDate }}</p>
      <RouteLink v-if="this.notification.game" :to="`/games/${notification.game.id}`">
        {{ this.notification.game.boardGameName }}
      </RouteLink>
      <p>{{ notificationLabel }}</p>
    </div>
    <button v-if="!notification.read" @click="markAsRead">X</button>
  </div>
</template>

<script>
import dayjs from "dayjs";
import notificationTypes from "@/constants/notificationTypes";

export default {
  name: "Notification",
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  computed: {
    notificationLabel() {
      switch (this.notification.type) {
        case notificationTypes.NEW_PARTICIPATION:
          return "Nouvelle demande de participation";
        case notificationTypes.PARTICIPATION_ACCEPTED:
          return "Demande de participation acceptée";
        case notificationTypes.PARTICIPATION_REFUSED:
          return "Demande de participation refusée";
        case notificationTypes.PARTICIPATION_CANCELED:
          return "Participation annulée";
        default:
          return null;
      }
    },
    notificationDate() {
      return dayjs(this.notification.creationDate).format("DD/MM/YYYY à hh:mm");
    },
  },
  methods: {
    markAsRead() {
      this.$emit("markAsRead", this.notification.id);
    },
  },
};
</script>
