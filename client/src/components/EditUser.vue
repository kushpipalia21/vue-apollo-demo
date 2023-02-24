<template>
  <div>
    <!-- <LoadingSpinner :isLoading="isLoading" /> -->
    <form class="w-1/2 ml-auto mr-auto" @submit.prevent="updateUser">
      <div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="text"
            v-model="firstName"
            name="floating_company"
            id="floating_company"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="FirstName"
            required
          />
        </div>
      </div>
      <div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="text"
            v-model="lastName"
            name="floating_company"
            id="floating_company"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="LastName"
            required
          />
        </div>
      </div>
      <div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            type="text"
            v-model.number="age"
            name="floating_company"
            id="floating_company"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="Age"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        class="text-white hover:scale-110 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Update User
      </button>
    </form>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import {
  editUserMutation,
  getAllUsersQuery,
  getSingleUserQuery,
} from "../graphql/graphql";
// import LoadingSpinner from "./LoadingSpinner.vue";

const toast = useToast();

export default {
  name: "AddUser",
  data() {
    return {
      firstName: "",
      lastName: "",
      age: 0,
      // isLoading: false,
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      // this.isLoading = true;
      let { data } = await this.$apollo.query({
        query: getSingleUserQuery,
        variables: {
          id: Number(this.$route.params.id),
        },
      });
      this.firstName = data.user.firstName;
      this.lastName = data.user.lastName;
      this.age = data.user.age;
      // this.isLoading = false;
    },
    async updateUser() {
      await this.$apollo.mutate({
        mutation: editUserMutation,
        variables: {
          id: Number(this.$route.params.id),
          firstName: this.firstName,
          lastName: this.lastName,
          age: this.age,
        },
        refetchQueries: [
          {
            query: getAllUsersQuery,
          },
        ],
      });
      toast.success("User updated successfully", {
        timeout: 3000,
      });
      this.$router.push("/");
    },
  },
  // components: { LoadingSpinner },
};
</script>
