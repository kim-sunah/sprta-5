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
    console.log(data)
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
    $(`.memberContainer${i}`).click(function () {
      $(location).attr("href", `${links}`)
    });
  });
}
function blogData(name) {
  database.ref(`member_blog/${name}`).on("value", (snapshot) => {
    const blogData = snapshot.val();
    $("#grid_social_btn").html(`
    <div class="github_btn">
     <img class="github" src="img/icon/25231.png"> </img>
    </div>
    <div class = "tistory_btn">
     <img class="tistory" src="img/icon/270D883555ED252B1B.png"> </img>
    </div>
    `)
    $(`.github_btn`).click(function () {
      window.open(`${blogData.GitHub}`, '_blank')
    });
    $(`.tistory_btn`).click(function () {
      window.open(`${blogData.tistory}`, '_blank')
    });
  });
}