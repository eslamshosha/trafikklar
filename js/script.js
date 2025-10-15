let hint = document.querySelector(".preloader");
window.onload = function () {
  //hide the preloader
  setTimeout(function () {
    hint.style.display = "none";
  }, 700);
};
$(document).ready(function () {
  // if ($(window).width() >= 991) {
  //   sal({
  //     once: true,
  //   });
  // } else {
  //   sal({
  //     disabled: true,
  //   });
  // }

  //phone size menu onclick
  $("#menu-id").click(function (e) {
    e.preventDefault();
    $(".navgition").toggleClass("reset-left");
    $("body").toggleClass("overflow");
  });
  $(".nav-head .close-menu").click(function () {
    $(".navgition").removeClass("reset-left");
    $("body").removeClass("overflow");
  });

  //fixed nav3
  $stickyNav = $(".top-header");
  $(window).on("scroll load", function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 200) {
      $stickyNav.addClass("fixed-nav", 500);
    } else {
      $stickyNav.removeClass("fixed-nav", 500);
    }
    if (scroll == 0) {
      $stickyNav.removeClass("fixed-nav", 500);
    }
  });
  var $stickyheader = $("header");
  lastScroll = 0;
  $(window).on("scroll load", function () {
    var scroll = $(window).scrollTop();
    if (lastScroll - scroll > 0) {
      $stickyheader.addClass("fixed-header", { duration: 1000 });
    } else {
      $stickyheader.removeClass("fixed-header", { duration: 500 });
    }
    lastScroll = scroll;
    if (scroll == 0) {
      $stickyheader.removeClass("fixed-header", { duration: 500 });
    }
  });
  //////////** fixed arrow to top**//////////
  $(".arrow-top").click(function () {
    $("html").css("scroll-behavior", "unset");

    $("html,body").animate(
      {
        scrollTop: 0,
      },
      1000,
      "swing"
    );
    setTimeout(() => {
      $("html").css("scroll-behavior", "smooth");
    }, 1000);
  });
  $(this).scrollTop() >= 500
    ? $(".arrow-top").fadeIn(300)
    : $(".arrow-top").fadeOut(300);

  $(window).scroll(function () {
    $(this).scrollTop() >= 500
      ? $(".arrow-top").fadeIn(300)
      : $(".arrow-top").fadeOut(300);
  });
  const selectExists =
    document.getElementsByClassName("select_input").length > 0;
  if (selectExists) {
    const $select2 = $(".select_input");
    $select2.select2();
  }

  //otp code animation
  $(".otp-form *:input[type!=hidden]:first").focus();
  let otp_fields = $(".otp-form .otp-field"),
    otp_value_field = $(".otp-form .otp-value");
  otp_fields
    .on("input", function (e) {
      $(this).val(
        $(this)
          .val()
          .replace(/[^0-9]/g, "")
      );
      let opt_value = "";
      otp_fields.each(function () {
        let field_value = $(this).val();
        if (field_value != "") opt_value += field_value;
      });
      otp_value_field.val(opt_value);
    })
    .on("keyup", function (e) {
      let key = e.keyCode || e.charCode;
      if (key == 8 || key == 46 || key == 37 || key == 40) {
        // Backspace or Delete or Left Arrow or Down Arrow
        $(this).prev().focus();
      } else if (key == 38 || key == 39 || $(this).val() != "") {
        // Right Arrow or Top Arrow or Value not empty
        $(this).next().focus();
      }
    })
    .on("paste", function (e) {
      let paste_data = e.originalEvent.clipboardData.getData("text");
      let paste_data_splitted = paste_data.split("");
      $.each(paste_data_splitted, function (index, value) {
        otp_fields.eq(index).val(value);
      });
    });
});
// dark mode

let darkmodeInput = $(".darkmode-input");
let logo = $(".img-logo img");
let imgbg = $(".body-bg");
let imggoogle = $(".google-btn img");
let imgapple = $(".apple-btn img");

if (localStorage.getItem("dark-mode") == "true") {
  $("body").addClass("dark-mode");
  logo.attr("src", "images/logo-dark.svg");
  imgbg.attr("src", "images/dark-bg.svg");
  imggoogle.attr("src", "images/google-btn-dark.png");
  imgapple.attr("src", "images/apple-btn-dark.png");
  darkmodeInput.prop("checked", true);
  $(".switch-darkmode").prop("checked", true);
} else {
  darkmodeInput.prop("checked", false);
  $(".switch-darkmode").prop("checked", false);
}

$(".darkmode-input , .switch-darkmode").on("change", function () {
  $("body").toggleClass("dark-mode");
  if (this.checked) {
    if (this.classList[0] == "darkmode-input") {
      $(".switch-darkmode").prop("checked", true);
    } else {
      $(".darkmode-input").prop("checked", true);
    }
    localStorage.setItem("dark-mode", "true");
    logo.attr("src", "images/logo-dark.svg");
    imgbg.attr("src", "images/dark-bg.svg");
    imggoogle.attr("src", "images/google-btn-dark.png");
    imgapple.attr("src", "images/apple-btn-dark.png");
  } else {
    logo.attr("src", "images/logo.svg");
    localStorage.setItem("dark-mode", "false");
    $(".darkmode-input").prop("checked", false);
    imgbg.attr("src", "images/light-bg.svg");
    imggoogle.attr("src", "images/google-btn-light.png");
    imgapple.attr("src", "images/apple-btn-light.png");
  }
});
//showPass
function showPass(showPass) {
  sibling = showPass.parentElement.nextElementSibling;
  // sibling.focus();
  if (showPass.checked) {
    sibling.setAttribute("type", "text");
    $(".password-show i").addClass("active");
  } else {
    sibling.setAttribute("type", "password");
    $(".password-show i").removeClass("active");
  }
}
const phoneExists = document.getElementsByClassName("phone").length > 0;

if (phoneExists) {
  const phoneInputField = document.querySelector("#phone");
  const phoneInput = window.intlTelInput(phoneInputField, {
    initialCountry: "auto", // Automatically detect user's country
    nationalMode: false, // Show the full international number (with country code)
    separateDialCode: true, // Display country dial code separately
    showFlags: true, // (Automatically enabled) show flag dropdown
    geoIpLookup: function (callback) {
      fetch("https://ipapi.co/json")
        .then((res) => res.json())
        .then((data) => callback(data.country_code))
        .catch(() => callback("us"));
    },
    utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  });
}
//otp timer
const timerExists =
  document.getElementsByClassName("countDown-cont").length > 0;
if (timerExists) {
  function countdown() {
    var seconds = 59;
    function tick() {
      var counter = document.getElementById("counter");
      seconds--;
      counter.innerHTML = "00:" + (seconds < 10 ? "0" : "") + String(seconds);
      if (seconds > 0) {
        setTimeout(tick, 1000);
      } else {
        // document.getElementById("counter").innerHTML = "";
      }
    }
    tick();
  }
  countdown();
}
