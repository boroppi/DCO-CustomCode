function TestLoad() {
  console.log("CustomScript file loaded");
}

// Add event listener to wrapper-for-linkButtons css class
(function() {
  let aLinks = document.querySelectorAll(
    'a[onmousehover*="openCalloutContent"]'
  );

  aLinks.forEach(aLink => {
    aLink.addEventListener("mouseup", handleMouseDown);
    console.log(aLink);
  });
})();

function handleMouseUp(event) {
  console.log(event.target);
  let parent = getClosest(event.target, ".dropdown-content");
  console.log(parent);
  toggleElementDisplay(parent);
}

/**
 * Toggle element display after 100ms and bring it back after some time
 * @param element
 */
function toggleElementDisplay(element) {
  setTimeout(() => {
    element.style.display === "none"
      ? (element.style.display = "")
      : (element.style.display = "none");
  }, 100);

  setTimeout(() => {
    element.style.display === "none"
      ? (element.style.display = "")
      : (element.style.display = "none");
  }, 150);
}

/**
 * Find closest parent element with given selector
 * @param elem
 * @param selector
 */
var getClosest = function(elem, selector) {
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
  }

  // Get the closest matching element
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
