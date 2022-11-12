var checkout = {};

$(document).ready(function () {
  function callChatbotApi(message) {
    // params, body, additionalParams
    console.log("this", message);
    return sdk.searchGet({ q: message }, {}, {});
  }

  function insertMessage() {
    msg = $(".message-input").val();
    console.log(msg)
    if ($.trim(msg) == "") {
      return false;
    }

    callChatbotApi(msg)
      .then((response) => {
        console.log("response", response.data);
        var data = response.data;

        if (data && data.length > 0) {
          console.log("received " + data.length + " images");

          var images = data;
          $(".photos").replaceWith("<div class='photos'></div>");

          for (var image of images) {
            $(
              '<img style="width: 150px" src="data:image/png;base64, ' +
                image +
                '"/>'
            ).appendTo($(".photos"));
          }
        } else {
          $(".photos").replaceWith("<div class='photos'></div>");
          $("<p style='font-size: 16px'> No pictures found! </p>").appendTo(
            $(".photos")
          );
        }
      })
      .catch((error) => {
        console.log("an error occurred", error);
      });
  }

  $(".message-submit").click(function () {
    insertMessage();
  });

  $(window).on("keydown", function (e) {
    if (e.which == 13) {
      insertMessage();
      return false;
    }
  });
});
