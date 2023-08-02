<template lang="">
  <div class="container" style="margin-top: 30px">
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input v-model="name" class="input" type="text" placeholder="Name" />
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input
          v-model="passvalue"
          class="input"
          type="password"
          placeholder="Password"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
      </p>
    </div>
    <div class="container" style="display: flex; justify-content: space-around">
      <div class="field">
        <p class="control">
          <button @click="login" class="button is-success">Login</button>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button @click="signup" class="button is-success">Signup</button>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button @click="admin" class="button is-success">Admin</button>
        </p>
      </div>
    </div>
  </div>

  <div
    class="notification is-primary"
    style="
      position: absolute;
      right: 50px;
      top: 50px;
      z-index: 1000;
      display: none;
      width: 200px;
    "
  >
    Lorem ipsum
  </div>
</template>
<script setup>
import { ref, onMounted,onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";



const users = ref([]);
const isLogin = ref(false);
const name = ref("");
const passvalue = ref();
const exist = ref(false);
const Apiurl = "https://ihsan.onrender.com/posts/user";
const router = useRouter();
const myid = ref();
const store = useStore();
const toast = useToast();


const counter = computed(() => store.getters.getCounter);
const increment = () => store.dispatch("increment");

async function getUsers() {
  const response = await fetch(Apiurl);
  const json = await response.json();
  users.value = json;
}

async function login() {
  getUsers();
  users.value.forEach((user) => {
    if (user.email == name.value && user.password == passvalue.value) {
      isLogin.value = true;
      myid.value = user._id;
    }
  });
  if (isLogin.value) {
    router.push({ path: `/home/${myid.value}/` });
  }
  isLogin.value = false;
}

function admin() {
  router.push({
    name: "admin",
  });
}
async function signup() {
  users.value.forEach((user) => {
    if (user.email == name.value) {
      exist.value = true;
      toast.warning("Bu isim kullanılıyor", {
        timeout: 1000,
      });
    }
  });
  if (exist.value) {
    exist.value = false;
    return;
  }

  const response = await fetch(Apiurl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: name.value,
      password: passvalue.value,
    }),
  });
  const json = await response.json;
  toast.success("Kayıt tamamlandı", {
    timeout: 1000,
  });
  name.value = "";
  passvalue.value = "";
  getUsers();
}

async function submitForm() {
  const fileInput = document.getElementById("imageInput");
  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("myphoto", file);
  console.log(formData);
  const response = await fetch("https://ihsan.onrender.com/posts/photo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Example Title",
      description: "Example Description",
      photo: {
        data: xxx,
        contentType: "image/jpeg",
      },
    }),
  });

  const data = await response.json();
  console.log("Photo uploaded:", data);
  // Handle the response or perform additional operations
}

onMounted(() => {
  getUsers();
  
});


</script>
<style lang=""></style>
