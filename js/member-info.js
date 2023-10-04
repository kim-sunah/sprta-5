$(document).ready(function () {
  // 각종 div value
  const $container = {
    welcome: $("#welcome"),
    mainBoxTodoList: $(".main-box__todolist"),
    members: $(".member"),
    membersInfoContainer: $(".members-info-box"),
    teamInfoContainer: $(".team-info-box"),
    commentContainer: $("#comment-box"),
    cardContainer: $(".card-container"),
    memberCard: $(".membercard"),
    introduction: $(".Introduction"),
    crwalingDiv: $(".crawling_div"),
  };

  const $memberInfoController = {
    members: $(".member"),
    memberCard: $(".membercard"),
  };

  // 초기 화면 설정
  hideElements($container);

  // 최초 화면에 welcome 띄우기
  $container.welcome.show();

  // 2초 뒤에 화면 전환
  setTimeout(() => {
    // hide
    $container.welcome.hide();
    // show
    $container.mainBoxTodoList.show();
    $container.cardContainer.show();
  }, 2000);

  // 기타 div
  const etcElements = [
    "#main-box__submit",
    "#member-button-box a[href='#member-info']",
    "#team-button-box a[href='#team-info']",
  ];

  $("#team-button-box a").on("click", function (e) {
    e.preventDefault();

    // 모든 요소 숨기고 팀 정보 박스만 보여주기
    $("#today-area").hide();
    $("#comment-box").show();
    $("#member-button-box a.member").hide();
    etcElements.forEach((value) => $(value).hide());
    showElements($memberInfoController);
    // 팀 정보 박스 보여주기
    $container.teamInfoContainer.show();
    $container.introduction.show();
    $container.cardContainer.hide();
  });

  // 멤버 요소 컨트롤
  $("#member-button-box a[href='#member-info']").on(
    "click",
    function (e) {
      e.preventDefault();

      // 모든 요소 숨기고 멤버 버튼만 보여주기
      etcElements.forEach((value) => $(value).hide());
      showElements($memberInfoController);
      $container.teamInfoContainer.hide();
    }
  );

  // members 링크 클릭 시 infobox만 보이게 함
  $container.members.on("click", function (e) {
    e.preventDefault();
    hideElements($memberInfoController);
    $container.membersInfoContainer.show();
  });

  // members 링크 클릭 시 해당 멤버의 infobox만 보이게 함
  $container.members.on("click", function (e) {
    e.preventDefault();

    // 클릭한 멤버의 href 속성 값 가져오기
    const memberId = $(this).attr("href");
    // 모든 멤버 정보 박스 숨기기
    $container.membersInfoContainer.hide();
    // 해당하는 멤버 정보 박스 보이게 함
    $(`${memberId}-info`).show();
    // 달력 숨김
    $(".calendar").hide();
    $container.cardContainer.hide();
    // 크롤링 띄우기
    $container.crwalingDiv.show();
  });

  // 리셋 누를 시 초기화면으로 되돌림
  $(".reset").on("click", function (e) {
    e.preventDefault();

    hideElements($container);
    hideElements($memberInfoController);

    etcElements.forEach((value) => $(value).show());

    $("#today-area").show();
    $(".calendar").show();
    $container.mainBoxTodoList.show();
    $container.cardContainer.show();
  });

  // 가독성 함수 모음
  function showElements(elements) {
    Object.values(elements).forEach(($el) => $el.show());
  }

  function hideElements(elements) {
    Object.values(elements).forEach(($el) => $el.hide());
  }
});
