// JavaScript Document

// 간단한 기능만 남긴 정리 버전

$(document).ready(function () {
  /* 초기 로딩 시 transition 활성화 */
  setTimeout(function () {
    $("body").removeClass("notransitionreal");
  }, 100);

  /* ==========================
     이미지 뷰어 기능
     ========================== */

  $("a[data-img]").on("click", function (e) {
    e.preventDefault();
    var imgNumber = $(this).data("img");
    var imgPath = "source/img/" + imgNumber + ".jpg";

    $("#viewerImage").attr("src", imgPath);
    $("#imageViewer").addClass("active");
  });

  // 닫기 버튼
  $("#imageClose").on("click", function () {
    $("#imageViewer").removeClass("active");
  });

  // 뷰어 배경 클릭 시 닫기 (이미지 영역 클릭은 무시)
  $("#imageViewer").on("click", function (e) {
    if (e.target === this) {
      $(this).removeClass("active");
    }
  });

  // ESC 키로 닫기
  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && $("#imageViewer").hasClass("active")) {
      $("#imageViewer").removeClass("active");
    }
  });

  /* ==========================
     모바일용 루프 메뉴 복제
     ========================== */

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    var tocopy = $(".menutocopy");
    // 필요 이상으로 많은 복제는 성능에 영향을 줄 수 있음
    // 무한 스크롤 느낌만 유지되면 되므로, 145 → 40 정도로 축소
    for (var i = 0; i < 40; i++) {
      tocopy.clone().insertAfter(tocopy);
    }
  }

  /* ==========================
     스크롤 루프 처리 (.scrollcontroller)
     ========================== */

  var bottomofpage = 0;

  function setMargins() {
    bottomofpage = $("#wrappertobottom").height();
  }

  // 최초 한 번 계산
  setMargins();

  // 창 크기 / 스크롤 위치 변경 시 높이 재계산
  $(window).on("resize", setMargins);
  $(window).on("scroll", setMargins);

  // 실제 루프 스크롤은 .scrollcontroller 에서 처리
  $(".scrollcontroller").on("scroll", function () {
    var $this = $(this);

    // 아래로 끝까지 갔을 때 다시 위로
    if ($this.scrollTop() >= bottomofpage - 1) {
      $this.scrollTop(2);
    }

    // 위로 끝까지 갔을 때 다시 아래로
    if ($this.scrollTop() <= 1) {
      $this.scrollTop(bottomofpage - 2);
    }
  });

  /* ==========================
     두 스크롤 요소 동기화
     ========================== */

  $(".scrollcontrollerinner").css({
    height: $("#wrappercontainermenu").height() + "px",
  });

  $(".linked").attr("data-scrolling", "false");

  $(".linked").on("scroll", function () {
    var $this = $(this);
    if ($this.attr("data-scrolling") === "false") {
      $(".linked")
        .not(this)
        .attr("data-scrolling", "true")
        .scrollTop($this.scrollTop());
    }
    $this.attr("data-scrolling", "false");
  });

  /* ==========================
     작가 소개 패널 토글
     ========================== */

  $(".author_name, .author_name_mobile, .btnclose").on("click", function () {
    $(".preprecontainer_menu").toggleClass("preprecontainermenuaddclass");
    $(".scrollcontroller").toggleClass("scrollcontrollermenuaddclass");
    $(".animatedparent").toggleClass("animatedparentaddclass");
    $(".wrapper_menu").toggleClass("wrappermenuaddclass");
    $(".innerwrapper_menu").toggleClass("innerwrappermenuaddclass");
    $(".author_content").toggleClass("authorcontentshowhide");
    $(".author_name_mobile").toggleClass("authornamemobileaddclass");
  });

  // 모바일에서 이름 클릭 시, 약간의 딜레이 후 숨김/표시 클래스 토글
  $(".author_name, .author_name_mobile").on("click", function () {
    setTimeout(function () {
      $(".author_name_mobile").toggleClass("showhideauthor");
    }, 750);
  });

  $(".btnclose").on("click", function () {
    $(".author_name_mobile").toggleClass("showhideauthor");
  });
});
