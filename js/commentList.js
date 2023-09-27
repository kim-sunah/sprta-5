
// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
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

const commentList = document.querySelector("#comment");
const main = document.querySelector("main");

// const savedTodos=localStorage.getItem(Todos_Key)
let docs = await getDocs(collection(db, "comment"));

let comments = [];

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

async function viewComment(event) {
    const li = event.target.parentElement;
    const docSnap = await getDoc(doc(db, "comment", li.id));
    main.innerHTML = ""
    main.innerHTML = `        
        <div class="main-col">
        <div class="reset">
            <div class="reset__col">
                <span>Wanna reset?</span>
            </div>
            <div class="reset__col">
                <span><i class="fa-solid fa-arrow-rotate-right"></i></span>
            </div>
        </div>
        <div class="comment-box">
            <form id="comment_input">
                <h2>[방명록] 칭찬해주세요</h2>
                <div>
                    <label for="floatingInput">제목</label>
                    <input id="commentTitle" type="text" placeholder="제목을 입력해주세요"></input>
                </div>
                <div class="form-floating mb-3">
                    <label for="floatingInput">추천 이유</label>
                    <textarea class="form-control" id="comment" placeholder="추천 이유"></textarea>
                </div>
            </form>
        </div>
        </div>`
    const docSnapData = docSnap.data();
    const postingbtn = document.querySelector("#postingbtn");
    document.querySelector("#commentTitle").value = docSnapData["commentTitle"];
    document.querySelector("#comment").value = docSnapData["comment"];

}
async function editComment(event) {

    const li = event.target.parentElement;
    const docSnap = await getDoc(doc(db, "comment", li.id));
    let confirmPw = prompt("게시글의 수정을 위해 비밀번호를 입력해주세요");

    if (confirmPw == docSnap.data()['password']) {
        main.innerHTML = ""
        main.innerHTML = `        
        <div class="main-col">
        <div class="reset">
            <div class="reset__col">
                <span>Wanna reset?</span>
            </div>
            <div class="reset__col">
                <span><i class="fa-solid fa-arrow-rotate-right"></i></span>
            </div>
        </div>
        <div class="comment-box">
            <form id="comment_input">
                <h2>[방명록] 칭찬해주세요</h2>
                <div>
                    <label for="floatingInput">제목</label>
                    <input id="commentTitle" type="text" placeholder="제목을 입력해주세요"></input>
                </div>
                <div class="form-floating mb-3">
                    <label for="floatingInput">추천 이유</label>
                    <textarea class="form-control" id="comment" placeholder="추천 이유"></textarea>
                </div>
            </form>
            <button id="postingbtn" type="button" class="btn btn-danger">수정하기</button>
        </div>
        </div>`
        const docSnapData = docSnap.data();
        const postingbtn = document.querySelector("#postingbtn");
        postingbtn.addEventListener("click", editCommentbtn);
        document.querySelector("#commentTitle").value = docSnapData["commentTitle"];
        document.querySelector("#comment").value = docSnapData["comment"];

        async function editCommentbtn(event) {
            let commentTitle = document.querySelector("#commentTitle").value
            let comment = document.querySelector("#comment").value
            await updateDoc(doc(db, "comment", li.id), {
                'commentTitle': commentTitle,
                'comment': comment,
            });
            alert('수정 완료!');
            location.href = 'index.html';
        }
    } else {
        alert('올바르지 못한 비밀번호 입니다!');
    }
}
async function deleteComment(event) {

    const li = event.target.parentElement;
    const docSnap = await getDoc(doc(db, "comment", li.id));
    let confirmPw = prompt("게시글의 삭제를 위해 비밀번호를 입력해주세요");
    if (confirmPw == docSnap.data()['password']) {
        await deleteDoc(doc(db, "comment", li.id));
        alert('삭제 완료!');
        li.remove();
    } else {
        alert('올바르지 못한 비밀번호 입니다!');
    }

}
