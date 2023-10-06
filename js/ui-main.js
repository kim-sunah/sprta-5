import { uiElementSelector } from "./ui-elements.js";

import { hideElements } from "./ui-manipulation.js";

import {
  showWelcomeScreen,
  handleTeamButtonClick,
  handleMemberButtonClick,
  handleMembersClick,
  handlebackButtonElementClick,
  handleResetClick,
} from "./ui-event-handlers.js";

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

$(document).ready(function () {
  hideElements($elements);

  showWelcomeScreen();

  setupEventHandlers();

  // 클릭 이벤트를 설정하는 함수
  function setupEventHandlers() {
    $("#team-button-box a").on("click", (e) =>
      handleTeamButtonClick(e)
    );
    $("#member-button-box a[href='#member-info']").on("click", (e) =>
      handleMemberButtonClick(e)
    );
    $elements.memberElements.on("click", function (e) {
      handleMembersClick.call(this, e);
    });
    $(".reset").on("click", (e) => handleResetClick(e));
  }
});
