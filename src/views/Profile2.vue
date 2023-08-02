<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute, RouterView } from "vue-router";
import { useToast } from "vue-toastification";

const posts = ref([]);
const Apiurl = "https://ihsan.onrender.com/posts";
const router = useRouter();
const route = useRoute();
const myuser = ref([]);
const user2 = ref([]);
const newpost = ref();
const object = ref({ title: "", content: "" });
const toast = useToast();

async function getPosts() {
  const response = await fetch(Apiurl);
  const json = await response.json();
  posts.value = json;
}

async function getUser() {
  const { id } = route.params;
  const response = await fetch(Apiurl + "/user/" + id);
  const json = await response.json();
  myuser.value = json;
}

async function getUser2() {
  const { id2 } = route.params;
  const response = await fetch(Apiurl + "/user/" + id2);
  const json = await response.json();
  user2.value = json;
}

async function addFriend(name) {
  const { id } = route.params;

  const friend = { name: name };
  myuser.value.friends.unshift(friend);

  const response = await fetch(Apiurl + "/user/" + id, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      friends: myuser.value.friends,
    }),
  });
  toast.success(friend.name + " ile artık arkadaşsınız", {
    timeout: 2000,
  });
}

onMounted(() => {
  getPosts();
  getUser();
  getUser2();
});

watch(
  () => route.params.id2,
  () => {
    getUser2();
  }
);
</script>

<template>
  <main>
    <div class="container">
      <router-link to="homeland">
        <button class="button is-info mx-5">Home Feed</button>
      </router-link>
      <router-link to="messages">
        <button class="button is-info mx-5">Messages</button></router-link
      >
      <router-link to="profile">
        <button class="button is-info mx-5">Profile</button></router-link
      >
      <p class="title is-1" style="text-align: center">
        {{ user2.email }} Profile Page
      </p>

      <div class="container" style="display: flex; align-items: center">
        <img
          v-if="!user2.image"
          src="https://bulma.io/images/placeholders/96x96.png"
          alt="Placeholder image"
        />
        <img
          v-if="user2.image"
          :src="user2.image"
          alt="profile image"
          style="width: 100px; height: 100px"
        />
        <div class="dropdown is-hoverable">
        <div class="dropdown-trigger">
          <button
            class="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu4"
          >
            <span>{{ user2.email }}</span>
            <span class="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu4" role="menu">
          <div class="dropdown-content" v-if="user2.email !== myuser.email">
            <div class="dropdown-item">
              <button
                v-if="
                  !myuser.friends.some((friend) => friend.name === user2.email)
                "
                @click="addFriend(user2.email)"
                class="button"
              >
                Add-Friend
              </button>
            </div>
            <div
              v-if="
                myuser.friends.some((friend) => friend.name === user2.email)
              "
              class="dropdown-item"
            >
              <p>{{ user2.email }} ile arkadaşsınız</p>
            </div>
          </div>
        </div>
      </div>
      </div>

     

      <p class="title is-1" style="text-align: center">
        {{ user2.email }} Posts
      </p>
      <div class="card m-5" v-for="post in user2.posts" :key="post._id">
        <div class="card-content">
          <p class="title">
            {{ post.title }}
          </p>
          <p>
            {{ post.content }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
