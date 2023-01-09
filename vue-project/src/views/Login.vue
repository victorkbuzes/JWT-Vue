<template>
    <div>
        <form action="" @submit.prevent="handeSubmit">
            <h3>Login</h3>
            <div>
                <label for="">Email</label>
                <input  type="email" v-model="email" name="" id="" placeholder="Email"/>

                <label for="">Password</label>
                <input type="text" name="" id="" v-model="password" placeholder="password">
                <button type="submit">Login</button>
            </div>

        </form>
        <div id="message"> {{ message }}</div>

    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter} from 'vue-router'

const router = useRouter()


const email = ref('')
const password = ref('')
const message = ref('')


async function handeSubmit() {
    let data = {
        email: email.value,
        password: password.value
    }
    fetch('http://localhost:8080/login', {
        method:"POST",
        body:JSON.stringify(data),
        headers: { "Content-Type": "application/json ; charset=utf-8"}

        
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        const message = data.message;
        if (data.type == 'success') {
            document.getElementById('message').innerHTML = `<p>${message}</p>`
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', data.user)
            router.push("/")
        }
        if (data.type == 'error') {
            document.getElementById('message').innerHTML = `<p>${message}</p>`
            
        }
      
  

    })
  
    
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
