function createDocumentIfFirstTime(user) {
  const userId = user.uid;
  const dbref = ref(db);


  get(child(dbref,'users/'+userId)).then((snapshot)=>{

    if(snapshot.exists()){
      console.log("user already exist");

    }
    else{
      var months = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];
      
      var currentDate = new Date();
      
      var day = currentDate.getDate();
      var monthIndex = currentDate.getMonth();
      var year = currentDate.getFullYear();
      
      var formattedDate = day + " " + months[monthIndex] + " " + year;



      set(ref(db,'users/'+userId),{
        email: user.email,
        displayName: user.displayName,
        total_quiz_played:0,
        total_correct:0,
        total_incorrect:0,
        "Cricket Challenge":[0,0],
        "Octagon Quest":[0,0],
        "Footy Time Warp":[0,0],
        "Geo Quest":[0,0],
        "Time Traveler":[0,0],
        "Wildlife Wiz":[0,0],
        "Random Fact Frenzy":[0,0],
        "Master of Melodies":[0,0],
        "Speed Freak":[0,0],
        "Etymology Exploration":[0,0],
        "Wonder Wanderer":[0,0],
        "C Coding Conqueror":[0,0],
        "Video Game Guru":[0,0],
        "Olympic Oracle":[0,0],
        "Ancient Sage":[0,0],
        "News Ninja":[0,0],
        "Boxing Blitz":[0,0],
        "C++ Challenge":[0,0],
        "HTML Maestro":[0,0],
        "Space Trek":[0,0],
        "Time":`${formattedDate}`


        // Add any other properties you want to store
    }).then(()=>{
      console.log("success");
    }).catch((error)=>{
      console.log(error);
    
    })

    }


  })




}

 
// storage/////////////////////////////////
const body = document.querySelector("body"),
     modeToggle = body.querySelector(".mode-toggle");
 let     sidebar = body.querySelector("nav");
 let     sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if(getMode && getMode ==="dark"){
    body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if(getStatus && getStatus ==="close"){
    sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () =>{
    body.classList.toggle("dark");
    if(body.classList.contains("dark")){
        localStorage.setItem("mode", "dark");
    }else{
        localStorage.setItem("mode", "light");
    }
});

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status", "open");
    }
})


// actual user work
// require('dotenv').config();


import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getAuth ,onAuthStateChanged, GoogleAuthProvider,signInWithPopup ,signOut} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';
import { getDatabase,update,remove,child, ref, set,get,onValue } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js';


const firebaseConfig = {
  /* USE YOUR Firebase Config here*/

  //  |      |  |----   |---|   |----
  //  |------|  |       |---|   |
  //  |      |  |----   |  \    |----
  //  |      |  |____   |   \   |____
  };


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getDatabase();

  let mo = document.getElementById("mo");




  onAuthStateChanged(auth, (user) => {
    if (user) {
    
/////////////////////////////////////////////////////////diff method for error////////////////////

    
createDocumentIfFirstTime(user); //update user info

const storedUserData = localStorage.getItem('myData');

if(storedUserData){
console.log("data present");

}
else{
const starCountRef = ref(db, 'QUIZ/' );
onValue(starCountRef, (snapshot) => {
const data = snapshot.val();


//local storage

localStorage.setItem('myData', JSON.stringify(data));

// Retrieve data from local storage



console.log(data);
});
}


const userdata = localStorage.getItem('userdata')
if(userdata){
  console.log("user data present");
  
}
else{

  const dbref = ref(db);
  let df;

  
  get(child(dbref,'users/'+ uidd)).then((snapshot)=>{

    if(snapshot.exists()){
      df=snapshot.val();
      console.log(snapshot.val());
      localStorage.setItem('userdata', JSON.stringify(snapshot.val()));
      localStorage.setItem('total_incorrect', JSON.stringify(snapshot.val().total_incorrect));


    }
    else{}}).catch((error)=>{
      console.log(error);
    
    })

}



/////////////////////////////////////////////////////////diff method for error////////////////////



        let uidd = user.uid;
        let u_name = user.displayName;
        let u_email = user.email;
        let u_photo = user.photoURL;
        let names =[];
        let scores =[];
        let tc,ti;
        let pi_names=["Correct answers","Inorrect answers","Unattempted"];
        let pi_scores=[];

        
  const dbref = ref(db);      
  get(child(dbref,'users/'+ uidd)).then((snapshot)=>{

          if(snapshot.exists()){
           const df=snapshot.val();
           tc = snapshot.val().total_correct;
           ti = snapshot.val().total_incorrect;
           pi_scores[0]=tc;
           mo.innerHTML=`Obtained : ${tc}`;
           pi_scores[1]=ti;
           pi_scores[2]=200-(tc+ti);
           console.log(tc,ti);
           console.log(df);

            for(const key in df){

                if(df[key][1]==1){
                    console.log(key  ,`:` ,df[key][0]);
                    names.push(key);
                    scores.push(df[key][0]);
                   


                }
            }
            console.log(names);
            console.log(scores);

            //plotting graph
            
const ctx = document.getElementById('myBarChart').getContext('2d');
    
// Generate random data for 20 elements
const data = {
  labels: Array.from({ length: names.length }, (_, i) => `${names[i]}`),
  datasets: [{
    label: 'scores',
    data: scores, // Random values between 0 and 10
    backgroundColor: 'rgba(54, 162, 235, 0.2)', // Blue color with transparency
    borderColor: 'rgba(54, 162, 235, 1)', // Blue color
    borderWidth: 1
  }]
};

// Create a new bar chart instance
const myBarChart = new Chart(ctx, {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 10 // Set the upper limit for the y-axis scale
      }
    }
  }
});      

//graph plotting end


//plotting pie chart

const pi = document.getElementById('myPieChart').getContext('2d');

// Data for the pie chart with 20 elements
const d = {
  labels: Array.from({ length: pi_names.length }, (_, i) => `${pi_names[i]}`),
  datasets: [{
    label: 'value',
    data: pi_scores, // Random values between 0 and 100
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(153, 102, 255)',
      // Add more colors as needed
    ],
    hoverOffset: 4
  }]
};

// Create a new pie chart instance
const myPieChart = new Chart(pi, {
  type: 'pie',
  data: d
});

//plotting pie chart end







          }
          else{}}).catch((error)=>{
            console.log(error);
          
          })


        
} else {  



  if(window.location.pathname!=='/index.html' && window.location.pathname!=='/about.html'){
    history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
  history.pushState(null, null, document.URL);
});


    window.location.href='/index.html';

  }






}
});




