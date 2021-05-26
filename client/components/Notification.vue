<template>
  <div class="container">
    <div class="left-side">
      <div class="title">
        <Heading level="6">{{ this.notification.game.boardGameName }}</Heading>
        <RouteLink class="voir-partie" v-if="this.notification.game" :to="`/games/${notification.game.id}`">
          Voir la partie
        </RouteLink>
      </div>

      <p>{{ notificationLabel }}</p>
      <span>{{ notificationDate }}</span>
    </div>

    <button class="" v-if="!notification.read" @click="markAsRead">J'ai lu</button>
  </div>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import notificationTypes from "@/constants/notificationTypes";
import "dayjs/locale/fr";
import Heading from "@/components/texts/Heading";

dayjs.extend(relativeTime);

export default {
  name: "Notification",
  components: {
    Heading,
  },
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
      const dateFromNow = dayjs(this.notification.creationDate).locale("fr").fromNow();
      return dateFromNow;
    },
  },
  methods: {
    markAsRead() {
      this.$emit("markAsRead", this.notification.id);
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--main-white-color);
  padding: 3%;
  border-radius: 10px;
  box-shadow: 0px 0px 6px 5px rgba(196, 196, 196, 0.2);
}
.left-side {
  max-width: 80%;
}
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.title .voir-partie {
  margin-left: 10%;
  text-decoration: underline;
  color: var(--light-black-color);
  font-size: 0.8rem;
}
.container p {
  color: var(--main-grey-color);
  margin-bottom: 20px;
}
.container span {
  color: var(--main-grey-color);
  font-size: 0.8rem;
}
button {
  background-color: var(--light-purple-color);
  color: var(--main-purple-color);
  border: none;
  border-radius: 5px;
  padding: 10px 15px 10px 15px;
  font-weight: 500;
}
</style>
