// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs, getDoc, deleteDoc, addDoc, collection, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { query, orderBy, where } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
// import { getAnalytics } from "firebase/analytics";

// Firebase 구성 정보 설정
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCauRZ02WOgnWSXDX7pEVv9xJ-g25bOyWE",
  authDomain: "sparta5-65934.firebaseapp.com",
  databaseURL: "https://sparta5-65934-default-rtdb.firebaseio.com",
  projectId: "sparta5-65934",
  storageBucket: "sparta5-65934.appspot.com",
  messagingSenderId: "381298859705",
  appId: "1:381298859705:web:b65a54d74b3b7f765b8568",
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const $container = {
  commentList: $("#comment-list"),
  postingbtn: $("#postingbtn"),
  comment: $("comment"),
  commentBox: $('#comment-box'),
};

const init = {
  monthArr: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  date: new Date(),
  today: new Date(),
  setYearMonth: function (selectedDate) {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    $('.calendar-yearmonth__col').text(`${init.monthArr[month]}, ${year}`)
  },
  setDates: function (selectedDate) {

    const lastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    const firstWeek = 7 - firstDay;

    let day = 0;
    let week = 1;
    let innerHtml = '<div class="calendar-date__row">';

    for (let j = 1; j <= (7 - firstWeek); j++) {
      innerHtml = innerHtml + "<div class='calendar-date__col'></div>";
      (day !== 6) ? day++ : day = 0;
    }

    for (let i = 1; i <= lastDate; i++) {
      if (week === 1) {
        innerHtml = innerHtml + `<div class='calendar-date__col' id = "${selectedDate.getMonth() + 1}_${i}">${i}</div>`;
        if (day === 6) {
          innerHtml = innerHtml + "</div><div class='calendar-date__row'>";
          day = 0;
          week++;
        } else {
          day++;
        }
      } else {
        innerHtml = innerHtml + `<div class='calendar-date__col'id = "${selectedDate.getMonth() + 1}_${i}">${i}</div>`;
        if (day === 6) {
          innerHtml = innerHtml + "</div><div class='calendar-date__row'>";
          day = 0;
          week++;
        } else {
          day++;
        }
      }
    }

    if (day !== 0) {
      while (day !== 0) {
        innerHtml = innerHtml + "<div class='calendar-date__col'></div>";
        (day !== 6) ? day++ : day = 0;
      }
      innerHtml = innerHtml + "</div>";
    }

    $(".calendar-date").html(innerHtml);

  },

  drawCalendar: function () {
    const date = init.date;
    init.setYearMonth(date);
    init.setDates(date);
    if (date.getMonth() === init.today.getMonth() && date.getFullYear() === init.today.getFullYear()) {
      init.addClassToday(init.findToday(init.today));
    }
    // 클릭 이벤트 핸들러 등록
    document.addEventListener("click", function (event) {
      const target = event.target;
      if (target.classList.contains("calendar-date__col")) {
        viewModal(target.id); // 클릭한 날짜의 id를 넘김
      }
    });
  },
  findToday: function (date) {
    const thisDay = date;
    const firstDay = new Date(thisDay.getFullYear(), thisDay.getMonth(), 1).getDay();
    const week = Math.ceil((thisDay.getDate() + firstDay) / 7);
    let day = (thisDay.getDate() % 7) + firstDay;

    if (day > 7) { day = day - 7; }

    const today = $(`.calendar-date>div:nth-child(${week})>div:nth-child(${day})`)
    return today;
  },
  addClassToday: function (today) {
    today.addClass("calendar-date__today")
  },
};

function prevMonthDraw() {
  const thisMonth = init.date.getMonth();
  const thisYear = init.date.getFullYear();

  init.date = new Date(thisYear, thisMonth - 1, 1);
  init.drawCalendar();
}

function nextMonthDraw() {
  const thisMonth = init.date.getMonth();
  const thisYear = init.date.getFullYear();

  init.date = new Date(thisYear, thisMonth + 1, 1);
  init.drawCalendar();
}

$(".calendar-yearmonth div:nth-child(1)").on("click", prevMonthDraw);
$(".calendar-yearmonth div:nth-child(3)").on("click", nextMonthDraw);

init.drawCalendar();
async function openModal(event) {
  const clickedDateId = event.target.id;
  const docSnap = await getDoc(doc(db, "history", clickedDateId));

  const modalContent = `
  <div id="modalWrap">
    <div id="modalContent">
      <div id="modalBody">
        <span id="closeBtn" onclick="closeModal()">&times;</span>
        ${docSnap.exists() ? (
      `<ul>${Object.entries(docSnap.data()).map(([fieldName, value]) => `<li>${fieldName}: ${value}</li>`).join('')}</ul>`
    ) : (
      '<p>데이터가 없습니다</p>'
    )}
      </div>
    </div>
  </div>
`;


  $("body").append(modalContent);

  $("#closeBtn").on("click", closeModal);

  $("body").css("overflow", "hidden");
}


function closeModal() {
  $("#modalWrap").remove();
  $("body").css("overflow", "auto");
}
$("#closeBtn").on("click", closeModal);
$(".calendar-date__col").on("click", openModal);
