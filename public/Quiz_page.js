
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
const db = getDatabase();
const auth = getAuth(app);





// page filling 
const storedUserData = localStorage.getItem('myData');

if(storedUserData){
console.log("data present");
let myData = JSON.parse(storedUserData);
console.log(myData);


 
var quizContainer = document.querySelector(".main-container");

for (const key in myData) {
    const quiz = myData[key];
    console.log(quiz.img);
    var quizHTML = `<article class="card">
        <div class="temporary_text">
            <img src="${quiz.img}">
        </div>
        <div class="card_content">
            <span class="card_title">${quiz.Quiz_Title}</span>
            <span class="card_subtitle">${quiz.Quiz_sub}</span>
            <p class="card_description">${quiz.Quiz_Desc}</p>
            <a  class="button2"  id="${quiz.Quiz_id}" onclick="openDetailsPage('${quiz.Quiz_id}')"  target="_blank" >Take Quiz</a>
        </div>
    </article>`;

    quizContainer.innerHTML += quizHTML;
}

}
else{
  const starCountRef = ref(db, 'QUIZ/' );
  onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  
  
  //local storage
  
  localStorage.setItem('myData', JSON.stringify(data));
  
  // Retrieve data from local storage
  
var quizContainer = document.querySelector(".main-container");

for (const key in data) {
    const quiz = data[key];
    console.log(quiz.img);
    var quizHTML = `<article class="card">
        <div class="temporary_text">
            <img src="${quiz.img}">
        </div>
        <div class="card_content">
            <span class="card_title">${quiz.Quiz_Title}</span>
            <span class="card_subtitle">${quiz.Quiz_sub}</span>
            <p class="card_description">${quiz.Quiz_Desc}</p>
            <a  class="button2"  id="${quiz.Quiz_id}" onclick="openDetailsPage('${quiz.Quiz_id}')"  target="_blank" >Take Quiz</a>
        </div>
    </article>`;

    quizContainer.innerHTML += quizHTML;
}
  
  
  
  console.log(data);
  });

}










onAuthStateChanged(auth, (user) => {
  if (user) {
    let uidd = user.uid;
    let u_name = user.displayName;
    let u_email = user.email;
    let u_photo = user.photoURL;
  
    
  
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

































