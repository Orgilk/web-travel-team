function autoSlide() {
    setInterval(() => {
        slide(getItemActiveIndex() + 1); // Move to the next index
    }, 3000); // Change image every 3 seconds
}

function slide(toIndex) {
    const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
    const itemActive = document.querySelector(".carousel_item__active");

    if (toIndex >= itemsArray.length) {
        toIndex = 0; // Loop back to the first item if we reach the end
    }

    const newItemActive = itemsArray[toIndex];

    // Apply transition classes
    newItemActive.classList.add("carousel_item__pos_next");
    setTimeout(() => {
        newItemActive.classList.add("carousel_item__next");
        itemActive.classList.add("carousel_item__next");
    }, 20);

    // Remove transition classes and switch active class
    newItemActive.addEventListener("transitionend", () => {
        itemActive.className = "carousel_item"; // Reset the previous active item
        newItemActive.className = "carousel_item carousel_item__active"; // Mark the new item as active
    }, {
        once: true
    });
}

function getItemActiveIndex() {
    const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
    const itemActive = document.querySelector(".carousel_item__active");
    return itemsArray.indexOf(itemActive);
}
