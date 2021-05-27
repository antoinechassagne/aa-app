<template>
  <div class="notification">
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

    <ButtonPrimary v-if="!notification.read" @click="markAsRead">J'ai lu</ButtonPrimary>
  </div>
</template>

<script>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
import notificationTypes from "@/constants/notificationTypes";
import Heading from "@/components/texts/Heading";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";

dayjs.extend(relativeTime);

export default {
  name: "Notification",
  components: {
    Heading,
    ButtonPrimary,
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

<style lang="scss" scoped>
.notification {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $color-white;
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
  color: $color-black;
  font-size: 0.8rem;
}
.notification p {
  color: $color-grey;
  margin-bottom: 20px;
}
.notification span {
  color: $color-grey;
  font-size: 0.8rem;
}
</style>
