<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute, RouterView } from "vue-router";

const posts = ref([]);
const Apiurl = "https://ihsan.onrender.com/posts";
const router = useRouter();
const route = useRoute();
const myuser = ref([]);
const newpost = ref();
const object = ref({ title: "", content: "" });

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


async function addImage() {
  const { id } = route.params;
  const response = await fetch(Apiurl + "/user/" + id, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      image: myuser.value.image,
    }),
  });
  getUser();
}


onMounted(() => {
  getPosts();
  getUser();
});
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
      <p class="title is-1" style="text-align: center">Profile Page</p>
      
        <div class="container" style="display: flex; align-items: center ; ">
          <img
        v-if="!myuser.image"
        src="https://bulma.io/images/placeholders/96x96.png"
        alt="Placeholder image"
      />
      <img v-if="myuser.image" :src="myuser.image" alt="profile image" style="width: 100px;  height: 100px; " />
      <label for="myimage">Profile Photo</label>
      <input v-model="myuser.image" name="myimage" :src="myuser.image"  type="url" placeholder="enter image url"  style="margin: 20px;"/>
      <button @click="addImage" class="button is-warning ">Submit</button>

        </div>

      <p class="title is-1" style="text-align: center">My Posts</p>
      <div class="card m-5" v-for="post in myuser.posts" :key="post._id">
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
