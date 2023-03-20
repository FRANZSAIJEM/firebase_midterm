<template>
 <div class="body">
        <div class="container">
            <div class="card bg-success shadow-lg">
                <div class="card-body">
                    <h1 class="text-white text-center">Login</h1>

                    <div class="float-left">                          

                            <label for="emailAdress" class="text-white" style="font-size: 20px;">Email Address:</label> <br>
                            <input v-model="emailAddress" type="email" name="" id="" class="form-control"><br>


                            <label for="password" class="text-white" style="font-size: 20px;">Password:</label> <br>
                            <input v-model="password" type="password" name="" id="" class="form-control"> <br>

                            <button @click="login()" class="btn btn-primary float-right"><h5>Login</h5></button>

                    </div>
                 
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { onMounted, ref } from 'vue'
import { auth } from '../firebase/index.js'


import router from '../router'

const emailAddress = ref('')
const password = ref('')

const error = ref('')
const errorMsg = ref('')

const login = () => {
  signInWithEmailAndPassword(auth, emailAddress.value, password.value)
  .then((cred)=>{
    router.push('/dashboard')
  })
  .catch((err)=>{
    error.value = true
    errorMsg.value = err.message
  })
}

</script>