import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getAuth ,onAuthStateChanged, GoogleAuthProvider,signInWithPopup ,signOut} from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';
import { getDatabase,child, ref, set,get,onValue } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js';

const firebaseConfig = {
  /* USE YOUR Firebase Config here*/

  //  |      |  |----   |---|   |----
  //  |------|  |       |---|   |
  //  |      |  |----   |  \    |----
  //  |      |  |____   |   \   |____
  };

const app = initializeApp(firebaseConfig);
let isLoggedin = false;
const auth = getAuth(app);

auth.languageCode = 'en';

const provider = new GoogleAuthProvider();
const b  = document.getElementById("LoginButton");
// const b  = document.getElementById("LoginButton");
var h = document.getElementById("photo");
console.log(h.src);

 function login(){

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // The signed-in user info.
        const user = result.user;
        h.src = user.photoURL;

        // IdP data available using getAdditionalUserInfo(result)
        // ...

            console.log(user.email);
            console.log(user.displayName);
            console.log(user.photoURL);

           

            // Display user's profile information
            document.getElementById("photo").src = user.photoURL;
         

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
       
        // ...
      });
    
}


function logout(){


    signOut(auth).then(() => {
        document.getElementById("photo").src = "WhatsApp Image 2024-03-22 at 15.59.29_b8da7af8.jpg";
        console.log("logged out");
        isLoggedin = false;
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    
    }



// user info update 



const db = getDatabase();

// function createDocumentIfFirstTime(user) {
//   const userId = user.uid;

//   set(ref(db,'users/'+userId),{
//     email: user.email,
//     displayName: user.displayName,
//     score:0
//     // Add any other properties you want to store
// }).then(()=>{
//   console.log("success");
// }).catch((error)=>{
//   console.log(error);

// })


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

 






var h = document.getElementsByClassName("profile");



onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    
    let uidd = user.uid;
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


    
    const uid = user.uid;
    isLoggedin = true;
    console.log(isLoggedin);
    chechLink();
    document.getElementById("photo").src=user.photoURL;

    b.innerHTML=`Signout`;
    // b.addEventListener("click",logout);
   b.onclick=logout;

    // ...
  } else {
    // User is signed out
    // ...
    b.innerHTML=`   <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" x="0px" y="0px" class="google-icon" viewBox="0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg> Signin`;

    // b.addEventListener("click",login);
    isLoggedin = false;

    console.log(isLoggedin);
     chechLink();

    b.onclick=login;
    // window.location.href = "index.html";


    //getting last name
    // Get the pathname from the URL
// const pathname = window.location.pathname;

// Split the pathname into segments using '/' as the separator
// const segments = pathname.split('/');

// Get the last segment (word) of the URL
// const lastSegment = segments[segments.length - 1];

// console.log(lastSegment);


    if(window.location.pathname!=='/index.html' && window.location.pathname!=='/about.html'){
      history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});


      window.location.href='index.html';

    }

  }
});







function chechLink(){

    const myLink = document.getElementsByClassName("private");

    console.log(myLink);


if (!isLoggedin) {
    myLink[0].onclick= function(event) {
      event.preventDefault(); // Prevent default click behavior
      alert("Please log in to access this link."); // Corrected alert placement
    }
    myLink[1].onclick= function(event) {
        event.preventDefault(); // Prevent default click behavior
      alert("Please log in to access this link."); // Corrected alert placement
    }
    myLink[2].onclick= function(event) {
        event.preventDefault(); // Prevent default click behavior
      alert("Please log in to access this link."); // Corrected alert placement
    }
    myLink[3].onclick= function(event) {
        event.preventDefault(); // Prevent default click behavior
      alert("Please log in to access this link."); // Corrected alert placement
    }
    myLink[4].onclick= function(event) {
        event.preventDefault(); // Prevent default click behavior
      alert("Please log in to access this link."); // Corrected alert placement
    }
    myLink[5].onclick= function(event) {
        event.preventDefault(); // Prevent default click behavior
      alert("Please log in to access this link."); // Corrected alert placement
    }
    myLink[6].onclick= function(event) {
        event.preventDefault(); // Prevent default click behavior
      alert("Please log in to access this link."); // Corrected alert placement
    }
    myLink[7].onclick= function(event) {
        event.preventDefault(); // Prevent default click behavior
      alert("Please log in to access this link."); // Corrected alert placement
    }
    myLink[8].onclick= function(event) {
        event.preventDefault(); // Prevent default click behavior
      alert("Please log in to access this link."); // Corrected alert placement
    }
    myLink[9].onclick= function(event) {
        event.preventDefault(); // Prevent default click behavior
      alert("Please log in to access this link."); // Corrected alert placement
    }
  } else {
    // Remove styles or event listener if logged in (optional)
  
    myLink[0].onclick= function(event) {
              }
      myLink[1].onclick= function(event) {
   }
      myLink[2].onclick= function(event) {
         }
      myLink[3].onclick= function(event) {
          }
      myLink[4].onclick= function(event) {
          }
      myLink[5].onclick= function(event) {
          }
      myLink[6].onclick= function(event) {
          }
      myLink[7].onclick= function(event) {
          }
      myLink[8].onclick= function(event) {
      }
      myLink[9].onclick= function(event) {
          }

    for(let i=0;i<10;i++){

        myLink[i].style.pointerEvents = "auto";
        myLink[i].style.cursor = "pointer";
        myLink[i].style.opacity = 1;
    }
    
  
   
  }



}

