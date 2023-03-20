<template>
    <div class="body">
        <div class="container">
            <div class="card bg-primary shadow-lg">
                <div class="card-body">
                    <h1 class="text-white text-center">Register</h1>

                    <div class="float-left">
                     
                        
                            <label for="fullName" class="text-white" style="font-size: 20px;">Full Name:</label> <br>
                            <input v-model="fullName" type="text" name="" id="" class="form-control"> <br>

                            <label for="address" class="text-white" style="font-size: 20px;">Address:</label> <br>
                            <input v-model="address" type="text" name="" id="" class="form-control">  <br>

                            
                            <label for="gender" class="text-white" style="font-size: 20px;">Gender:</label><br>
                            <input v-model="gender" type="text" name="" id="" class="form-control"> <br>

                            <label for="emailAdress" class="text-white" style="font-size: 20px;">Email Address:</label> <br>
                            <input v-model="emailAddress" type="email" name="" id="" class="form-control"><br>

                            <label for="contactNumber" class="text-white" style="font-size: 20px;">Contact Number:</label> <br>
                            <input v-model="contactNumber" type="number" name="" id="" class="form-control"> <br>

                            <label for="password" class="text-white" style="font-size: 20px;">Password:</label> <br>
                            <input v-model="password" type="password" name="" id="" class="form-control"> <br>

                            <button @click="register()" class="btn btn-success float-right"><h5>Register</h5></button>

                    
                    </div>
                 
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {db} from '../firebase/index.js'
import {addDoc, collection, onSnapshot,deleteDoc, doc, updateDoc, getDoc, query, orderBy} from "firebase/firestore";
import { auth } from '../firebase/index.js'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { RouterLink } from 'vue-router'
import router from '../router'


const fullName = ref('')
const address = ref('')
const gender = ref('')
const emailAddress = ref('')
const contactNumber = ref('')
const password = ref('')


const error = ref('')
const errorMsg = ref('')
const success = ref('')
const successMsg = ref('')

const register = async () => {
    if(fullName.value != '' && address.value != '' && gender.value != '' && emailAddress.value != '' && contactNumber.value != null && password != ''){
        await addDoc (collection(db,"midterm"),{
            fullName:fullName.value,
            address:address.value,
            gender:gender.value,
            emailAddress:emailAddress.value,
            contactNumber:contactNumber.value,

            comleted: false
        })

        createUserWithEmailAndPassword(auth, emailAddress.value, password.value)
        .then((cred)=>{
            emailAddress.value = ""
            password.value = ""
            error.value = false
            success.value = true
            successMsg.value = "Registered Successfully"



        })
        .catch(()=>{
            error.value  = true
            errorMsg = "Invalid Email"
        })

        fullName.value = ''
        address.value = ''
        gender.value = ''
        emailAddress.value = ''
        contactNumber.value = null
        password.value = null

    }
    else{
            error.value = true
            errorMsg.value = "Please fill out all the fields"
        }

     
}



</script>

<style>
.body{
    display: grid;
    place-content: center;
}
.container{
    width: 1000px;
}

</style>