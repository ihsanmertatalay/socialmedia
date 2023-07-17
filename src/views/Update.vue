<template lang="">
  <div>
    <PostForm :post="post" :submitForm="updatePost" style="margin-top: 15px" />
  </div>
</template>
<script setup>
import PostForm from "../components/PostForm.vue";
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const router = useRouter();
const route = useRoute();
const Apiurl = "http://localhost:5000/posts/";
const post = ref({ title: "", content: "", creator: "" });

onMounted(() => {
    getPost()
})

async function getPost() {
    const {id} = route.params
    const response = await fetch(Apiurl + "/" + id);
    const json = await response.json()
    post.value = json
}
async function updatePost() {
    const {id} = route.params

    const response = await fetch(Apiurl + "/" + id, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title: post.value.title,
      content: post.value.content,
      creator: post.value.creator,
    }),
  })
  const json = await response.json()
  router.push({
    name:'home'
  })
}




</script>
<style lang=""></style>
