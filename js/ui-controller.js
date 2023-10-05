$(document).ready(function () {
  // jQuery 선택자를 사용해 HTML 요소들을 변수에 할당
  const uiElements = {
    welcomeScreen: $("#welcome"),
    todoList: $(".main-box__todolist"),
    memberElements: $(".member"),
    membersInfoContainer: $(".members-info-box"),
    teamInfoContainer: $(".team-info-box"),
    commentSection: $("#comment-box"),
    cardArea: $(".card-container"),
    memberCardsElement: $(".membercard"),
    introductionTexts: $(".Introduction"),
    crawlingDivs: $(".crawling_div"),
    teamNameLabel: $(".team-name"),
    backButtonElement: $(".back"),
  };

  const memberCardUIElements = {
    membersElement: $(".member"),
    memberCardsElement: $(".membercard"),
  };

  const teamInfoUIElements = {
    teamInfoContainer: $(".team-info-box"),
    introductionTexts: $(".Introduction"),
    commentSection: $("#comment-box"),
  };

  const $otherUIElements = [
    "#main-box__submit",
    "#member-button-box a[href='#member-info']",
    "#team-button-box a[href='#team-info']",
  ];

  // DOM 트리 재사용 최적화를 위한 변수 재할당
  const $elements = getElements(uiElements);
  const $memberCardElements = getElements(memberCardUIElements);
  const $teamInfoElements = getElements(teamInfoUIElements);

  // 요소들을 가져오는 함수
  function getElements(selectors) {
    let elements = {};
    for (let key in selectors) {
      elements[key] = $(selectors[key]);
    }
    return elements;
  }

  hideElements($elements);

  showWelcomeScreen();

  setupEventHandlers();

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
    $elements.backButtonElement.on("click", (e) =>
      handlebackButtonElementClick(e)
    );
    $(".reset").on("click", (e) => handleResetClick(e));
  }

  // 매게변수로 들어온 요소들을 숨기는 함수
  function hideElements(elements) {
    Object.values(elements).forEach(($el) => {
      if ($el instanceof jQuery && $el.length > 0) {
        $el.hide();
      }
    });
  }

  // 매게변수로 들어온 요소들을 보여주는 함수
  function showElements(elements) {
    Object.values(elements).forEach(($el) => {
      if ($el instanceof jQuery && $el.length > 0) {
        $el.show();
      }
    });
  }

  // team info 버튼 클릭 시
  function handleTeamButtonClick(e) {
    e.preventDefault();

    $("#today-area").hide();
    $("#member-button-box a.member").hide();
    $elements.cardArea.hide();
    hideElements($memberCardElements);
    $otherUIElements.forEach((value) => $(value).hide());

    $elements.commentSection.show();
    showElements($teamInfoElements);
  }

  // member info 버튼 클릭 시
  function handleMemberButtonClick(e) {
    e.preventDefault();

    hideElements($teamInfoElements);
    $otherUIElements.forEach((value) => $(value).hide());
    $elements.teamNameLabel.hide();

    showElements($memberCardElements);
  }

  // 각각의 memberCard 버튼 클릭 시
  function handleMembersClick(e) {
    e.preventDefault();

    const memberId = $(this).attr("id");
    console.log(memberId);

    $elements.membersInfoContainer.hide();
    $(".calendar").hide();
    $elements.cardArea.hide();

    $(`#${memberId}-info`).show();
    $elements.crawlingDivs.show();
    $elements.backButtonElement.show();

    [1, 2, 3].forEach((i) => {
      fetchData(memberId, i);
    });
  }

  // 뒤로가기 버튼 클릭 시
  function handlebackButtonElementClick(e) {
    e.preventDefault();

    $otherUIElements.forEach((value) => $(value).hide());
    $elements.membersInfoContainer.hide();
    $elements.backButtonElement.hide();
    $elements.crawlingDivs.hide();

    $elements.cardArea.show();
    showElements($memberCardElements);
    $(".calendar").show();
  }

  // 리셋 버튼 클릭 시
  function handleResetClick(e) {
    e.preventDefault();

    hideElements($elements);
    hideElements($memberCardElements);

    $otherUIElements.forEach((value) => $(value).show());
    $elements.todoList.show();
    $elements.cardArea.show();
    $elements.teamNameLabel.show();
    $("#today-area").show();
    $(".calendar").show();
  }
});
