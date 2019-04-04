"use strict";

function TestLoad() {
  console.log("CustomScript file loaded");
}

// Add event listener to all a elements with onmousehover attribute contains openCalloutContent value
(function() {
  //get the a elements
  var aLinks = document.querySelectorAll(
    'a[onmouseover*="openCalloutContent"]'
  ); // loop through them and add an event listener for mouseup event

  for (var i = 0; i < aLinks.length; i++) {
    aLinks[i].addEventListener("mouseup", handleMouseUp);
  }
})(); // this function is called when mouseup event is triggered for a elements
// It then runs the function that toggles the display for mega menu content for that specific a element

function handleMouseUp(event) {
  console.log(event.target);
  var parent = getClosest(event.target, ".dropdown-content");
  console.log(parent);
  toggleElementDisplay(parent);
}

/**
 * Toggle element display after 100ms and bring it back after some time
 * @param element
 */

function toggleElementDisplay(element) {
  // The first setTimeout method will run first and the next one after that
  // to bring back the mega menu content
  setTimeout(function() {
    element.style.display === "none"
      ? (element.style.display = "")
      : (element.style.display = "none");
  }, 100);
  setTimeout(function() {
    element.style.display === "none"
      ? (element.style.display = "")
      : (element.style.display = "none");
  }, 400);
}

/**
 * Find closest parent element with given selector
 * @param elem
 * @param selector
 */

var getClosest = function getClosest(elem, selector) {
  // Element.matches() polyfill for
  // For Browser support
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;

        while (--i >= 0 && matches.item(i) !== this) {}

        return i > -1;
      };
  } // Get the closest matching element

  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem;
  }

  return null;
};

function closeCalloutContents() {
  // Get all elements with class="tabcontent" and hide them
  var i, tabcontent;

  tabcontent = document.getElementsByClassName("submenuCalloutContent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
}
function openCalloutContent(evt, elName) {
  // Declare all variables
  var i, tabcontent;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("submenuCalloutContent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(elName).style.display = "block";
  //evt.currentTarget.className += " active";
}

var menuHidden = false;
function hideHeader() {
  try {
    var url = window.location.href;
    if (url.indexOf("rptpg=true") > -1) {
      updateHeaderVisibility("none");
      menuHidden = true;
    } else if (menuHidden) {
      updateHeaderVisibility("block");
      menuHidden = false;
    }
  } catch (err) {
    console.log("Error in hideHeader: " + err);
  }
}
function updateHeaderVisibility(disp) {
  var mytop = document.querySelectorAll("[data-sp-placeholder='Top']")[0];
  if (mytop) {
    mytop.style.display = disp;
  }
  var sptop = document.getElementById("SuiteNavPlaceHolder");
  if (sptop) {
    sptop.style.display = disp;
  }
}
setTimeout(hideHeader, 200);
