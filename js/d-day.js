const addBtn = document.querySelector('.add-day');
const dDaySubmitForm = document.querySelector('.day-submit');
const dayNameInput = document.querySelector('#day-name');
const dayDateInput = document.querySelector('#day-date');
const dDayShow = document.querySelector('.day-list');
let dayList = [];

const DAYLISTKEY = 'dayList';

function addDaySubmitForm() {
  dDaySubmitForm.classList.remove('display-none');
  daySubmitInit();
}

function daySubmitInit() {
  const todayYear = init.today.getFullYear();
  let todayMonth = init.today.getMonth() + 1;
  let todayDate = init.today.getDate();

  if (todayMonth.toString().length === 1) {
    todayMonth = '0' + todayMonth;
  }
  if (todayDate.length === 1) {
    todayDate = '0' + todayDate;
  }
  dayNameInput.value = '';
  dayDateInput.value = `${todayYear}-${todayMonth}-${todayDate}`;

  const daySubmitBtn = document.querySelector(
    '.day-submit__btn-col:first-child'
  );
  const dayCancelBtn = document.querySelector(
    '.day-submit__btn-col:last-child'
  );

  daySubmitBtn.addEventListener('click', saveDay);
  dayCancelBtn.addEventListener('click', cancelSubmit);
}

function saveDay() {
  const dayName = dayNameInput.value;
  const dayDate = dayDateInput.value;

  if (init.today > new Date(dayDate)) {
    alert('오늘 날짜보다 이릅니다. 날짜를 재입력해주세요!');
    dayDateInput.focus();
  } else if (dayName === '') {
    alert('이름을 입력해주세요');
    dayNameInput.focus();
  } else {
    const newDay = {
      dayName: dayName,
      dayDate: dayDate,
      id: String(Date.now()),
    };

    dayList.push(newDay);
    localStorage.setItem(DAYLISTKEY, JSON.stringify(dayList));
    dDaySubmitForm.classList.add('display-none');
    paintDay(newDay);
  }
}

function cancelSubmit() {
  const result = confirm('디데이 입력을 취소할까요?');
  if (result) {
    dDaySubmitForm.classList.add('display-none');
  }
}

function loadDay() {
  const savedData = localStorage.getItem(DAYLISTKEY);
  if (savedData !== null) {
    dayList = JSON.parse(savedData);

    dayList.map((e) => {
      paintDay(e);
    });
  }
}

function paintDay(dDay) {
  const div = document.createElement('div');
  div.className = 'd-day';
  div.id = dDay.id;
  const div2 = document.createElement('div');
  div2.className = 'd-day__countdown';
  const div3 = document.createElement('div');
  div3.className = 'd-day__name';

  const dayCount = document.createElement('span');
  const dayName = document.createElement('span');
  const countDay = countingDate(dDay.dayDate);

  if (countDay === 'D-DAY') {
    div.classList.add('d-day__animation');
  }

  dayCount.innerText = countDay;
  dayName.innerText = dDay.dayName;

  div2.appendChild(dayCount);
  div3.appendChild(dayName);
  div.appendChild(div2);
  div.appendChild(div3);
  dDayShow.appendChild(div);

  div.addEventListener('dblclick', deleteDay);
  div.addEventListener('click', settingCalendar);

  init.checkDdayList();
}

function countingDate(date) {
  const target = new Date(date);
  target.setHours(23, 59, 59);
  const diff = target - init.today;
  const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));

  let returnDate;
  if (diffDay === 0) {
    returnDate = 'D-DAY';
  } else if (diffDay < 0) {
    returnDate = 'D+' + Math.abs(diffDay);
  } else {
    returnDate = 'D-' + diffDay;
  }
  return returnDate;
}

function deleteDay(e) {
  const result = confirm('디데이를 삭제하시겠습니까?');
  if (result) {
    const target = e.currentTarget;

    const removeDay = dayList.filter((x) => x.id === target.id)[0];
    const removeCalendarDay = init.findToday(new Date(removeDay.dayDate));
    removeCalendarDay.classList.remove('calendar-date__event');

    dayList = dayList.filter((x) => x.id !== target.id);
    localStorage.setItem(DAYLISTKEY, JSON.stringify(dayList));
    target.remove();
  }
}

function settingCalendar(e) {
  const target = e.currentTarget;
  const day = dayList.filter((x) => x.id === target.id)[0].dayDate;
  init.date = new Date(day);
  init.drawCalendar();
}
addBtn.addEventListener('click', addDaySubmitForm);
loadDay();
