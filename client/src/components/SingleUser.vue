<template>
  <div>
    <div
      class="max-w-sm p-6 ml-auto mr-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ user.firstName + " " + user.lastName }}
      </h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Age - {{ user.age }}
      </p>
    </div>
  </div>
</template>

<script>
import { getSingleUserQuery } from "../graphql/graphql";
export default {
  name: "SingleUser",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    async getUser() {
      let { data } = await this.$apollo.query({
        query: getSingleUserQuery,
        variables: {
          id: Number(this.$route.params.id),
        },
      });
      this.user = data.user;
    },
  },
  created() {
    this.getUser();
  },
};
</script>

<style lang="scss" scoped></style>
