<template>
  <div class="home">
    <AllUsers />
  </div>
</template>

<script>
// @ is an alias to /src
import AllUsers from "@/components/AllUsers.vue";

export default {
  name: "HomeView",
  components: {
    AllUsers,
  },
};
</script>
