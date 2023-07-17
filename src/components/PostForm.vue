<template lang="">
  <div class="container">
  <form @submit.prevent="submitForm">
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input  v-model="post.title" class="input" type="text" placeholder="Text input" />
      </div>
    </div>
    <div class="field">
      <label class="label">Content</label>
      <div class="control">
        <textarea v-model="post.content" class="textarea" placeholder="Textarea"></textarea>
      </div>
    </div>
    <div class="field">
      <label class="label">Creator</label>
      <div class="control">
        <input v-model="post.creator" class="input" type="text" placeholder="Text input" />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button type="submit" class="button is-link">Submit</button>
      </div>
    </div>
</form>
  </div>
</template>
<script>
export default {
  props: ["post", "submitForm"],
};
</script>
<style lang=""></style>
