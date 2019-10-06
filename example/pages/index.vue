<template>
  <div></div>
</template>

<script>
import { forIn } from "lodash";
export default {
  mounted() {
    forIn(this.getEventHandlers(), (handler, event) => {
      const broadcaster = event.split("-");
      const channelName = broadcaster[0];
      const eventName = broadcaster[broadcaster.length - 1];
      this.$echo
        .private(channelName)
        .listen(eventName, response => handler(response));
    });
  },
  methods: {
    getEventHandlers() {
      return {
        "dashboard-.newNotification": response => {
          console.log(response);
        }
      };
    }
  }
};
</script>

<style>
</style>
