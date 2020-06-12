var firebaseConfig = {
    apiKey: //APIkey
    authDomain: "baroom-e8aa7.firebaseapp.com",
    databaseURL: "https://baroom-e8aa7.firebaseio.com",
    projectId: "baroom-e8aa7",
    storageBucket: "baroom-e8aa7.appspot.com",
    messagingSenderId: "498829638801",
    appId: "1:498829638801:web:9ee7b5dc20a8d256f85330",
    measurementId: "G-K8RF45S80X"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const newPostRef = firebase.database();

let room = "room1";

const username = document.getElementById("username");
const output = document.getElementById("output");

function text(){
  newPostRef.ref(room).on("child_added", function (data) {
    const value = data.val();
    const key = data.key;
    let str = "";

    str += '<div id="' + key + '" class="msg_main">'
    str += '<div class="msg_left">';
    str += '<div class=""><img src="img/icon_person.png" alt="" class="icon ' + value.username +
      '" width="30"></div>';
    str += '<div class="msg">';
    str += '<div class="name">' + value.username + '</div>';
    str += '<div class="text">' + value.text + '</div>';
    str += '</div>';
    str += '</div>';
    str += '<div class="msg_right">';
    str += '<div class="time">' + value.time + '</div>';
    str += '</div>';
    str += '</div>'; 
    output.innerHTML += str;
    $("#output").scrollTop( $("#output")[0].scrollHeight );
  
  });

}

//時間を取得する関数
function time() {
  var date = new Date();
  var hh = ("0" + date.getHours()).slice(-2);
  var min = ("0" + date.getMinutes()).slice(-2);
  var sec = ("0" + date.getSeconds()).slice(-2);

  var time = hh + ":" + min + ":" + sec;
  return time;
}


const speech = new webkitSpeechRecognition();
speech.lang = 'ja-JP';

const join = document.getElementById('join');
const content = document.getElementById('content');

join.addEventListener('click', function () {
    room = document.getElementById('join-room').value; 
    speech.start();
    text();
});

const endcall = document.getElementById('end-call');

endcall.addEventListener('click', function(){
  location.reload();
});

speech.onresult = function (e) {
    speech.stop();
    if (e.results[0].isFinal) {
      var autotext = e.results[0][0].transcript
      console.log(e);
      console.log(autotext);
      newPostRef.ref(room).push({
        username: username.value,
        text: autotext,
        time: time()
      });
      
    }
}

speech.onend = () => {
    speech.start()
};
