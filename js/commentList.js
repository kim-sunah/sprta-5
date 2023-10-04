// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs, getDoc, deleteDoc, addDoc, collection, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { query, orderBy, where } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
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
const commentList = document.querySelector("#comment-list");
const main = document.querySelector("main");


var today = new Date();
var year = today.getFullYear();
var month = ('0' + (today.getMonth() + 1)).slice(-2);
var day = ('0' + today.getDate()).slice(-2);
var hours = ('0' + today.getHours()).slice(-2);
var minutes = ('0' + today.getMinutes()).slice(-2);
var seconds = ('0' + today.getSeconds()).slice(-2);

// const q = query(
//     collection(db, 'comment'),
//     orderBy('date', 'desc')
// );
// let docs = await await getDocs(q);

var dateString = year + '-' + month + '-' + day + " " + hours + ':' + minutes + ':' + seconds;;
//리스트 출력
async function getCommentList() {
    const q = query(
        collection(db, 'comment'),
        orderBy('date', 'desc')
    );
    let docs = await await getDocs(q);

    commentList.innerHTML = ""
    docs.forEach((doc) => {
        let row = doc.data();
        const li = document.createElement("li");
        li.innerHTML = `<a>${row['date']}</a>
        </br>
        <a>${row['comment']}</a>
        </br>`
        li.id = doc.id;
        if (localStorage.getItem("userName") == row['userName']) {
            
            const deleteButton = document.createElement("button");
            const editButton = document.createElement("button");
            deleteButton.innerText = "삭제";
            editButton.innerText = "수정";
            deleteButton.addEventListener("click", deleteComment);
            editButton.addEventListener("click", editComment);
            // editButton.style.float = "right";
            // editButton.style.marginRight = "1vw"
            // editButton.style.border = "none"
            li.appendChild(deleteButton);
            li.appendChild(editButton);
        }
        commentList.appendChild(li)
    })
}
document.querySelector("#postingbtn").addEventListener("click", addComment);
document.querySelector("#comment").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("postingbtn").click();
    }
});

async function addComment() {
    let comment = $('#comment').val();
    let name = localStorage.getItem('userName')
    if (name == undefined) {
        name = prompt("성함을 알려주세요~");
        localStorage.setItem('userName', name);
    }
    let password = prompt("게시글의 비밀번호를 입력해주세요");
    if (password) {
        let doc = {
            'id': today,
            'userName': localStorage.getItem('userName'),
            'comment': comment,
            'password': password,
            'date': dateString,
        }
        await addDoc(collection(db, "comment"), doc);
        alert('저장 완료!');
        $("#comment").val("");
        commentList.innerHTML = ""
        getCommentList()
    }
}

document.querySelector('#comment-box').addEventListener("submit", (event) => {
    event.preventDefault();
})

async function editComment(event) {
    let confirmPw = prompt("게시글의 수정을 위해 비밀번호를 입력해주세요");
    const li = event.target.parentElement;
    const docSnap = await getDoc(doc(db, "comment", li.id));
    if (confirmPw == docSnap.data()['password']) {


        let changeText = document.getElementById(li.id);
        console.log(changeText.childNodes[2].textContent);

        li.innerHTML = ` 
        <form>
            <input id="commentEdit" type="text" placeholder="따뜻한 응원 한마디 부탁드려요~"value = "${changeText.childNodes[2].textContent}" style = "width:80%;"></input>
            <button id="cancelButton" type="button" style="float: right; margin-right: 1vw; border: medium;">취소</button>
            <button id="editButton" type="button" style="float: right; margin-right: 1vw; border: medium;">수정</button>
        </form>`
        document.getElementById("editButton").addEventListener("click",
            async function editCommentbtn(event) {
                var comment = document.getElementById("commentEdit").value;
                console.log(comment)
                await updateDoc(doc(db, "comment", li.id), {
                    'comment': comment,
                });
                alert('수정 완료!');
                commentList.innerHTML = ""
                getCommentList()
            })
        document.getElementById("cancelButton").addEventListener("click",
            function cancelButton() {
                commentList.innerHTML = ""
                getCommentList()
            })


    } else {
        alert('올바르지 못한 비밀번호 입니다!');
    }
}
async function deleteComment(event) {

    const li = event.target.parentElement;
    console.log(li)
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
getCommentList();