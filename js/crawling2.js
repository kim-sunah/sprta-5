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

// 선아 데이터
for (let i = 1; i <= 3; i++) {
  database.ref(`선아/${i}`).on("value", (snapshot) => {
    const data = snapshot.val();
    const {
      날짜: date,
      내용: contents,
      링크: links,
      제목: title,
    } = data;
    lastIndex = contents.indexOf(".") + 1;
    document.querySelector(
      `.sunah${i}`
    ).innerHTML = `제목 : ${title}<br>
            내용 : ${contents.slice(0, lastIndex)} <br>
            날짜 : ${date} <br>
            링크 : ${links}`;
  });
}

//지원 데이터
for (let i = 1; i <= 3; i++) {
  database.ref(`지원/${i}`).on("value", (snapshot) => {
    const data = snapshot.val();
    const {
      날짜: date,
      내용: contents,
      링크: links,
      제목: title,
    } = data;
    lastIndex = contents.indexOf(".") + 1;
    document.querySelector(
      `.jiwon${i}`
    ).innerHTML = `제목 : ${title}<br>
            내용 : ${contents.slice(0, lastIndex)} <br>
            날짜 : ${date} <br>
            링크 : ${links}`;
    console.log(title);
    console.log(contents);
    console.log(date);
    console.log(links);
  });
}

//태영 데이터
for (let i = 1; i <= 2; i++) {
  database.ref(`태영/${i}`).on("value", (snapshot) => {
    const data = snapshot.val();
    const {
      날짜: date,
      내용: contents,
      링크: links,
      제목: title,
    } = data;
    document.querySelector(
      `.taeyoung${i}`
    ).innerHTML = `제목 : ${title}<br>
            내용 : ${contents} <br>
            날짜 : ${date} <br>
            링크 : ${links}`;
  });
}

//유덕 데이터
for (let i = 1; i <= 3; i++) {
  database.ref(`유덕/${i}`).on("value", (snapshot) => {
    const data = snapshot.val();
    const {
      날짜: date,
      내용: contents,
      링크: links,
      제목: title,
    } = data;
    lastIndex = contents.indexOf(".") + 1;
    document.querySelector(
      `.yoodeock${i}`
    ).innerHTML = `제목 : ${title}<br>
            내용 : ${contents.slice(0, lastIndex)} <br>
            날짜 : ${date} <br>
            링크 : ${links}`;
  });
}

//윤찬 데이터
for (let i = 1; i <= 3; i++) {
  database.ref(`윤찬/${i}`).on("value", (snapshot) => {
    const data = snapshot.val();
    const {
      날짜: date,
      내용: contents,
      링크: links,
      제목: title,
    } = data;
    document.querySelector(
      `.yoonchan${i}`
    ).innerHTML = `제목 : ${title}<br>
            내용 : ${contents} <br>
            날짜 : ${date} <br>
            링크 : ${links}`;
  });
}

// function fetchData(name, i) {
//     database.ref(`${name}/${i}`).on("value", snapshot => {
//       const data = snapshot.val();
//       const { 날짜: date, 내용: contents, 링크: links, 제목: title } = data;
//       lastIndex = contents.indexOf('.') + 1;

//       $(`.${name}${i}`).html(`
//         제목 : ${title}<br>
//         내용 : ${contents.slice(0,lastIndex)} <br>
//         날짜 : $2023-10-05 08:29:11 <br>
//         링크 : ${links}
//       `);
//     });
//   }

//   for (let i = 1; i <= 3; i++) {
//     fetchData("윤찬", i);
//   }
