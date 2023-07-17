<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute, RouterView } from "vue-router";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";

const posts = ref([]);
const Apiurl = "https://ihsan.onrender.com/posts";
const router = useRouter();
const route = useRoute();
const myuser = ref([]);
const newpost = ref();
const object = ref({ title: "", content: "" });
const friend = ref({ name: "mert" });
const toast = useToast();
const store = useStore();
watch(() => store.getters.getCounter, () => {
  getPosts();
});


async function getPosts() {
  const response = await fetch(Apiurl);
  const json = await response.json();
  posts.value = json.reverse();
}

async function getUser() {
  const { id } = route.params;
  const response = await fetch(Apiurl + "/user/" + id);
  const json = await response.json();
  myuser.value = json;
}





async function submitForm() {
  const { id } = route.params;

  myuser.value.posts.unshift(object.value);

  const response = await fetch(Apiurl + "/user/" + id, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: myuser.value.email,
      password: myuser.value.password,
      posts: myuser.value.posts,
    }),
  });

  const response2 = await fetch(Apiurl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title: object.value.title,
      content: object.value.content,
      creator: myuser.value.email,
    }),
  });
  object.value = { title: "", content: "" };

  newpost.value = "";

  getPosts();
  //const json = await response.json();
  getUser();
}

async function removePosts(_id) {
  const response = await fetch(Apiurl + "/" + _id, {
    method: "DELETE",
  });
  getPosts();
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
    timeout: 1000,
  });
}

async function editPost(_id) {
  router.push({
    name: "update",
    params: {
      id: _id,
    },
  });
}

onMounted(() => {
  getPosts();
  getNums();async function getNums() {
  const response = await fetch(Apiurl + "/n");
  const json = await response.json();
  nums.value = json;
}
  getUser();
});
</script>

<template>
  <main>
    <div class="container">
      <router-link to="Profile">
        <button class="button is-info mx-5">Profile</button></router-link
      >
      <router-link to="messages">
        <button class="button is-info mx-5">Messages</button></router-link
      >

      <p class="title is-1" style="text-align: center">Home Feed</p>
      <div
        v-for="(post, index) in posts"
        :key="post._id"
        class="card my-5"
        :style="
          myuser.email == post.creator ? { background: 'rgb(255,255,225)' } : {}
        "
      >
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img
                  v-if="!myuser.image"                  src="https://bulma.io/images/placeholders/96x96.png"
                  alt="Placeholder image"
                />

                <img :src="myuser.image" alt="Profile Photo" style="width: 50px;  height: 50px; ">
              </figure>
            </div>
            <div class="media-content">
              <div class="dropdown is-hoverable">
                <div class="dropdown-trigger">
                  <button
                    class="button"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu4"
                  >
                    <span>{{ post.creator }}</span>
                    <span class="icon is-small">
                      <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                  <div
                    class="dropdown-content"
                    v-if="post.creator !== myuser.email"
                  >
                    <div class="dropdown-item">
                      <button
                        v-if="
                          !myuser.friends.some(
                            (friend) => friend.name === post.creator
                          )
                        "
                        @click="addFriend(post.creator)"
                        class="button"
                      >
                        Add-Friend
                      </button>
                    </div>
                    <div
                      v-if="
                        myuser.friends.some(
                          (friend) => friend.name === post.creator
                        )
                      "
                      class="dropdown-item"
                    >
                      <p>Arkadaş olarak eklendi</p>
                    </div>
                  </div>
                </div>
              </div>
              <p class="subtitle is-6">@{{ post.creator }}</p>
            </div>
          </div>

          <div class="content">
            <p class="title">{{ post.title }}</p>
            <p>{{ post.content }}</p>
          </div>
          <button @click="removePosts(post._id)" class="button is-warning">
            Delete
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
