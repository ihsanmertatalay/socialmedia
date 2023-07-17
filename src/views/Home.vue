<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute, RouterView } from "vue-router";
import { useStore } from "vuex";

const posts = ref([]);
const routerViewKey = ref();
const nums = ref([]);
const Apiurl = "https://ihsan.onrender.com/posts";
const router = useRouter();
const route = useRoute();
const myuser = ref([]);
const newpost = ref();
const object = ref({ title: "", content: "" });
const store = useStore();
const increment = () => store.dispatch("increment");
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

async function getNums() {
  const response = await fetch(Apiurl + "/n");
  const json = await response.json();
  nums.value = json;
}

async function updateNum(id, mynum) {
  const response = await fetch(Apiurl + "/n/" + id, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      mynumber: mynum + 1,
    }),
  });
  const json = await response.json();
  getNums();
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
  getPosts();

  object.value = { title: "", content: "" };

  newpost.value = "";
  increment();
}

async function removePosts(_id) {
  const response = await fetch(Apiurl + "/" + _id, {
    method: "DELETE",
  });
  getPosts();
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
  getNums();
  getUser();
});
</script>

<template>
  <main>
    <div class="container">
      <h1>Hoş Geldin {{ myuser.email }}</h1>
      {{ counter }}
      <form @submit.prevent="submitForm">
        <input
          v-model="object.title"
          class="input"
          type="text"
          placeholder="Text input"
          style="width: 100px"
        />

        <input
          v-model="object.content"
          class="input"
          type="text"
          placeholder="Text input"
          style="width: 100px"
        />
        <button type="submit" class="button is-link">Add</button>
      </form>
      <br />

      <RouterView :key="routerViewKey" />
    </div>
  </main>
</template>
