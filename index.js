//Current line
var CurrentId = undefined;

var inputValues = [];
var bandName = "";
const inputPrompts = ["What's your pet's name?"];
let isFirstClick = true;
let isOn = true;

//Click Run
$(document).ready(function () {
  $("#run-button").click(function () {
    isOn = true;
    inputValues = [];
    var bandName = "";
    $("#Content").empty();
    NewLine("Welcome to the Band Name Generator.", false);
    NewLine("What's the name of the city you grew up in?", true);
  });
});

//Enter button
$(document).on("keydown", function (e) {
  var x = event.which || event.keyCode;
  if (x == 13 && isOn) {
    var consoleLine = $("#" + CurrentId + " input").val();

    console.log(consoleLine);
    bandName += ` ${consoleLine}`;
    inputValues.push({ id: CurrentId, val: consoleLine });

    console.log(inputValues);

    if (inputValues.length > inputPrompts.length) {
      console.log("called");
      NewLine("Your band name could be " + bandName, false);

      $(".console-carrot").remove();
      isOn = false;
      return;
    }

    $(".console-carrot").remove();

    NewLine(inputPrompts[inputValues.length - 1], true);
    // setTimeout(NewLine, delay);
  }
});
$(document).on("keydown", function (e) {
  var x = event.which || event.keyCode;
  var line = $("#" + CurrentId + " input");
  var length = line.val().length;
  if (x != 8) {
    line.attr("size", 1 + length);
  } else {
    line.attr("size", length * 0.95);
  }
  if (length === 0) {
    $("#" + CurrentId + " input").attr("size", "1");
  }
});
$(document).on("click", function (e) {
  $("#" + CurrentId + " input").focus();
});

//New line
function NewLine(text, isPrompt) {
  if (CurrentId !== undefined) {
    $("#" + CurrentId + " input").prop("disabled", true);
  }
  CurrentId = "consoleInput-" + GenerateId();

  if (isPrompt) {
    //New line input
    $("#Content").append("<div>" + text + "</div>");
    $("#Content").append(
      '<div id="' +
        CurrentId +
        '">' +
        '<input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" type="text" class="terminal-input" /><div class="console-carrot"></div></div>'
    );
    $("#" + CurrentId + " input").focus();
    $("#" + CurrentId + " input").attr("size", "1");
  } else {
    $("#Content").append('<div id="' + CurrentId + '">' + text + "</div>");
  }
}

function GenerateId() {
  return Math.random().toString(16).slice(2);
}
