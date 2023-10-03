const firebaseConfig = {
    apiKey: "AIzaSyB1QNgSpqnjAu5F4gt2fyWNnvYt_toalTQ",
    authDomain: "python-firebase-practice-39795.firebaseapp.com",
    databaseURL: "https://python-firebase-practice-39795-default-rtdb.firebaseio.com",
    projectId: "python-firebase-practice-39795",
    storageBucket: "python-firebase-practice-39795.appspot.com",
    messagingSenderId: "173388738643",
    appId: "1:173388738643:web:909a5d16c4f433916496a6"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

// 윤찬 데이터
for(let i =1;i<=3;i++){
    database.ref(`윤찬/블로그${i}페이지`).on("value", snapshot => {
        const data = snapshot.val();
        const {날짜:date, 내용: contents, 링크: links, 제목: title} = data;
        // const json = JSON.stringify(data);
        document.querySelector(` .container${i}`).innerHTML =
            `제목 : ${title}<br>
            내용 : ${contents} <br>
            날짜 : ${date} <br>
            링크 : ${links}`;
    });
}



