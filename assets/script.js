// Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the html.
$(function () {
  var today = dayjs();
  var container = $("#container-lg");
  var hours = [today.format("H")];
  var hour = parseInt(hours);
  var count = $("#container-lg").children().length;
  display();

  //display the current date in the header of the page.
  updateClock();
  function updateClock() {
    setInterval(function () {
      var today = dayjs();
      $("#currentDay").text(today.format("MMM D, YYYY h:mm:ss a"));
    }, 1000);
  }

  // display saved times in the appropiate boxes
  function display() {
    const saved = JSON.parse(localStorage.getItem("data")) || [];
    saved.forEach((entry) => {
      $("#" + entry.child)
        .children("textarea")
        .text(entry.user);
    });
  }

  // Apply the past, present, or future class to each time block
  for (var i = 0; i < count; i++) {
    if ([i + 9] > hour) {
      $(container.children("div")[i]).addClass("future");
    }
    if ([i + 9] < hour) {
      $(container.children("div")[i]).addClass("past");
    }
    if ([i + 9] == hour) {
      $(container.children("div")[i]).addClass("present");
    }
  }
  //listener for click events on the save button. save the user input in local storage.
  $(".fa-save").on("click", function (e) {
    e.preventDefault();
    var selectedDiv = $(this).parent().parent().attr("id");
    var input = $("#" + selectedDiv)
      .children("textarea")
      .val();
    const saved = JSON.parse(localStorage.getItem("data")) || [];
    saved.push({ user: input, child: selectedDiv });
    localStorage.setItem("data", JSON.stringify(saved));
    display();
  });
});
//
