function redirect() {
  window.location.href = "artform.html";
}

var sections = document.getElementsByClassName("section");
var currentSectionIndex = 1;

function showNextSection() {
  if (currentSectionIndex < sections.length - 1) {
    sections[currentSectionIndex].classList.remove("active");
    currentSectionIndex++;
    sections[currentSectionIndex].classList.add("active");
  }
}

sections[currentSectionIndex].classList.add("active");

