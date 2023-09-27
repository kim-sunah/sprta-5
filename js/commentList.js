
// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs, getDoc, deleteDoc, collection, doc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
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

const commentList = document.querySelector("#comment");
const main = document.querySelector("main");

// const savedTodos=localStorage.getItem(Todos_Key)
let docs = await getDocs(collection(db, "comment"));

//리스트 출력
docs.forEach((doc) => {
    let row = doc.data();
    const li = document.createElement("li")
    li.id = doc.id;
    const span = document.createElement("span")
    span.innerText = row['commentTitle'];
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "delete";
    const editButton = document.createElement("button");
    editButton.innerText = "edit";
    deleteButton.addEventListener("click", deleteComment);
    editButton.addEventListener("click", editComment);
    span.addEventListener("click", viewComment);
    li.appendChild(span);
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    commentList.appendChild(li)
})

function viewComment(event) {
    const li = event.target.parentElement;
    location.href = "commentNew.html?id="+li.id+"&status=view"
}
async function editComment(event) {
    
    const docSnap = await getDoc(doc(db, "comment", event.target.parentElement.id));
    let confirmPw = prompt("게시글의 수정을 위해 비밀번호를 입력해주세요");
    if (confirmPw == docSnap.data()['password']) {
    location.href = "commentNew.html?id="+event.target.parentElement.id+"&status=edit"
    }else {
        alert('올바르지 못한 비밀번호 입니다!');
    }
}
async function deleteComment(event) {
    const docSnap = await getDoc(doc(db, "comment", event.target.parentElement.id));
    let confirmPw = prompt("게시글의 삭제를 위해 비밀번호를 입력해주세요");
    if (confirmPw == docSnap.data()['password']) {
        await deleteDoc(doc(db, "comment", li.id));
        alert('삭제 완료!');
        li.remove();
    } else {
        alert('올바르지 못한 비밀번호 입니다!');
    }

}
