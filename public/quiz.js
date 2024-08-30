

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
  





// Function to get URL parameters
function getUrlParameter(name) {

  name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



  
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user

    
   let  uidd = user.uid;
   
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


   
    
  //auth check start


// Retrieve the job field parameter from the URL
const quiz_id = getUrlParameter("Quiz_id");
console.log(quiz_id);
const qi = quiz_id.toString();


let myData = JSON.parse(localStorage.getItem('myData'));
const currquiz= myData[qi]
console.log(myData[qi]);

let dataframe= myData[qi];
let queList = dataframe["questions"];
 let quizData= queList;








// javascript
const quiz = document.querySelector('#quiz');
const scores = document.querySelector('.score');
const answerElm = document.querySelectorAll(".answer");
const [questionElm, option_1, option_2, option_3, option_4] = 
   document.querySelectorAll(
    "#question, #option_1, #option_2, #option_3, #option_4 "
   );
   
   const submitBtn = document.querySelector("#submit");

   let currentQuiz = 0;
   let score = 0;

//    Load Quiz Function

const loadQuiz = () => {
    const {Question, options} = quizData[currentQuiz];
    console.log(Question);

    questionElm.innerText = `${currentQuiz + 1}. ${Question}`;
    scores.innerHTML = `Score: ${score}/${quizData.length} `;
    options.forEach(
        (curOption, index) => {(window[`option_${index + 1}`].innerText = curOption)
        console.log(curOption);}
    );
};

loadQuiz();

// get selected answer function on button

const getSelectedOption = () => {
    let ans;
    let ind;
    answerElm.forEach((curOption, index) => {
        if(curOption.checked) {
            console.log(curOption.id);
            var c="0";
            if(curOption.id=='a'){c="option_1"}
            if(curOption.id=='b'){c="option_2"}
            if(curOption.id=='c'){c="option_3"}
            if(curOption.id=='d'){c="option_4"}

            let text = document.getElementById(c);
            console.log(text.textContent);


            ind = index;
            ans = text.textContent;
        }
    });
    return {ans,ind};
};

const deselectedAnswers = () => {
    return answerElm.forEach((curElem) => (curElem.checked = false));
};
  
submitBtn.addEventListener("click", () =>{

        let arel = document.getElementsByTagName("li");
        console.log(arel);

        
        const selectedOptionIndex = getSelectedOption();
        let ind = selectedOptionIndex.ind;
        
        






    

    // increase the score
    if(selectedOptionIndex.ans === quizData[currentQuiz].answer) {
        arel[ind].style.backgroundColor = "#00ff00";
        score = score+1
    }
    else{
        arel[ind].style.backgroundColor = "#ff0000";
    }

    currentQuiz++;
    
    setTimeout(() => {
        // Your task here
        console.log('Task performed after 3 seconds');
        

    if(currentQuiz < quizData.length) {
        deselectedAnswers();
        arel[ind].style.backgroundColor = "#ffffff";
        loadQuiz();
    }
    else {

        //updating user database
    

          let userdata = JSON.parse(localStorage.getItem('userdata'));
          let old_total_incorrect = JSON.parse(localStorage.getItem('total_incorrect'));
       
          let quiz_name = dataframe.Quiz_Title;
   


          
         if(userdata[quiz_name][0]<score ){
          let maxscore = userdata['total_correct'];
          console.log("max = ",maxscore);
          let nmax = maxscore - userdata[quiz_name][0] + score;
          

          let old_quiz_incorrect = 10 - userdata[quiz_name][0];
            let current_incorrect = 10 - score;
            let diff = old_quiz_incorrect - current_incorrect;
            let newincorrect = (userdata[quiz_name][1])?old_total_incorrect - diff  : old_total_incorrect + 10 - score ;




     




          const dbRef = ref(getDatabase());

         
          userdata['total_correct']=nmax;
          userdata['total_incorrect']=newincorrect;

          localStorage.setItem('userdata', JSON.stringify(userdata));

          const updates = {};
          console.log(userdata['total_incorrect']);
          console.log(userdata['total_incorrect']==0);
          


          if(old_total_incorrect==0){
          updates[`users/${uidd}/total_incorrect`] = 10- score;
          updates[`users/${uidd}/${quiz_name}/0`] = score;
          updates[`users/${uidd}/${quiz_name}/1`] = 1;
          updates[`users/${uidd}/total_correct`] = nmax;
          console.log("0 path");
          }
          else{
          updates[`users/${uidd}/total_incorrect`] = newincorrect;
          updates[`users/${uidd}/${quiz_name}/0`] = score;
          updates[`users/${uidd}/${quiz_name}/1`] = 1;
          updates[`users/${uidd}/total_correct`] = nmax;
          console.log("non 0 path");


          }

          
          // updates[`posts/${key}/starCount`] = increment(1);
          // updates[`user-posts/${key}/stars/${uid}`] = true;
          // updates[`user-posts/${key}/starCount`] = increment(1);
          update(dbRef, updates);

          console.log("data updated successfully");



         }
         else if(score==0 && userdata[quiz_name][1]==0)
         {
           let newincorrect =old_total_incorrect+10;

           const dbRef = ref(getDatabase());

           //updating local storage
           // userdata.`${quiz_name}`.0=score;
           // userdata.quiz_name[1]=1;
           userdata['total_incorrect']=newincorrect;
 
           localStorage.setItem('userdata', JSON.stringify(userdata));
 
           const updates = {};
        
           
 
 
           if(old_total_incorrect==0){
           updates[`users/${uidd}/total_incorrect`] = 10- score;
           updates[`users/${uidd}/${quiz_name}/0`] = score;
           updates[`users/${uidd}/${quiz_name}/1`] = 1;
           console.log("0 path");
           }
           else{
           updates[`users/${uidd}/total_incorrect`] = newincorrect;
           updates[`users/${uidd}/${quiz_name}/0`] = score;
           updates[`users/${uidd}/${quiz_name}/1`] = 1;
           console.log("non 0 path");
 
 
           }
 
           
           // updates[`posts/${key}/starCount`] = increment(1);
           // updates[`user-posts/${key}/stars/${uid}`] = true;
           // updates[`user-posts/${key}/starCount`] = increment(1);
           update(dbRef, updates);
 
           console.log("data updated successfully with 10 incorrect");
 



         }





      quiz.style.marginTop = "20%"; // Set top margin to 50px
      quiz.innerHTML = `
        <div class="result">
        <h2> 🏆 Your Score: ${score}/${quizData.length}  Correct Answers</h2>
        <p>Congratulations on completing the quiz! </p>
        <button class="reload-button" onclick="location.reload()">Try Again 🔄</button>
        <a class="reload-button" href="index.html">Home</a>
        </div>
        `;




    }
      },300); 

    



});


//authcheck

} else {  }
});

