const selectedCharacter = document.getElementById("selected-character");
const characterListItems = document.querySelectorAll(".character-list li");

// Function to select a random character
function selectRandomCharacter() {
  // Get a random character list item
  const randomIndex = Math.floor(Math.random() * characterListItems.length);
  const selectedCharacterListItem = characterListItems[randomIndex];

  // Add 'selected' class to selected character's li element
  selectedCharacterListItem.classList.add("selected");

  // Remove 'blink' class from all other li elements
  characterListItems.forEach((item) => {
    if (item !== selectedCharacterListItem) {
      item.classList.add("blink");
    }
  });

  // Update selected character element with image and name
  const selectedCharacterName =
    selectedCharacterListItem.querySelector("input").value;
  const selectedCharacterImage =
    selectedCharacterListItem.querySelector("img").src;
  selectedCharacter.innerHTML = `<img src="${selectedCharacterImage}" alt="${selectedCharacterName}"><span>${selectedCharacterName}</span>`;

  // Change background image based on selected character
  /*changeBackgroundImage(selectedCharacterName);*/
}

// Function to change the background image based on character selection
/*function changeBackgroundImage(characterName) {
  const body = document.querySelector("body");
  body.style.backgroundImage = `url(${characterName}.jpg)`;
}*/

// Function to start blinking animation
function startBlinking() {
  // Add 'blink' class to all character labels
  characterListItems.forEach((item) => {
    item.querySelector("label").classList.add("blink");
  });
}

// Function to stop blinking animation
function stopBlinking() {
  // Remove 'blink' class from all character labels except selected one
  const selectedCharacterListItem = document.querySelector(
    ".character-list li.selected"
  );
  characterListItems.forEach((item) => {
    if (item !== selectedCharacterListItem) {
      item.querySelector("label").classList.remove("blink");
    }
  });
}

// Function to open character page on enter key press
function handleKeyPress(event) {
  if (event.keyCode === 13) {
    const selectedCharacterListItem = document.querySelector(
      ".character-list li.selected"
    );
    const selectedCharacterName =
      selectedCharacterListItem.querySelector("input").value;
    window.location.href = `${selectedCharacterName}.html`;
  }
}

// Add event listener to character list for radio button click
document.querySelector(".character-list").addEventListener("click", (event) => {
  if (event.target.tagName === "INPUT") {
    selectRandomCharacter();
    stopBlinking();
  }
});

// Start blinking animation
startBlinking();

// Stop blinking after 5 seconds and select random character
setTimeout(() => {
  stopBlinking();
  selectRandomCharacter();
}, 5000);

// Add event listener to document for enter key press
document.addEventListener("keydown", handleKeyPress);