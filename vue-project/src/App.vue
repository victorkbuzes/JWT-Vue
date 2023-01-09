

<template>
  <nav class="container mx-auto p-6  ">
    <div class="  flex items-center justify-between ">
      <router-link to="/">Home</router-link>
      <div class=" space-x-8">
        <router-link to="/login">Login</router-link>
        <router-link to="/register">Register</router-link>
      </div>
  
    </div>
  

  </nav>

  <RouterView />

  


</template>

<script setup>
import axios from 'axios';
import { ref , onMounted} from 'vue';
import { RouterLink, RouterView } from 'vue-router'

// const API_URL = 'http://localhost:8080/user'
//   const response = await axios.get(API_URL, {
//     headers: {
//       Authorization : 'Bearer ' + localStorage.getItem('token')
//     },
//   })
//   user.value = response.data;




</script>

<style scoped>

</style>
