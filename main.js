const scrollAmount = 300;

function scrollleft() {
    const carousel = document.querySelector('.carousel-track');
    if (carousel) {
        console.log("scroll left");
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        console.error("Carousel not found!");
    }
}

function scrollRight() {
    const carousel = document.querySelector('.carousel-track');
    if (carousel) {
        console.log("scroll right");
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
        console.error("Carousel not found!");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Get toggle button and navbar collapse section
    const toggleButton = document.querySelector('.navbar-toggle');
    const navbarCollapse = document.getElementById('navbarNav');

    if (toggleButton && navbarCollapse) {
        // Toggle the navbar collapse when the button is clicked
        toggleButton.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                // If navbar is already visible, slide up to hide it
                $(navbarCollapse).slideUp(400, function() {
                    navbarCollapse.classList.remove('show');
                    navbarCollapse.style.display = '';
                });
            } else {
                // If navbar is hidden, slide down to show it
                $(navbarCollapse).hide().addClass('show').slideDown(400);
            }
        });

        // Optional: Close the navbar when a link is clicked (for mobile views)
        document.querySelectorAll('.navbar-nav .nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) { // Only on small screens
                    $(navbarCollapse).slideUp(400, function() {
                        navbarCollapse.classList.remove('show');
                        navbarCollapse.style.display = '';
                    });
                }
            });
        });
    }
});

function toggleAnswer(questionElement) {
    const answer = questionElement.nextElementSibling;

    // Toggle answer visibility and icon change
    answer.classList.toggle("visible");
    questionElement.classList.toggle("expanded");
}



