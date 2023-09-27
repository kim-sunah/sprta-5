
// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// Firebase 구성 정보 설정
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDtDmm6iJf4PIZtpJXfRRd8W-XKjuHxhgA",
    authDomain: "sparta-1e178.firebaseapp.com",
    projectId: "sparta-1e178",
    storageBucket: "sparta-1e178.appspot.com",
    messagingSenderId: "916403747858",
    appId: "1:916403747858:web:0b8f305adc6a5709612ccb",
    measurementId: "G-L8YQRNY77F"
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


$("#postingbtn").click(async function () {
    let commentTitle = $('#commentTitle').val();
    let comment = $('#comment').val();
    let password = prompt("게시글의 비밀번호를 입력해주세요");

    let doc = {
        'userName': localStorage.getItem('userName') ?localStorage.getItem('userName') :"익명",
        'commentTitle': commentTitle,
        'comment': comment,
        'password': password,
        'date': Date.now(),
    }


    console.log(doc);
    await addDoc(collection(db, "comment"), doc);
    alert('저장 완료!');
    location.href='index.html';
})