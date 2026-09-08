/* =========================================================
MUSE AHMED AFRAH — PREMIUM PORTFOLIO
Complete JavaScript
Designed for the provided HTML + CSS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

```
/* =====================================================
   01. SELECT ELEMENTS
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");

const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");

const profileImages = document.querySelectorAll(".profile-image");



/* =====================================================
   02. MOBILE NAVIGATION
===================================================== */

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        const isOpen = navLinks.classList.contains("show");

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close Menu" : "Open Menu"
        );

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });


    /* Close menu after clicking a navigation link */

    navItems.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");

            menuToggle.setAttribute(
                "aria-label",
                "Open Menu"
            );

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", (event) => {

        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedMenuButton &&
            navLinks.classList.contains("show")
        ) {

            navLinks.classList.remove("show");

            menuToggle.setAttribute(
                "aria-label",
                "Open Menu"
            );

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        }

    });

}



/* =====================================================
   03. DARK / LIGHT THEME
===================================================== */

if (themeToggle) {

    const savedTheme =
        localStorage.getItem("museAfrahTheme");

    if (savedTheme === "light") {

        document.body.classList.add("light-theme");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark theme"
        );

    } else {

        themeToggle.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light theme"
        );

    }


    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        const isLight =
            document.body.classList.contains("light-theme");


        if (isLight) {

            themeToggle.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark theme"
            );

            localStorage.setItem(
                "museAfrahTheme",
                "light"
            );

        } else {

            themeToggle.innerHTML =
                '<i class="fa-solid fa-moon"></i>';

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light theme"
            );

            localStorage.setItem(
                "museAfrahTheme",
                "dark"
            );

        }

    });

}



/* =====================================================
   04. PROFILE IMAGE SLIDER
===================================================== */

if (profileImages.length > 1) {

    let currentProfile = 0;

    profileImages.forEach((image, index) => {

        image.classList.toggle(
            "active",
            index === 0
        );

    });


    const changeProfile = () => {

        profileImages[currentProfile]
            .classList.remove("active");

        currentProfile =
            (currentProfile + 1) % profileImages.length;

        profileImages[currentProfile]
            .classList.add("active");

    };


    setInterval(changeProfile, 4500);

}



/* =====================================================
   05. ACTIVE NAVIGATION ON SCROLL
===================================================== */

const updateActiveNavigation = () => {

    let currentSection = "";

    const scrollPosition =
        window.scrollY + 180;


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navItems.forEach(link => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (
            href === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

};


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

updateActiveNavigation();



/* =====================================================
   06. SMOOTH SCROLLING
===================================================== */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener("click", event => {

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {

            return;

        }


        const target =
            document.querySelector(targetId);

        if (!target) {

            return;

        }


        event.preventDefault();


        const header =
            document.querySelector(".header");

        const headerHeight =
            header
                ? header.offsetHeight
                : 0;


        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            10;


        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});



/* =====================================================
   07. SCROLL REVEAL ANIMATION
===================================================== */

const revealElements = document.querySelectorAll(
    ".section-title, " +
    ".about-content, " +
    ".about-visual, " +
    ".education-card, " +
    ".skills-category, " +
    ".featured-project-container, " +
    ".project-card, " +
    ".experience-card, " +
    ".certification-card, " +
    ".contact-card, " +
    ".contact-cv"
);


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(35px)";

    element.style.transition =
        "opacity .75s ease, transform .75s ease";

});


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =====================================================
   08. STAGGER PROJECT / SKILL CARDS
===================================================== */

const staggerGroups = [

    ".skills-grid .skill-card",

    ".projects-grid .project-card",

    ".certifications-grid .certification-card",

    ".contact-container .contact-card"

];


staggerGroups.forEach(selector => {

    const elements =
        document.querySelectorAll(selector);

    elements.forEach((element, index) => {

        element.style.transitionDelay =
            `${index * 0.08}s`;

    });

});



/* =====================================================
   09. HEADER SCROLL EFFECT
===================================================== */

const header =
    document.querySelector(".header");


const handleHeaderScroll = () => {

    if (!header) return;


    if (window.scrollY > 40) {

        header.style.boxShadow =
            "0 10px 40px rgba(0,0,0,.18)";

        header.style.background =
            "rgba(4,16,13,.88)";

    } else {

        header.style.boxShadow =
            "none";

        header.style.background =
            "rgba(4,16,13,.72)";

    }

};


window.addEventListener(
    "scroll",
    handleHeaderScroll,
    { passive: true }
);

handleHeaderScroll();



/* =====================================================
   10. BACK TO TOP
   ===================================================== */

const createBackToTop = () => {

    const button =
        document.createElement("button");

    button.className =
        "back-to-top";

    button.setAttribute(
        "aria-label",
        "Back to top"
    );

    button.innerHTML =
        '<i class="fa-solid fa-arrow-up"></i>';


    Object.assign(button.style, {

        position: "fixed",

        right: "25px",

        bottom: "25px",

        width: "45px",

        height: "45px",

        borderRadius: "50%",

        border: "1px solid rgba(25,230,160,.3)",

        background: "rgba(6,17,15,.85)",

        color: "#19e6a0",

        display: "grid",

        placeItems: "center",

        cursor: "pointer",

        zIndex: "999",

        opacity: "0",

        visibility: "hidden",

        transform: "translateY(15px)",

        transition:
            "all .35s ease",

        backdropFilter: "blur(15px)"

    });


    document.body.appendChild(button);


    const updateButton = () => {

        if (window.scrollY > 500) {

            button.style.opacity = "1";

            button.style.visibility =
                "visible";

            button.style.transform =
                "translateY(0)";

        } else {

            button.style.opacity = "0";

            button.style.visibility =
                "hidden";

            button.style.transform =
                "translateY(15px)";

        }

    };


    window.addEventListener(
        "scroll",
        updateButton,
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

};


createBackToTop();



/* =====================================================
   11. CURSOR GLOW
===================================================== */

const cursorGlow =
    document.createElement("div");

cursorGlow.className =
    "cursor-glow";


Object.assign(cursorGlow.style, {

    position: "fixed",

    width: "180px",

    height: "180px",

    borderRadius: "50%",

    background:
        "radial-gradient(circle, rgba(25,230,160,.08), transparent 70%)",

    pointerEvents: "none",

    zIndex: "9998",

    transform:
        "translate(-50%, -50%)",

    opacity: "0",

    transition:
        "opacity .3s ease"

});


document.body.appendChild(cursorGlow);


let cursorX = 0;
let cursorY = 0;
let glowX = 0;
let glowY = 0;


document.addEventListener(
    "mousemove",
    event => {

        cursorX = event.clientX;
        cursorY = event.clientY;

        cursorGlow.style.opacity = "1";

    }
);


const animateCursorGlow = () => {

    glowX +=
        (cursorX - glowX) * 0.12;

    glowY +=
        (cursorY - glowY) * 0.12;


    cursorGlow.style.left =
        `${glowX}px`;

    cursorGlow.style.top =
        `${glowY}px`;


    requestAnimationFrame(
        animateCursorGlow
    );

};


animateCursorGlow();


document.addEventListener(
    "mouseleave",
    () => {

        cursorGlow.style.opacity = "0";

    }
);



/* =====================================================
   12. CARD MOUSE TILT
===================================================== */

const tiltCards = document.querySelectorAll(
    ".project-card, " +
    ".skill-card, " +
    ".certification-card, " +
    ".contact-card"
);


tiltCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth < 900
            ) {

                return;

            }


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) /
                centerY) * -3;


            const rotateY =
                ((x - centerX) /
                centerX) * 3;


            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-6px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});



/* =====================================================
   13. DYNAMIC CURRENT YEAR
===================================================== */

const copyright =
    document.querySelector(".copyright");


if (copyright) {

    const currentYear =
        new Date().getFullYear();

    copyright.innerHTML =
        `© ${currentYear} Muse Ahmed Afrah. All Rights Reserved.`;

}



/* =====================================================
   14. ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            navLinks &&
            navLinks.classList.contains("show")
        ) {

            navLinks.classList.remove("show");

            if (menuToggle) {

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';

                menuToggle.setAttribute(
                    "aria-label",
                    "Open Menu"
                );

            }

        }

    }
);



/* =====================================================
   15. IMAGE ERROR HANDLING
===================================================== */

document.querySelectorAll("img")
    .forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.opacity = "0.3";

                image.alt =
                    "Image unavailable";

            }
        );

    });



/* =====================================================
   16. PAGE LOADING EFFECT
===================================================== */

document.body.classList.add(
    "page-loaded"
);


/* =====================================================
   17. CONSOLE BRANDING
===================================================== */

console.log(
    "%c Muse Ahmed Afrah ",
    "background:#19e6a0;color:#03100c;font-size:18px;font-weight:800;padding:8px 14px;border-radius:8px;"
);

console.log(
    "%c Junior Full Stack Developer ",
    "color:#19e6a0;font-size:13px;font-weight:600;"
);

console.log(
    "%c Portfolio loaded successfully 🚀 ",
    "color:#b5c8c3;font-size:12px;"
);
```

});
