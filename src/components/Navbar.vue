<template lang="">
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation" style="background:yellow">
        
      <div class="navbar-brand">
        <router-link  to="/" class="navbar-item" >
          <img
            src="https://seeklogo.com/images/T/togg-logo-3CA80B0099-seeklogo.com.png"
            width="50"
            height="28"
          />
        </router-link>
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <strong class="navbar-item"> My Social App </strong>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
             
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { RouterLink } from 'vue-router';

export default {};
</script>
<style lang=""></style>
