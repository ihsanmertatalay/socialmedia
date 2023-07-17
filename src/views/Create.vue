<template lang="">
  <div class="container">
    <PostForm :post="post" :submitForm="createPost" style="margin-top: 15px" />
  </div>
</template>
<script setup>
import PostForm from "../components/PostForm.vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const Apiurl = "http://localhost:5000/posts/";
const post = reactive({ title: "", content: "", creator: "" });
const router = useRouter();

async function createPost() {
  const response = await fetch(Apiurl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      title: post.title,
      content: post.content,
      creator: post.creator,
    }),
  });
  const json = await response.json;

  router.push({
    name: "home",
  });
}
</script>
<style lang=""></style>
