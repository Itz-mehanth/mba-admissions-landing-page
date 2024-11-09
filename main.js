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

// Function to animate the graph curve
function animateGraph() {
    const ctx = document.getElementById('progressGraph').getContext('2d');
    const graphData = [0, 25, 45, 60, 80, 95, 100];
    let currentIndex = 0;

    // Animate the graph
    function drawGraph() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear canvas
        ctx.beginPath();
        ctx.moveTo(0, ctx.canvas.height - graphData[0]);

        for (let i = 0; i <= currentIndex; i++) {
            const x = (i / (graphData.length - 1)) * ctx.canvas.width;
            const y = ctx.canvas.height - (graphData[i] / 100) * ctx.canvas.height;
            ctx.lineTo(x, y);
        }

        ctx.strokeStyle = '#9400d3';
        ctx.lineWidth = 3;
        ctx.stroke();

        if (currentIndex < graphData.length - 1) {
            currentIndex++;
            setTimeout(drawGraph, 500); // Delay for next frame
        }
    }

    drawGraph();
}

document.addEventListener("DOMContentLoaded", function() {
    // Navbar toggle for mobile view
    const toggleButton = document.querySelector('.navbar-toggle');
    const navbarCollapse = document.getElementById('navbarNav');

    if (toggleButton && navbarCollapse) {
        // Toggle navbar visibility on button click
        toggleButton.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                $(navbarCollapse).slideUp(400, function() {
                    navbarCollapse.classList.remove('show');
                });
            } else {
                $(navbarCollapse).slideDown(400, function() {
                    navbarCollapse.classList.add('show');
                });
            }
        });

        // Close navbar on link click in mobile view
        document.querySelectorAll('.navbar-nav .nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992 && navbarCollapse.classList.contains('show')) {
                    $(navbarCollapse).slideUp(400, function() {
                        navbarCollapse.classList.remove('show');
                    });
                }
            });
        });
    }


    // Universal Intersection Observer for animation on view
    const observedElements = [
        ...document.querySelectorAll('.slideUpFastEaseOut'),  // Fast slide-up ease-out animation elements
        ...document.querySelectorAll('.card'),                // Step elements with slide-in animation
        ...document.querySelectorAll('.slide-in')                 // Step elements with slide-in animation
    ];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if(entry.target.classList.contains('card')){
                    entry.target.classList.add('rotate'); 
                }
                else if(entry.target.classList.contains('slide-in')){
                    entry.target.classList.add('slide-in-active');
                }
                else if(entry.target.classList.contains('slideUpFastEaseOut')){
                    console.log("Sliding up fast");
                    
                    entry.target.classList.add('in-view');
                }
            } else {
                if(entry.target.classList.contains('card')){
                    entry.target.classList.remove('rotate'); // Reset when out of view    
                }
                else if(entry.target.classList.contains('slide-in')){
                    entry.target.classList.remove('slide-in-active'); // Reset when out of view    
                }
                else if(entry.target.classList.contains('slideUpFastEaseOut')){
                    entry.target.classList.add('in-view');
                }
            }
        });
    }, { threshold: 0.3 }); // Adjust threshold as needed

    // Observe each element
    observedElements.forEach(element => observer.observe(element));

    //addEventListener for placement stats
    const counters = document.querySelectorAll(".counter");

    const startCounting = (counter) => {
        const target = parseFloat(counter.getAttribute("data-target"));
        const suffix = counter.getAttribute("data-suffix") || "";
        const useDecimal = counter.getAttribute("data-decimal") === "true"; // Check if decimals are needed
        let current = 0;
        const increment = target / 100;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.innerText = useDecimal
                    ? `${current.toFixed(1)}${suffix}` // Display one decimal place
                    : `${Math.floor(current)}${suffix}`; // Display integer value
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = useDecimal
                    ? `${target.toFixed(1)}${suffix}`
                    : `${Math.round(target)}${suffix}`;
            }
        };

        updateCounter();
    };

    const observerOptions = {
        root: null,
        threshold: 0.1
    };

    const countobserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                startCounting(entry.target); // Start the counter when in view
            } else {
                entry.target.innerText = `0${entry.target.getAttribute("data-suffix") || ""}`; // Reset with suffix
            }
        });
    }, observerOptions);

    counters.forEach((counter) => {
        countobserver.observe(counter);
    });
});


function toggleAnswer(questionElement) {
    const answer = questionElement.nextElementSibling;

    // Toggle answer visibility and icon change
    answer.classList.toggle("visible");
    questionElement.classList.toggle("expanded");
}

// JavaScript for drag-to-scroll functionality
const carousel = document.querySelector('.carousel');

let isDown = false;
let startX;
let scrollLeft;

carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.classList.add('active');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.classList.remove('active');
});

carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.classList.remove('active');
});

carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return; // stop the function if not holding mouse down
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed
    carousel.scrollLeft = scrollLeft - walk;
});

// JavaScript for window addEventListener
window.addEventListener('scroll', () => {
    const steps = document.querySelectorAll('.step');
    const progressLine = document.querySelector('.progress-line');
    const admissionSection = document.querySelector('#admission_process');

    // Calculate the top and bottom positions of the admission section
    const sectionTop = admissionSection.getBoundingClientRect().top + window.scrollY;
    const sectionBottom = sectionTop + admissionSection.offsetHeight;

    // Variable to track the maximum height for the progress line
    let maxHeight = 0;

    // Animate progress line only when scrolling within the admission section
    if (window.scrollY + window.innerHeight > sectionTop && window.scrollY < sectionBottom) {
        steps.forEach((step) => {
            const rect = step.getBoundingClientRect();
            const stepTop = rect.top + window.scrollY;
            
            if (rect.top < window.innerHeight / 1.3 && rect.bottom > 0) {
                // Add active class to steps that are in view
                step.classList.add('active');
                // Update the maxHeight based on step visibility within the section
                maxHeight = Math.max(maxHeight, stepTop - sectionTop);
            } else {
                // Remove active class if step is out of view
                step.classList.remove('active');
            }
        });

        // Set the height of the progress line with a limit of the section height
        progressLine.style.height = `${Math.min(maxHeight, admissionSection.offsetHeight)}px`;
    } else {
        // Reset the progress line if scrolled out of the section
        progressLine.style.height = `0px`;
        steps.forEach((step) => {
            step.classList.remove('active'); // Clear active state from all steps
        });
    }

    // Function to trigger the cards' animation on scroll
    const items = document.querySelectorAll('.specializations');
    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
});

// Scroll event listener for metrics and graph
window.addEventListener('scroll', () => {
    document.querySelectorAll('.metric').forEach((metric) => {
        if (isInViewport(metric)) {
            // Animate the circle
            const circleProgress = metric.querySelector('.circle-progress');
            const percentage = parseInt(metric.querySelector('.value').innerText);
            const offset = 283 - (283 * percentage) / 100;
            circleProgress.style.strokeDashoffset = offset;

            // Animate the upward-facing bar
            const bar = metric.querySelector('.loading-bar');
            bar.setAttribute("data-visible", "true");
        } else {
            // Reset animations if out of view
            metric.querySelector('.circle-progress').style.strokeDashoffset = 283;
            metric.querySelector('.loading-bar').removeAttribute("data-visible");
        }
    });

    // Animate the graph if it's in the viewport
    const graph = document.querySelector('.graph-container canvas');
    if (isInViewport(graph)) {
        animateGraph();
    }
});






