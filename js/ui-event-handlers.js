import {
  uiElementSelector,
  memberCardUIElementSelector,
  teamInfoUIElementSelector,
  otherUIElements,
} from "./ui-elements.js";

import { hideElements, showElements } from "./ui-manipulation.js";

// 요소들을 가져오는 함수
function getElements(selectors) {
  let elements = {};
  for (let key in selectors) {
    elements[key] = $(selectors[key]);
  }
  return elements;
}

// DOM 트리 재사용 최적화를 위한 변수 재할당
const $elements = getElements(uiElementSelector);
const $memberCardElements = getElements(memberCardUIElementSelector);
const $teamInfoElements = getElements(teamInfoUIElementSelector);

// 상태 추적용
let isMemberCardClicked = false;

// 첫 화면을 보여주는 함수
function showWelcomeScreen() {
  $elements.welcomeScreen.show();

  setTimeout(() => {
    $elements.welcomeScreen.hide();

    $elements.todoList.show();
    $elements.cardArea.show();
    $elements.teamNameLabel.show();
  }, 2000);
}

// team info 버튼 클릭 시
function handleTeamButtonClick(e) {
  e.preventDefault();

  $("#today-area").hide();
  $("#member-button-box a.member").hide();
  $elements.cardArea.hide();
  hideElements($memberCardElements);
  otherUIElements.forEach((value) => $(value).hide());

  $elements.commentSection.show();
  showElements($teamInfoElements);
}

// member info 버튼 클릭 시
function handleMemberButtonClick(e) {
  e.preventDefault();

  hideElements($teamInfoElements);
  otherUIElements.forEach((value) => $(value).hide());
  $elements.teamNameLabel.hide();

  showElements($memberCardElements);
}

// 각각의 memberCard 버튼 클릭 시
function handleMembersClick(e) {
  e.preventDefault();

  const memberId = $(this).attr("id");

  $elements.membersInfoContainer.hide();
  $(".calendar").hide();
  $elements.cardArea.hide();

  $(`#${memberId}-info`).show();
  $elements.crawlingDivs.show();

  [1, 2, 3, 4, 5].forEach((i) => {
    fetchData(memberId, i);
  });
  blogData(memberId);

  isMemberCardClicked = true;
}

// 리셋 버튼 클릭 시
function handleResetClick(e) {
  e.preventDefault();

  hideElements($elements);
  hideElements($memberCardElements);

  otherUIElements.forEach((value) => $(value).show());
  $elements.todoList.show();
  $elements.cardArea.show();
  $elements.teamNameLabel.show();
  $("#today-area").show();
  $(".calendar").show();

  if (isMemberCardClicked) {
    handleMemberButtonClick(e);
    isMemberCardClicked = false;
    return;
  }
}

// 뒤로가기 상태일 시
function handlebackButtonElementClick(e) {
  e.preventDefault();

  otherUIElements.forEach((value) => $(value).hide());
  $elements.membersInfoContainer.hide();
  $elements.crawlingDivs.hide();

  $elements.cardArea.show();
  showElements($memberCardElements);
  $(".calendar").show();
}

export {
  showWelcomeScreen,
  handleTeamButtonClick,
  handleMemberButtonClick,
  handleMembersClick,
  handlebackButtonElementClick,
  handleResetClick,
};
