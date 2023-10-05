// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCauRZ02WOgnWSXDX7pEVv9xJ-g25bOyWE",
  authDomain: "sparta5-65934.firebaseapp.com",
  databaseURL: "https://sparta5-65934-default-rtdb.firebaseio.com",
  projectId: "sparta5-65934",
  storageBucket: "sparta5-65934.appspot.com",
  messagingSenderId: "381298859705",
  appId: "1:381298859705:web:b65a54d74b3b7f765b8568",
  // measurementId: "G-PE2KPSE1FQ"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchData(name, i) {
  database.ref(`${name}/${i}`).on("value", (snapshot) => {
    const data = snapshot.val();
    const {
      날짜: date,
      링크: links,
      제목: title,
    } = data;
    $(`.container${i}`).html(`
      제목 : ${title}<br>
      날짜 : ${date}
    `);
    $(`.container${i}`).wrap(`<div class = "memberContainer${i}"></div>`);
    $(`.memberContainer${i}`).click(function(){
		$(location).attr("href", `${links}`)
	});
  });
  const docSnap = await getDoc(doc(db, "member", `member${i}`));
  $(".social_btn").html(`
  <img class ="github" href="${docSnap.data()['github']}" src="img/icon/25231.png"> </img>
  <img class ="tistory" href="#" src="img/icon/270D883555ED252B1B.png"> </img>`)
}