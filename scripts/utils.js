
function toggleAnswer(questionElement) {
    const answer = questionElement.nextElementSibling;

    // Toggle answer visibility and icon change
    answer.classList.toggle("visible");
    questionElement.classList.toggle("expanded");
}

// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}