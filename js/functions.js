// JavaScript Document

// http://stackoverflow.com/questions/118241/calculate-text-width-with-javascript
// this version here is adjusted to be more dynamic

(function ($) {
  $.textMetrics = function (el) {
    var tm = document.createElement("span"),
      $tm = $(tm);
    $tm.css({
      border: 0,
      padding: 0,
      position: "absolute",
      visibility: "hidden",
    });

    tm.appendChild(document.createTextNode(el.textContent || el.innerText));

    el.appendChild(tm);
    var rect = tm.getClientRects()[0];
    $tm.remove();

    return {
      height: rect.bottom - rect.top,
      width: rect.right - rect.left,
    };
  };
})(jQuery);

// custom implementation
$(function () {
  $("p.title_menu").each(function () {
    var widths = [],
      maxwidth = 0,
      width = 0;
    $(this)
      .children("span")
      .each(function () {
        width = $.textMetrics(this)["width"];
        widths.push({ el: this, width: width });
        if (maxwidth < width) maxwidth = width;
      });
    widths.forEach(function (w, i) {
      $(w.el).css({
        "font-size": (w.width > 0 ? maxwidth / w.width : 0).toFixed(5) + "em",
      });
    });
  });
});

$(document).ready(function () {
  /* INITIALIZE */
  setInterval(function () {
    $("body").removeClass("notransitionreal");
  }, 1);

  /* ACCORDION */

  var acc = document.getElementsByClassName("collapsible-title");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    };
  }

  /* 이미지 뷰어 기능 */
  $("a[data-img]").on("click", function (e) {
    e.preventDefault();
    var imgNumber = $(this).data("img");
    var imgPath = "source/img/" + imgNumber + ".jpg";

    $("#viewerImage").attr("src", imgPath);
    $("#imageViewer").addClass("active");
  });

  // 이미지 뷰어 닫기
  $("#imageClose").on("click", function () {
    $("#imageViewer").removeClass("active");
  });

  // 뷰어 배경 클릭시 닫기
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

  /* responsive offset */

  var borderforoffset; // declare variables in this scope

  function setOffset() {
    borderforoffset = $(".author_content_border").height();
  }

  setOffset(); // just call the function

  $(window).resize(setOffset);

  /* fake loop clone of div for mobile */

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    var tocopy = $(".menutocopy");
    for (var i = 0; i < 145; i++) {
      tocopy.clone().insertAfter(tocopy);
    }
  }

  /* LOOP */

  $(".precontainer_menu").scrollTop(2);

  function setMargins() {
    bottomofpage = $("#wrappertobottom").height();
  }

  setMargins(); // just call the function

  $(window).on("resize", setMargins);
  $(window).on("scroll", setMargins);

  $(".scrollcontroller").scroll(function () {
    // loop down vers up

    if ($(".scrollcontroller").scrollTop() >= bottomofpage - 1) {
      $(".scrollcontroller").scrollTop(2);
    }

    // loop up vers down

    if ($(".scrollcontroller").scrollTop() <= 1) {
      $(".scrollcontroller").scrollTop(bottomofpage - 2);
    }
  });

  /* link between two scrolling elements */

  $(".scrollcontrollerinner").css({
    height: $("#wrappercontainermenu").height() + "px",
  });

  $(".linked").attr("data-scrolling", "false");

  $(".linked").scroll(function () {
    if ($(this).attr("data-scrolling") == "false") {
      $(".linked").not(this).attr("data-scrolling", "true");
      $(".linked").not(this).scrollTop($(this).scrollTop());
    }
    $(this).attr("data-scrolling", "false");
  });

  /* click appearing about */

  $(".author_name, .author_name_mobile, .btnclose").click(function () {
    $(".preprecontainer_menu").toggleClass("preprecontainermenuaddclass");
    $(".scrollcontroller").toggleClass("scrollcontrollermenuaddclass");
    $(".animatedparent").toggleClass("animatedparentaddclass");
    $(".wrapper_menu").toggleClass("wrappermenuaddclass");
    $(".innerwrapper_menu").toggleClass("innerwrappermenuaddclass");
    $(".author_content").toggleClass("authorcontentshowhide");
    $(".author_name_mobile").toggleClass("authornamemobileaddclass");
  });

  $(".author_name, .author_name_mobile").click(function () {
    setTimeout(function () {
      $(".author_name_mobile").toggleClass("showhideauthor");
    }, 750);
  });

  $(".btnclose").click(function () {
    $(".author_name_mobile").toggleClass("showhideauthor");
  });

  /* Kill css animation on resize */

  $(document).load(function () {
    setTimeout(function () {
      $("body").removeClass("notransitionreal");
    }, 500);
  });

  $(window).resize(function () {
    $("body").toggleClass("notransition");
  });

  function resizedw() {
    $("body").toggleClass("notransition");
  }

  var doit;
  window.onresize = function () {
    clearTimeout(doit);
    doit = setTimeout(resizedw, 100);
  };
});
