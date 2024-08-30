
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


emailjs.init(/* YOUR EMAIL JS KEY */)


onAuthStateChanged(auth, (user) => {
if (user) {

let uidd = user.uid;
let u_name = user.displayName;
let u_email = user.email;



const btn = document.getElementById('button');
const n = document.getElementById('from_name');
const e = document.getElementById('email_id');
n.value = u_name;
e.value = u_email;



document.getElementById('form')
.addEventListener('submit', function(event) {
event.preventDefault();
var m = document.getElementById("message");




var t = document.getElementById("form")


btn.value = 'Sending...';

const serviceID = 'default_service';
const templateID = '"'+/*YOUR TEMPLATE ID*/+'"';

emailjs.sendForm(serviceID, templateID, t)
.then(() => {
btn.value = 'Send Email';
m.value=""
alert('Thanks for the support, We got your feedback!');
}, (err) => {
btn.value = 'Send Feedback';
alert(JSON.stringify(err));
});
});



} else {  }
});
