$(document).ready(function () {
  const $membersInfoBox = $(".members-info-box");
  const $members = $(".member");
  const $teamInfoBox = $(".team-info-box");

  // 페이지 로드 시 기본적으로 숨기기
  $members.hide();
  $membersInfoBox.hide();
  $teamInfoBox.hide();

  $("#team-button-box a").on("click", function (e) {
    e.preventDefault();

    // 모든 요소 숨기고 팀 정보 박스만 보여주기
    $("#main-box__submit").hide();
    $("#member-button-box a[href='#member-info']").hide();
    $("#member-button-box a.member").hide();
    $("#team-button-box a[href='#team-info']").hide();
    $members.hide();

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
    }
  );

  // members 링크 클릭 시 infobox만 보이게 함
  $members.on("click", function (e) {
    e.preventDefault();
    $members.hide();
    $membersInfoBox.show();
  });

  // 리셋 누를 시 초기화면으로 되돌림
  $(".reset").on("click", function (e) {
    e.preventDefault();

    $members.hide();
    $membersInfoBox.hide();
    $teamInfoBox.hide();
    $("#main-box__submit").show();
    $("#team-button-box a[href='#team-info']").show();
    $("#member-button-box a[href='#member-info']").show();
  });
});
