<template lang="">
  <div class="container">
    <br />
    <button @click="clearMessages">clear messages</button>
    <h1>Admin Panel</h1>

    <table
      class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
    >
      <thead>
        <tr>
          <th></th>
          <th style="text-align: center">Name</th>
          <th style="text-align: center">Password</th>
          <th style="text-align: center">Post Count</th>
          <th style="text-align: center">Friends</th>
          <th style="text-align: center">Message Count</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user._id">
          <td>{{ index + 1 }} &ensp;</td>
          <td>{{ user.email }} &ensp;</td>
          <td>{{ user.password }}</td>
          <td>{{ user.posts.length }}</td>
          <td>
            <div v-for="friend in user.friends">
              {{ friend.name }}
            </div>
          </td>
          <td>{{ user.messages.length }}</td>

          <td>
            <button
              @click="deleteUser(user._id, user.email)"
              class="button is-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const users = ref([]);
const posts = ref([]);
const Apiurl = "https://ihsan.onrender.com/posts";
const router = useRouter();

async function getUsers() {
  const response = await fetch(Apiurl + "/user");
  const json = await response.json();
  users.value = json;
}

async function updateUsers() {
  const response = await fetch(Apiurl  + "/user", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(users.value),
  });
}


async function getPosts() {
  const response = await fetch(Apiurl);
  const json = await response.json();
  posts.value = json;
}

async function deleteUser(id, email) {
  const response = await fetch(Apiurl + "/user/" + id, {
    method: "DELETE",
  });

  posts.value.forEach((post) => {
    if (post.creator == email) {
      const response2 = fetch(Apiurl + "/" + post._id, {
        method: "DELETE",
      });
    }
  });

  getUsers();
}


async function clearMessages() {
  for (const index in users.value) {
    users.value[index].messages=[]
  }
  updateUsers()

}

onMounted(() => {
  getUsers();
  getPosts();
});
</script>
<style scoped>
h1 {
  font-size: xx-large;
  text-align: center;
}
thead,
table,
tr,
th {
  text-align: center;
}
</style>
