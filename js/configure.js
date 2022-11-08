$(document).ready(() => {
  const configureImg = $(".configure-section-img");
  const configureForm = $(".configure-section__form");

  const typeCover = $(".typeCover");
  const colorCover = $(".colorCover");
  const colorCarcas = $(".colorCarcas");

  const wall = $(".wall-input");
  const light = $(".light-input");

  function generateURL(type, carcas, color, light) {
    if ($(".light-input").prop("checked")) {
      light = "light";
    } else {
      light = "normal";
    }

    if (type == "") {
      type = "pvx";
    }
    if (carcas == "") {
      carcas = "brown";
    }
    if (color == "") {
      color = "main";
    }

    let imgURL =
      "img/renders/" + type + "/" + carcas + "/" + light + "/" + color + ".png";
    console.log(imgURL);
    setSrc(imgURL);
  }

  function getData(item, data) {
    return item.parent().find(".item").filter(".active").data(data);
  }

  function setSrc(variable) {
    configureImg.attr("src", variable);
  }

  function formConfigure() {
    if (typeCover.val() == "steklo") {
      typeCover.val("Стекло");
    }
    if (typeCover.val() == "pvx") {
      typeCover.val("ПВХ");
    }
    if (typeCover.val() == "cerepisa") {
      typeCover.val("Черепица");
    }

    if (colorCover.val() == "brown") {
      colorCover.val("Коричневый");
    }
    if (colorCover.val() == "grey") {
      colorCover.val("Серый");
    }
    if (colorCover.val() == "green") {
      colorCover.val("Зеленый");
    }
    if (colorCover.val() == "bronze") {
      colorCover.val("Бронза");
    }
    if (colorCover.val() == "silver") {
      colorCover.val("Серебро");
    }
    if (colorCover.val() == "transparent") {
      colorCover.val("Прозрачный");
    }
    if (colorCover.val() == "white") {
      colorCover.val("Белый");
    }

    if (colorCarcas.val() == "brown") {
      colorCarcas.val("Коричневый");
    }
    if (colorCarcas.val() == "grey") {
      colorCarcas.val("Серый");
    }

    /* if (light.prop("checked")) {
      light.val("Да");
    } else {
      light.val("Нет");
    }

    if (wall.prop("checked")) {
      wall.val("Да");
    } else {
      wall.val("Нет");
    } */
  }

  function changeTypeCarcas() {
    let dataTypeCover = getData(typeCover, "cover");
    let items = colorCover.parent().find(".item");
    items.each(function () {
      this.classList.add("d-none");
      if ($(this).data("cover") == dataTypeCover) {
        this.classList.remove("d-none");
      }
    });
  }

  configureForm.change(function () {
    setTimeout(() => {
      let typeURL = typeCover.val();
      let carcasURL = colorCarcas.val();
      let coverURL = colorCover.val();

      generateURL(typeURL, carcasURL, coverURL);

      changeTypeCarcas();
    }, 50);
  });

  typeCover.change(function () {
    setTimeout(() => {
      $(".configure-section__dropdown_color").dropdown("clear");
      light.prop("checked", false);
      wall.prop("checked", false);
    }, 50);
  });

  configureForm.submit(function (event) {
    formConfigure();

    var th = $(this);

    $.ajax({
      type: "POST",
      url: "https://sspot.ru/b2b/telegram.php",
      data: th.serialize(),
    }).done(function () {});

    $.ajax({
      type: "POST",
      url: "https://sspot.ru/b2b/mail.php",
      data: th.serialize(),
    }).done(function () {});

    th.trigger("reset");

    $(".overlay").fadeIn();
    $(".modal").hide();
    $(".modal__thanks").show();

    let typeURL = typeCover.val("");
    let carcasURL = colorCarcas.val("");
    let coverURL = colorCover.val("");
    generateURL(typeURL, carcasURL, coverURL);

    $(".configure-section__dropdown").dropdown("clear");
    $(".configure-section__dropdown_color").dropdown("clear");
    light.prop("checked", false);
    wall.prop("checked", false);

    return false;
  });
});
