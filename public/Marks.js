
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

 
// storage/////////////////////////
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
  let cc = document.getElementById("test_given");
  let n = document.getElementById("name");
  let ncc = document.getElementById("test_not_given");




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
        n.textContent=u_name;
      
        
  const dbref = ref(db);      
  get(child(dbref,'users/'+ uidd)).then((snapshot)=>{

          if(snapshot.exists()){
           const df=snapshot.val();
           console.log(df);

            for(const key in df){

                if(df[key][1]==1){
                    console.log(key  ,`:` ,df[key][0]);
                    var f= `<div class="elem">
                    <p>${key}  : ${df[key][0]}</p>
                    <div class="bar">
                    <div class="range" style="--p:${df[key][0]*10}">
                    <div class="range__label"></div>
                     </div>
                     </div> 
                     </div>
                    `;
                    cc.innerHTML+=f;


                }
            }


            for(const key in df){

                if(df[key][0]==0 && df[key][1]==0){
                    console.log(key  ,`:` ,df[key][0]);
                    var f= `<div class="elem">
                    <p>${key}  : ${df[key][0]}</p>
                    <div class="bar">
                    <div class="range" style="--p:'not attempted'
                    <div class="range__label"></div>
                     </div>
                     </div> 
                     </div>
                    `;
                    ncc.innerHTML+=f;
                }
            }


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

