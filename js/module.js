window.onload = () => {
  const popupClass = document.querySelectorAll(".div--achievedPopup");
  popupClass.forEach((el) => {
    el.onanimationend = () => {
      setTimeout(() => {
        el.style.display = "none";
      }, 1000);
    };
  });
};

async function checkExAnswer(exerciseID, segmentID) {
  var url = `api/api-check-exercise.php?exID=${exerciseID}`;
  var oForm = document.querySelector("#form--exercise");
  var jConnection = await fetch(url, {
    method: "POST",
    body: new FormData(oForm),
  });
  var exResult = await jConnection.text();

  if (exResult !== "correct") {
    exFeedback.innerHTML = "Sorry, you're answer was incorrect. Try again.";
    exFeedback.classList.add("wrongAnswer");
    exFeedback.style.display = "block";
  }

  if (exResult === "correct") {
    exFeedback.innerHTML = "You're answer was correct!";
    exFeedback.classList.remove("wrongAnswer");
    exFeedback.style.display = "block";
    completeSegment(segmentID);
  }
}

async function completeSegment(segmentID) {
  var url = `api/api-complete-segment.php?segID=${segmentID}`;
  var jConnection = await fetch(url);
  var achPopupHTML = await jConnection.text();
  divAchPopups.innerHTML = achPopupHTML;
  $("#moduleOverview").load(location.href + " #moduleOverview>*", "");
}

async function toggleBookmark(userID, segmentID) {
  var url = `api/api-toggle-bookmark.php?segID=${segmentID}`;
  var jConnection = await fetch(url);
  const bookmarkStatus = await jConnection.text();
  bookmarkStatus === "created"
    ? (pBookmarkText.innerHTML = "Saved")
    : (pBookmarkText.innerHTML = "Save for later");

  divBookmarkBtn.classList.toggle("bookmarked");
}

var iframe = document.getElementById("segmentIframe");

// Adjusting the iframe height onload event
// iframe.onload = function () {
//   // iframe.style.height = iframe.contentWindow.document.body.scrollHeight + "px";
// };
