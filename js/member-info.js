$(document).ready(function () {
  const $membersInfoBox = $(".members-info-box");
  const $members = $(".member");
  const $teamInfoBox = $(".team-info-box");
  const $welcome = $("#welcome");
  const $mainBoxTodolist = $(".main-box__todolist");
  const $memberCard = $(".membercard");

  // 페이지 로드 시 기본적으로 숨기기
  $welcome.show();
  $mainBoxTodolist.hide();
  $members.hide();
  $membersInfoBox.hide();
  $teamInfoBox.hide();
  $("#comment-box").hide();
  $memberCard.hide();

  // 5초 뒤에 welcome 문구 사라지게 만듦
  setTimeout(function () {
    $welcome.hide();
    $mainBoxTodolist.show();
  }, 2000);

  $("#team-button-box a").on("click", function (e) {
    e.preventDefault();

    // 모든 요소 숨기고 팀 정보 박스만 보여주기
    $("#main-box__submit").hide();
    $("#member-button-box a[href='#member-info']").hide();
    $("#member-button-box a.member").hide();
    $("#team-button-box a[href='#team-info']").hide();
    $members.hide();
    $memberCard.hide();
    $("#comment-box").show();
    $("#today-area").hide();
    // 팀 정보 박스 보여주기
    $teamInfoBox.show();
  });

  // 멤버 요소 컨트롤
  $("#member-button-box a[href='#member-info']").on(
    "click",
    function (e) {
      e.preventDefault();

      // 모든 요소 숨기고 멤버 버튼만 보여주기
      $("#main-box__submit").hide();
      $("#team-button-box a[href='#team-info']").hide();
      $("#member-button-box a[href='#member-info']").hide();
      $teamInfoBox.hide();
      $members.show();
      $memberCard.show();
    }
  );

  // members 링크 클릭 시 infobox만 보이게 함
  $members.on("click", function (e) {
    e.preventDefault();
    $members.hide();
    $membersInfoBox.show();
    $memberCard.hide();
  });

  // members 링크 클릭 시 해당 멤버의 infobox만 보이게 함
  $members.on("click", function (e) {
    e.preventDefault();

    // 모든 멤버 정보 박스 숨기고, 클릭한 멤버에 해당하는 정보 박스만 보이게 함
    const memberId = $(this).attr("href");
    // 클릭한 멤버의 href 속성 값 가져오기
    $membersInfoBox.hide();
    // 모든 멤버 정보 박스 숨기기
    $(`${memberId}-info`).show();
    // 해당하는 멤버 정보 박스 보이게 함
  });

  // 리셋 누를 시 초기화면으로 되돌림
  $(".reset").on("click", function (e) {
    e.preventDefault();

    $members.hide();
    $membersInfoBox.hide();
    $teamInfoBox.hide();
    $("#comment-box").hide();
    $("#main-box__submit").show();
    $("#team-button-box a[href='#team-info']").show();
    $("#member-button-box a[href='#member-info']").show();
    $("#today-area").show();
    $memberCard.hide();
  });
});
