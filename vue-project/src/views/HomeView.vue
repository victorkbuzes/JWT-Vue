

<template>
  <main>

    <div v-for="post in posts" :key="post.id">
      <ul>
        <li>{{ post.title }}</li>
        <li>{{ post.description }}</li>
      </ul>

    </div>
    <div v-if="status=='session'">
      <AddPostsVue />

    </div>

 

    
 
  
  </main>
</template>

<script setup>
import AddPostsVue from '../components/AddPosts.vue';

import { ref , onMounted} from 'vue';
import axios from 'axios';

const posts = ref([]);
const user = ref([null]);
const status = ref('')
const info = localStorage.getItem("user");
user.value = JSON.parse(info)
  
  
  if(user.value != null) {
    status.value = "session"

  }else {
    status.value = "ofSession"
  }
  





onMounted(async () => {
  const API_URL = 'http://localhost:8080/getPost'
  const response = await axios.get(API_URL, {
 
  })
  posts.value = response.data

 

})







</script>
