

<template>
  <div class="">
    <div class="">
      <header class="p-4">

      <nav class="text-center" v-show="!ifSingedIn">
        <RouterLink to="/" class="btn btn-primary m-3 shadow"><h1>Register</h1></RouterLink>
        <RouterLink to="/login" class="btn btn-success m-3 shadow"><h1>Login</h1></RouterLink>
      </nav>
      <div v-for="midterm in midterms" :key="midterm.midterms">
        <nav class="text-center" v-show="ifSingedIn">
        <RouterLink to="/home" class="btn btn-primary m-3 shadow"><h1>Home</h1></RouterLink>
        <RouterLink to="/dashboard" class="btn btn-success m-3 shadow"><h1>Dashboard</h1></RouterLink>

      
        <RouterLink to="/login" class="btn btn-danger m-3 shadow"  @click="logout()"><h1>{{ midterm.fullName }}</h1></RouterLink>
       
      </nav>
    </div>
</header>
    </div>
  </div>


  <RouterView />
</template>

<style>

</style>

<script setup>
import {db} from './firebase/index.js'
import {addDoc, collection, onSnapshot,deleteDoc, doc, updateDoc, getDoc, query, orderBy} from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase/index.js'
import router from './router'

const ifSingedIn = ref (false)


onMounted(()=>{
  onAuthStateChanged(auth, function(user){
    if(user){
      ifSingedIn.value = true
      router.push('/dashboard')
    }else{
      router.push('/login')
    }
  })
})

const logout = () =>{
  signOut(auth)
  .then(()=>{
    ifSingedIn.value = false
    
  })
}


const midterms = ref([])
    const id = ref(1)
    const q = (collection(db, "midterm"));
    
    onMounted(async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const q = query(collection(db, "midterm"), orderBy("fullName"));
      onSnapshot(q, (snapshot) => {
        const midtermTmp = [];
        snapshot.forEach((doc) => {
          const midterm = {
            id: doc.id,
            fullName: doc.data().fullName,
            address: doc.data().address,
            gender: doc.data().gender,
            emailAddress: doc.data().emailAddress,
            contactNumber: doc.data().contactNumber,
            completed: doc.data().completed,
          };
          if (midterm.emailAddress === user.email) {
            midtermTmp.push(midterm);
          }
        });
        midterms.value = midtermTmp;
      });
    }
  });
});

</script>
