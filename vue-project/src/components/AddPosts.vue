<template>
    
    <div>
        <form action="" @submit.prevent="handeSubmit">
            <h3>Add Post</h3>
            <div>
                <label for="">Title</label>
                <input  type="text" v-model="title" name="" id="" placeholder="Title"/>

                <label for="">Description</label>
                <input type="text" name="" id="" v-model="details" placeholder="Description">
                <button type="submit">Add Post</button>
            </div>

        </form>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'

const title = ref('')
const details = ref('')

function handeSubmit() {
    let post = {
        title: title.value,
        details: details.value,

    }
    axios.post("localhost:8080/post")
    console.log(post);
   
}

</script>

<style  scoped>
form{
    background: white;
    padding: 20px;
    border-radius: 10px;
}
label{
    display: block;
    color: #bbb;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    margin: 20px 0 10px;
}
input {
    padding: 10px;
    border: 0;
    border-bottom: 1px solid #ddd;
    width: 100%;
    box-sizing: border-box;
}
textarea {
    border: 1px solid #ddd;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    height: 100px;
}
form button {
    display: block;
    margin: 20px auto 0;
    background: #00ce89;
    color: white;
    padding: 10px;
    border: 0;
    border-radius: 6px;
    font-size: 16px;
}
</style>
