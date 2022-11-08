$(document).ready(() => {
  $(".ui.dropdown").dropdown();

  function fixHeader() {
    var winTop = $(window).scrollTop();
    if (winTop >= 1) {
      $(".go-up-section").fadeIn();
    } else {
      $(".go-up-section").fadeOut();
    }
  }
  fixHeader();
  $(window).scroll(function () {
    fixHeader();
  });

  $('input[type="tel"]').mask("+7 (999) 999-99-99");

  // Модальные окна
  var overlay = $(".overlay"),
    modal = $(".modal"),
    modalClose = $(".modal__close"),
    modalOpen = $(".modal__open");

  overlay.click(function (e) {
    if ($(e.target).closest(".modal").length == 0) {
      $("body, html").removeClass("my-body-noscroll-class");
      $(".overlay").removeClass("history__overlay");
      $(".video-content iframe").remove();
      $(this).fadeOut();
      modal.fadeOut();
    }
  });

  modalClose.click(function () {
    $("body, html").removeClass("my-body-noscroll-class");
    $(".overlay").removeClass("history__overlay");
    $(".video-content iframe").remove();
    overlay.fadeOut();
    modal.fadeOut();
  });

  modalOpen.each(function () {
    $(this).on("click", function (e) {
      var modalId = $(this).attr("data-modal"),
        EachModal = $('.modal[data-modal="' + modalId + '"]');
      $("body, html").addClass("my-body-noscroll-class");

      if (this.getAttribute("data-src")) {
        let modalVideo = this.getAttribute("data-src");
        modalElem = document.querySelector(
          '.modal[data-modal="' + modalId + '"]'
        );
        $(modalElem)
          .find(".video-content")
          .html(
            '<iframe src="https://www.youtube.com/embed/' +
              modalVideo +
              '?frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
          );
      }

      if (this.getAttribute("data-title")) {
        let formTitle = this.getAttribute("data-title");
        EachModal.find(".form__name").val(formTitle);
      }

      if (modalId.substring(0, 4) == "case") {
        try {
          $('.modal[data-modal="' + modalId + '"]')
            .find(".case__left-main")
            .slick("refresh");
          $('.modal[data-modal="' + modalId + '"]')
            .find(".case__left-additional")
            .slick("refresh");
        } catch {
          console.log("modal slick refresh error");
        }
      }

      if (modalId.substring(0, 7) == "history") {
        try {
          $(".overlay").addClass("history__overlay");
        } catch {
          console.log("modal slick refresh error");
        }
      }

      $("#mobile__menu").removeClass("active");
      modal.fadeOut();
      overlay.fadeIn();

      overlay.scrollTop(0);

      EachModal.fadeIn();
    });
  });

  /** * Replace all SVG images with inline SVG */
  $("img.img-svg").each(function () {
    var $img = $(this);
    var imgID = $img.attr("id");
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("src");
    $.get(
      imgURL,
      function (data) {
        var $svg = $(data).find("svg");
        if (typeof imgID !== "undefined") {
          $svg = $svg.attr("id", imgID);
        }
        if (typeof imgClass !== "undefined") {
          $svg = $svg.attr("class", imgClass + " replaced-svg");
        }
        $svg = $svg.removeAttr("xmlns:a");
        $img.replaceWith($svg);
      },
      "xml"
    );
  });

  // Мобильное меню
  $(".header__menu-button").on("click", function (e) {
    $("#mobile__menu").toggleClass("active");
    $("body, html").addClass("my-body-noscroll-class");
  });
  $("#mobile__menu .menu__close").on("click", function (e) {
    $("#mobile__menu").toggleClass("active");
    $("body, html").removeClass("my-body-noscroll-class");
  });

  $('a[href^="#"]').click(function () {
    $("#mobile__menu").removeClass("active");
    $("body, html").removeClass("my-body-noscroll-class");
    let target = $(this).attr("href");
    let targetPosition = $(target).offset().top - 30;
    $("html, body").animate({ scrollTop: targetPosition }, 800);
    return false;
  });

  // Табы - вкладки
  $(".marriage__button").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
    $(".marriage__tab")
      .removeClass("active")
      .eq($(this).index())
      .addClass("active");
  });

  // Подсветка
  $(".thumbs__item").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
    $image_url = $(this).attr("data-img");
    $image_url_css = "url(" + $image_url + ")";
    $(".gallery__main").css("background-image", $image_url_css);
  });

  // function onSubmit(token) {
  // 	console.log('work ')
  // }

  // E-mail Ajax Send
  $(".forms").submit(function (event) {
    var th = $(this);

    $.ajax({
      type: "POST",
      url: "https://sspot.ru/b2b/telegram.php",
      data: th.serialize(),
    }).done(function () {});

    /* $.ajax({
      type: "POST",
      url: "https://sspot.ru/b2b/mail.php",
      data: th.serialize(),
    }).done(function () {}); */

    th.trigger("reset");

    if (th.hasClass("quiz")) {
      removeSteps();
      $(".quiz").addClass("step1");
    }

    $(".overlay").fadeIn();
    $(".modal").hide();
    $(".modal__thanks").show();

    return false;
  });

  //
  $(".item__subtitle-slider").slick({
    infinite: true,
    slidesToShow: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    // fade: true
  });

  // Команда
  $(".team__slider").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    prevArrow: ".team__box .slider-arrow.left",
    nextArrow: ".team__box .slider-arrow.right",
    dots: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $(".modal__award").lightGallery({
    thumbnail: false,
    download: false,
    selector: "a.award__img-box",
    mode: "lg-fade",
  });

  // Кейсы
  $(".case1 .case__left-main").slick({
    infinite: true,
    slidesToShow: 1,
    dots: false,
    fade: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: true,
          prevArrow: ".case1 .case-arrow.left",
          nextArrow: ".case1 .case-arrow.right",
        },
      },
    ],
  });
  $(".case2 .case__left-main").slick({
    infinite: true,
    slidesToShow: 1,
    dots: false,
    fade: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: true,
          prevArrow: ".case2 .case-arrow.left",
          nextArrow: ".case2 .case-arrow.right",
        },
      },
    ],
  });

  $(".case3 .case__left-main").slick({
    infinite: true,
    slidesToShow: 1,
    dots: false,
    fade: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: true,
          prevArrow: ".case3 .case-arrow.left",
          nextArrow: ".case3 .case-arrow.right",
        },
      },
    ],
  });

  // Тумбы
  if ($(window).width() > 767) {
    function decorParallax1() {
      var paralax = document.getElementById("paralax1");

      if (paralax) {
        /* коэфициент сдвига: 1 сдвиг равный смещению по оси Y, 0 без сдвига */
        var moveCoef = 0.3;

        window.addEventListener("scroll", scroll);
        window.addEventListener("resize", scroll);
        scroll();

        function scroll() {
          /* берём огнаничивающий прямоугольник паралакса относительно окна (фрейма) */
          var r = paralax.getBoundingClientRect();

          /* центр паралакса */
          var paralaxYCenter = r.y + r.height / 2;
          /* центр экрана */
          var scrollYCenter = window.innerHeight / 2;

          /* Вычисляем смещение */
          var move = (paralaxYCenter - scrollYCenter) * moveCoef;

          paralax.style.transform = "translateY(" + move + "px)";
        }
      }
    }

    function decorParallax2() {
      var paralax = document.getElementById("paralax2");

      if (paralax) {
        /* коэфициент сдвига: 1 сдвиг равный смещению по оси Y, 0 без сдвига */
        var moveCoef = -0.3;

        window.addEventListener("scroll", scroll);
        window.addEventListener("resize", scroll);
        scroll();

        function scroll() {
          /* берём огнаничивающий прямоугольник паралакса относительно окна (фрейма) */
          var r = paralax.getBoundingClientRect();

          /* центр паралакса */
          var paralaxYCenter = r.y + r.height / 2;
          /* центр экрана */
          var scrollYCenter = window.innerHeight / 2;

          /* Вычисляем смещение */
          var move = (paralaxYCenter - scrollYCenter) * moveCoef;

          paralax.style.transform = "translateY(" + move + "px)";
        }
      }
    }

    decorParallax1();
    decorParallax2();

    $(".case1 .case__left-additional").slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      prevArrow: ".case1 .case-arrow.left",
      nextArrow: ".case1 .case-arrow.right",
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 6,
          },
        },
      ],
    });
    $(".case2 .case__left-additional").slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      prevArrow: ".case2 .case-arrow.left",
      nextArrow: ".case2 .case-arrow.right",
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 6,
          },
        },
      ],
    });
    $(".case3 .case__left-additional").slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      prevArrow: ".case3 .case-arrow.left",
      nextArrow: ".case3 .case-arrow.right",
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 6,
          },
        },
      ],
    });
  }
  // Смена слайда по клику
  $(".case1 .case__left-additional .item").click(function (e) {
    e.preventDefault();
    var slideno = $(this).data("id");
    $(".case1 .case__left-main").slick("slickGoTo", slideno - 1);
  });
  $(".case2 .case__left-additional .item").click(function (e) {
    e.preventDefault();
    var slideno = $(this).data("id");
    $(".case2 .case__left-main").slick("slickGoTo", slideno - 1);
  });
  $(".case3 .case__left-additional .item").click(function (e) {
    e.preventDefault();
    var slideno = $(this).data("id");
    $(".case3 .case__left-main").slick("slickGoTo", slideno - 1);
  });

  // Кейсы попап
  $(".cases__slider").slick({
    centerMode: true,
    infinite: true,
    centerPadding: "28%",
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
    arrows: false,
    dots: false,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          centerPadding: "15%",
        },
      },
      {
        breakpoint: 767,
        settings: {
          centerPadding: "11%",
        },
      },
      {
        breakpoint: 575,
        settings: {
          centerMode: false,
          slidesToShow: 1,
          initialSlide: 1,
          dots: true,
        },
      },
    ],
  });

  // Планшеты и телефоны ниже
  if ($(window).width() < 991) {
    $(".minuses__box .item").click(function () {
      $(this).siblings(".item").removeClass("active");
      $(this).toggleClass("active");
    });

    // последний блок
    $(".compare__slider").slick({
      infinite: true,
      slidesToShow: 1,
      arrows: false,
      dots: true,
      autoplay: true,
      autoplaySpeed: 4000,
    });
  }

  // Больше планшета
  if ($(window).width() > 991) {
    // Сравнение до/после
    setTimeout(() => {
      $(".compare__box").twentytwenty({
        no_overlay: true,
        // default_offset_pct: 0.3
      });
    }, 2000);
  }

  $(".pc-map").attr(
    "src",
    "https://yandex.ru/map-widget/v1/?um=constructor%3Aca4c4092a24e5fff72510047a40776e8797636874ee2f612859b54edca746bec&amp;source=constructor"
  );

  // Телефоны
  if ($(window).width() < 575) {
    $(".relax__box.xs").slick({
      infinite: true,
      slidesToShow: 1,
      arrows: false,
      dots: true,
      // autoplay: true,
      // autoplaySpeed: 4000,
    });

    $(".exit__list").slick({
      infinite: false,
      slidesToShow: 1,
      arrows: false,
      dots: true,
      // autoplay: true,
      // autoplaySpeed: 4000,
    });

    $(".steps__box .item").on("click", function () {
      $(this).siblings().removeClass("active").find(".subtitle").slideUp();

      $(this).toggleClass("active");
      $(this).find(".subtitle").slideToggle();
    });

    $(".types__box .item").on("click", function () {
      $(this)
        .siblings()
        .removeClass("active")
        .find(".subtitle, .item__subtitle-slider")
        .slideUp();

      $(this).toggleClass("active");
      $(this).find(".subtitle, .item__subtitle-slider").slideToggle();
      $(".types__box .item__subtitle-slider").slick("refresh");
    });

    $(".awards__box").slick({
      infinite: true,
      arrows: false,
      dots: false,
      autoplay: true,
      autoplaySpeed: 4000,
      centerMode: true,
      slidesToShow: 1,
      centerPadding: "18%",
    });

    $(".example__slider").slick({
      infinite: false,
      slidesToShow: 1,
      dots: true,
      arrows: false,
    });

    $(".video__text").slick({
      infinite: false,
      slidesToShow: 1,
      dots: true,
      arrows: false,
    });

    $(".mounting__box").slick({
      infinite: false,
      slidesToShow: 1,
      dots: true,
      arrows: false,
    });

    $(".example__list .item").click(function () {
      $(this).toggleClass("active");
    });

    $(".for__box .item").click(function () {
      $(this).siblings(".item").removeClass("active");
      $(this).toggleClass("active");
    });
  }

  // квиз
  function goToNextStep() {
    if ($(".quiz").hasClass("step5")) {
      $(".question5 input").each(function () {
        if ($(this).prop("checked")) {
          removeSteps();
          $(".quiz").addClass("step_form");
        }
      });
    }
    if ($(".quiz").hasClass("step4")) {
      $(".question4 input").each(function () {
        if ($(this).prop("checked")) {
          removeSteps();
          $(".quiz").addClass("step5");
        }
      });
    }
    if ($(".quiz").hasClass("step3")) {
      $(".question3 input").each(function () {
        if ($(this).prop("checked")) {
          removeSteps();
          $(".quiz").addClass("step4");
        }
      });
    }
    if ($(".quiz").hasClass("step2")) {
      $(".question2 input").each(function () {
        if ($(this).prop("checked")) {
          removeSteps();
          $(".quiz").addClass("step3");
        }
      });
    }
    if ($(".quiz").hasClass("step1")) {
      $(".question1 input").each(function () {
        if ($(this).prop("checked")) {
          removeSteps();
          $(".quiz").addClass("step2");
        }
      });
    }
  }

  $(".quiz__buttons .prev").on("click", function (e) {
    if ($(".quiz").hasClass("step2")) {
      removeSteps();
      $(".quiz").addClass("step1");
    }
    if ($(".quiz").hasClass("step3")) {
      removeSteps();
      $(".quiz").addClass("step2");
    }
    if ($(".quiz").hasClass("step4")) {
      removeSteps();
      $(".quiz").addClass("step3");
    }
    if ($(".quiz").hasClass("step5")) {
      removeSteps();
      $(".quiz").addClass("step4");
    }
  });

  $(".quiz__buttons .next").on("click", function (e) {
    goToNextStep();
  });

  $(".quiz__question input[type='radio']").on("change", function (e) {
    setTimeout(function () {
      goToNextStep();
    }, 250);
  });

  function removeSteps() {
    $(".quiz")
      .removeClass("step1")
      .removeClass("step2")
      .removeClass("step3")
      .removeClass("step4")
      .removeClass("step5")
      .removeClass("step_form");
  }

  $(".events__slider").slick({
    infinite: true,
    slidesToShow: 1,
    arrows: true,
    dots: false,
    prevArrow: ".events__box .events__arrow.left",
    nextArrow: ".events__box .events__arrow.right",
    fade: true,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          fade: false,
        },
      },
    ],
  });

  $(".technology__slider").slick({
    infinite: true,
    slidesToShow: 1,
    arrows: false,
    dots: true,
    fade: true,
  });

  $(".history__slider").slick({
    infinite: true,
    slidesToShow: 1,
    arrows: true,
    dots: false,
    fade: true,
    // autoplay: true,
    // autoplaySpeed: 4000,
    prevArrow: ".history__arrows  .left",
    nextArrow: ".history__arrows  .right",
    responsive: [
      {
        breakpoint: 575,
        settings: {
          fade: false,
          dots: true,
        },
      },
    ],
  });
});
