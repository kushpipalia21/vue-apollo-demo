<template>
  <div class="hello">
    <h1>Vue Apollo with Graphql</h1>

    <div
      class="relative w-2/3 ml-auto mr-auto overflow-x-auto shadow-md sm:rounded-lg mt-4"
    >
      <table
        class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        v-if="users"
      >
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3 bg-gray-50">Color</th>
            <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              User name
            </th>
            <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Age
            </th>
            <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b border-gray-200 dark:border-gray-700"
            v-for="user in users"
            :key="user.id"
          >
            <th
              scope="row"
              class="px-6 py-4 text-xl font-medium text-gray-900 bg-gray-50 dark:text-white dark:bg-gray-800"
            >
              {{ user.id }}
            </th>
            <td class="px-6 py-4 text-xl">{{ user.firstName }}</td>
            <td class="px-6 py-4 bg-gray-50 text-xl dark:bg-gray-800">
              {{ user.age }}
            </td>
            <td class="px-6 py-4">
              <button
                type="button"
                class="text-white hover:scale-105 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                @click="$router.push(`/user/${user.id}`)"
              >
                View
              </button>
              <button
                type="button"
                class="text-white bg-yellow-400 hover:scale-105 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900"
                @click="$router.push(`/edit-user/${user.id}`)"
              >
                Edit
              </button>
              <button
                type="button"
                class="text-white hover:scale-105 bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                @click="deleteUser(user.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        <h1 class="text-2xl">No User...</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { deleteSingleUser, getAllUsersQuery } from "../graphql/graphql";
const toast = useToast();

export default {
  name: "HelloWorld",
  apollo: {
    users: {
      query: getAllUsersQuery,
    },
  },
  methods: {
    deleteUser(id) {
      if (confirm(`Are you sure to delete this user - ${id}`)) {
        this.$apollo.mutate({
          mutation: deleteSingleUser,
          variables: {
            id,
          },
          refetchQueries: [
            {
              query: getAllUsersQuery,
            },
          ],
        });
        toast.success("User deleted successfully.", {
          timeout: 3000,
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
