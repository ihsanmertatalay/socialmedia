<script setup>
import { ref, onMounted,onUnmounted } from "vue";
import { useRouter, useRoute, RouterView } from "vue-router";

const Apiurl = "https://ihsan.onrender.com/posts";
const router = useRouter();
const route = useRoute();
const myuser = ref([]);
const chat = ref("");
const message = ref("");
const theuser = ref({
  email: '',
  password: '',
  photo: null,
  friends: [],
  posts: [],
  messages: [],
  image: '',
});
      const id2 = ref();

const users = ref([])

async function getUsers() {
  const response = await fetch(Apiurl + "/user");
  const json = await response.json();
  users.value = json;
}


async function getUser() {
  const { id } = route.params;
  const response = await fetch(Apiurl + "/user/" + id);
  const json = await response.json();
  myuser.value = json;
}

async function sendMessage(to) {
  if(message.value){
    
  const { id } = route.params;
  await getUser()
  await getUsers()

  const messageObj = {
    from: myuser.value.email,
    to: to,
    content: message.value,
    messageDate: new Date(),
  };

  myuser.value.messages.push(messageObj);
  const response = await fetch(Apiurl + "/user/" + id, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      messages: myuser.value.messages,
    }),
  });

  
  theuser.value =  users.value.find(theuser => theuser.email === to)
  id2.value = theuser.value._id



  theuser.value.messages.push(messageObj);

const response2 = await fetch(Apiurl + "/user/" + id2.value, {
  method: "PUT",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({
    messages: theuser.value.messages,
  }),
});
getUser()
getUsers()
message.value = ""
  }
}

onMounted(() => {
  getUser();
  getUsers();
  const interval = setInterval(() => {
    getUser();
    console.log("111");
  }, 1000);

  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>

<template>
  <main>
    <div class="container">
      <router-link to="Profile">
        <button class="button is-info mx-5">Profile</button></router-link
      >
      <router-link to="homeland">
        <button class="button is-info mx-5">Home Feed</button></router-link
      >

      <p class="title is-1" style="text-align: center">Messages</p>
      <p class="title is-2" style="text-align: center">Friends</p>
      
      <div style="display: flex; flex-direction: column; ">
        <div     v-for="friend in myuser.friends"
          :key="friend._id"
          style="
            display: flex;
            flex-direction: column;
            border: 1px solid gray;
            margin: 10px 0;
            padding: 5px;
           
            "
          >
          <button
            @click="chat = friend.name; message = '' "
            class="button my-1"
            style="width: 100px; margin: auto; "
            
          >
            {{ friend.name }}
          </button>
        <div
        v-if="chat == friend.name " 
          style="
           max-height: 300px;
            overflow: auto;
            display: flex;
            flex-direction: column-reverse;
            border: 1px rgb(207, 205, 205) solid;
        "
        >
        

         
          <p v-if="chat == friend.name "  >
            <p v-for="themessage in myuser.messages">
                            <p v-if="themessage.to == friend.name || themessage.from ==  friend.name" style="padding: 3px 10px; margin: 5px; border-radius: 5px; float: right; clear: both;" :style="{ backgroundColor: themessage.to === friend.name ? 'lightgreen' : 'lightgray' ,  float: themessage.to === friend.name ? 'right' : 'left' }" >{{ themessage.content }}</p>

            </p>
            
          
          </p>

      
         
        </div>

        <input style="width: 80%; height: 50px; margin: 20px auto 0px;" v-model="message" v-if="chat == friend.name" placeholder="mesaj gönder" type="text"  @keyup.enter="sendMessage(friend.name )"/>

        <button
          style="width: 200px; margin: 10px auto;" 
            @click="sendMessage(friend.name )"
            v-if="chat == friend.name"
            class="button is-success "
          >
            Gönder
          </button>

      </div>
      </div>
    </div>
  </main>
</template>
