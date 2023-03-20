<template>
    <div class="body">
        <div class="container">
            <div class="cards d-flex text-center">
            <div class="card m-5 bg-success text-white shadow-lg">
                <div class="card-body p-5">
                    <h1>{{ midterms.length }}</h1>
                    <h6>All Users</h6>
                </div>
            </div>
            <div class="card m-5 bg-success text-white shadow-lg">
                <div class="card-body p-5">
                    <h1 style="color:pink">{{ femaleUsers }}</h1>
                    <h6>Female Users</h6>
                </div>
            </div>
            <div class="card m-5 bg-success text-white shadow-lg">
                <div class="card-body p-5">
                    <h1 style="color:blue">{{ maleUsers }}</h1>
                    <h6>Male Users</h6>
                </div>
            </div>
        </div>
            <h3>List Of All Users</h3>
       
                <table class="table table-borderless">
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Address</th>
                            <th>Contact Number</th>
                            <th>Email Address</th>
                    

                        </tr>
                    </thead>
                  
                    <tbody v-for="midterm in midterms" :key="midterm.midterms">
                      
                        <tr class="td" :style="{ color: midterm.gender === 'Female' ? 'pink' : 'blue' }">
                       
                                <td >{{ midterm.fullName }}</td>
                                <td >{{ midterm.address }}</td>
                                <td >{{ midterm.contactNumber }}</td>
                                <td >{{ midterm.emailAddress }}</td>
                          
                    
                            </tr>
                      
                    </tbody>
               
                </table>
        
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
    
    
    
    const midterms = ref([])
    const id = ref(1)
    const q = (collection(db, "midterm"));
    

    const femaleUsers = ref(0)
    const maleUsers = ref(0)


    onMounted(async()=>{
      onSnapshot(q,(snapshot)=> {
        const midtermTmp = []
        let femaleCount = 0
        let maleCount = 0


        snapshot.forEach((doc) => {
    
        const midterm = {
          id: doc.id,
          fullName: doc.data().fullName,
          address: doc.data().address,
          gender: doc.data().gender,
          emailAddress: doc.data().emailAddress,
          contactNumber: doc.data().contactNumber,
          completed: doc.data().completed
        }
    
        midtermTmp.push(midterm)

        if(midterm.gender == 'Female'){
            femaleCount++
        }

        if(midterm.gender == 'Male'){
            maleCount++
        }
      });
      midterms.value = midtermTmp
      femaleUsers.value = femaleCount
      maleUsers.value = maleCount

      })
    })

    </script>

    <style>
.td{
    transition: 0.5s;
}
.td:hover{

    background-color: rgba(93, 93, 93, 0.141);
    border-radius: 10px;
  
}
</style>