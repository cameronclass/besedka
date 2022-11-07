$(document).ready(() => {
  const configureImg = $(".configure-section-img");
  const configureForm = $('[name="configure-form"]');

  const typeCover = $('[name="typeCover"]').dropdown();
  const colorCarcas = $('[name="colorCarcas"]').dropdown();
  const colorCover = $('[name="colorCover"]').dropdown();
  const wall = $('[name="wall"]');
  const light = $('[name="light"]');
  const hello = $(".hello");

  function generateURL(type, carcas, color, light) {
    if ($('[name="light"]').prop("checked")) {
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
    /* console.log(imgURL); */
    setSrc(imgURL);
  }

  function getData(item, data) {
    return item.parent().find(".item").filter(".active").data(data);
  }

  function setSrc(variable) {
    configureImg.attr("src", variable);
  }

  configureForm.change(function () {
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

});
