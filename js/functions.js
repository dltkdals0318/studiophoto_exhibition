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

  $(document).on("click", "a[data-img]", function (e) {
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

  var isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (isMobile) {
    var tocopy = $(".menutocopy");
    // 모바일에서는 과하게 안 돌리고 6~8 정도만 반복
    for (var i = 0; i < 8; i++) {
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

  // 데스크톱에서만 무한 루프 스크롤
  if (!isMobile) {
    $(".scrollcontroller").on("scroll", function () {
      var $this = $(this);

      if ($this.scrollTop() >= bottomofpage - 1) {
        $this.scrollTop(2);
      }

      if ($this.scrollTop() <= 1) {
        $this.scrollTop(bottomofpage - 2);
      }
    });
  }

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

  $(".author_name, .author_name_mobile").on("click", function () {
    $(".author_content").toggleClass("authorcontentshowhide");

    $(".author_name_mobile").toggleClass("showhideauthor");
  });

  $(".btnclose").on("click", function () {
    $(".author_content").removeClass("authorcontentshowhide");
    $(".author_name_mobile").toggleClass("showhideauthor");
  });
});
