<script setup>
import { ref, onMounted,computed } from "vue";
import { useRouter, useRoute, RouterView } from "vue-router";
import { useStore } from "vuex";

const posts = ref([]);
const routerViewKey = ref();
const Apiurl = "https://ihsan.onrender.com/posts";
const router = useRouter();
const route = useRoute();
const myuser = ref([]);
const usersNames = ref([]);
const newpost = ref();
const search = ref("");
const object = ref({ title: "", content: "" });
const store = useStore();
const increment = () => store.dispatch("increment");
const go = id => {
  router.push({ path: `/home/${myuser.value._id}/${id}` });
}


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

async function getUsers() {
  const { id } = route.params;
  const response = await fetch(Apiurl + "/user/" );
  const json = await response.json();
  const names = json.map(user => ({ name: user.email, id: user._id }));
  usersNames.value = names;
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
  getUser();
  getUsers();
});

const searchKey = ref("");

const filteredWords = computed(() => {
  if (!searchKey.value) {
    return usersNames.value;
  } else {
    const searchLowerCase = searchKey.value.toLowerCase();
    return usersNames.value.filter((user) =>
      user.name.toLowerCase().includes(searchLowerCase)
    );
  }
});

const filterWords = () => {
  filteredWords.value = usersNames.value.filter((user) =>
  user.name.toLowerCase().includes(searchKey.value.toLowerCase())
  );
};

</script>
<template>
  <main>
    <div class="container">
      <h1>Hoş Geldin {{ myuser.email }}</h1>
      {{ counter }}
      <div style="display: flex; justify-content: space-between">
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

          <button type="submit" class="button is-link">Add Post</button>
        </form>
        <div class="control has-icons-right">
          <input
          v-model="searchKey" @input="filterWords"
            class="input is-large"
            type="text"
            placeholder="Search..."
          />
          <span class="icon is-medium is-right">
            <i class="fas fa-search"></i>
          </span>
          
          <ul v-if="searchKey" style="border: 1px solid gray; background: white; position: absolute; z-index: 11; opacity: 0.9;">
            <li class="person" @click="go(user.id)" v-for="(user, index) in filteredWords" :key="index" style="padding: 3px; width: 500px; ">
              <p  v-if="user.name != myuser.email"  style="text-indent: 15px; border-bottom:0.5px solid gray ;">{{ user.name }}</p>
            </li>
          </ul>
        </div>

        <div style="width: 20%"></div>
      </div>
      <br />

      <RouterView :key="routerViewKey" />
    </div>
  </main>
</template>

<style>
.person :hover{
  background: rgb(235, 234, 234);
}
</style>