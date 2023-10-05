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

function fetchData(name, i) {
  database.ref(`${name}/${i}`).on("value", (snapshot) => {
    const data = snapshot.val();
    const {
      날짜: date,
      내용: contents,
      링크: links,
      제목: title,
    } = data;
    lastIndex = contents.indexOf(".") + 1;
    $(`.container${i}`).html(`
      제목 : ${title}<br>
      내용 : ${contents.slice(0, lastIndex)} <br>
      날짜 : ${date}<br>
      링크 : ${links}
    `);
  });
}
