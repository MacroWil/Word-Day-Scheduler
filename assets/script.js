// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var today = dayjs();
  var container = $("#container-lg");
  display();
  // TODO: Add code to display the current date in the header of the page.
  updateClock();
  function updateClock() {
    setInterval(function () {
      var today = dayjs();
      $("#currentDay").text(today.format("MMM D, YYYY h:mm:ss a"));
    }, 1000);
  }
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  $(".fa-save").on("click", function (e) {
    e.preventDefault();
    var selectedDiv = $(this).parent().parent().attr("id");
    console.log(selectedDiv);

    var input = $("#" + selectedDiv)
      .children("textarea")
      .val();
    console.log(input);
    const saved = JSON.parse(localStorage.getItem("data")) || [];
    saved.push({ user: input, child: selectedDiv });

    localStorage.setItem("data", JSON.stringify(saved));
    display();
  });

  function display() {
    const saved = JSON.parse(localStorage.getItem("data")) || [];
    saved.forEach((entry) => {
      $("#" + entry.child)
        .children("textarea")
        .text(entry.user);
    });
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var hours = [today.format("H")];
  var hour = parseInt(hours);
  var count = $("#container-lg").children().length;
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
});
//
