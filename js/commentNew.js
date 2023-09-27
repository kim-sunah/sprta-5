// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
// import { collection } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs, getDoc, deleteDoc, addDoc, collection, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
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
const urlParams = new URL(location.href).searchParams;
const status = urlParams.get('status');
const commentId = urlParams.get('id');
const postingbtn = document.getElementById('postingbtn');

if (status == "new") {
    postingbtn.innerText = "기록하기";
    postingbtn.addEventListener("click", createComment)
} else if (status == "edit") {
    postingbtn.innerText = "수정하기";
    const docSnap = await getDoc(doc(db, "comment", commentId));
    const docSnapData = docSnap.data();
    document.querySelector("#commentTitle").value = docSnapData["commentTitle"];
    document.querySelector("#comment").value = docSnapData["comment"];
    postingbtn.addEventListener("click", editComment)
} else {
    postingbtn.remove();
    const docSnap = await getDoc(doc(db, "comment", commentId));
    const docSnapData = docSnap.data();
    document.querySelector("#commentTitle").value = docSnapData["commentTitle"];
    document.querySelector("#comment").value = docSnapData["comment"];
}
//생성
async function createComment() {
    let commentTitle = $('#commentTitle').val();
    let comment = $('#comment').val();
    let password = prompt("게시글의 비밀번호를 입력해주세요");
    if (password != null) {
        let doc = {
            'userName': localStorage.getItem('userName') ? localStorage.getItem('userName') : "익명",
            'commentTitle': commentTitle,
            'comment': comment,
            'password': password,
            'date': Date.now(),
        }
        await addDoc(collection(db, "comment"), doc);
        alert('저장 완료!');
        location.href = 'index.html';
    } else {
        alert('게시글 작성을 위해서는 비밀번호가 필요합니다!');
    }
}
//수정
async function editComment() {
    let commentTitle = document.querySelector("#commentTitle").value
    let comment = document.querySelector("#comment").value
    await updateDoc(doc(db, "comment", commentId), {
        'commentTitle': commentTitle,
        'comment': comment,
    });
    alert('수정 완료!');
    location.href = 'index.html';
}