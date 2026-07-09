/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav-link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav-link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== TYPEWRITER EFFECT ====================*/
const words = ["Aspiring Software Engineer", "B.Tech IT Student", "Passionate Coder", "Full-Stack Web Developer"];
let i = 0;
let timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            document.getElementById('typewriter-text').innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return false;
        }
        timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.getElementById('typewriter-text').innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0;
            }
            setTimeout(typingEffect, 500);
            return false;
        }
        timer = setTimeout(loopDeleting, 60);
    };
    loopDeleting();
}

// Start typewriter effect after page content loads
document.addEventListener('DOMContentLoaded', () => {
    typingEffect();
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 58;
        sectionId = current.getAttribute('id')

        const activeLinkEl = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
        if(activeLinkEl) {
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                activeLinkEl.classList.add('active-link')
            }else{
                activeLinkEl.classList.remove('active-link')
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-toggle')
const darkTheme = 'light-theme' // Actually body has dark-theme by default, light-theme class turns it light
const iconTheme = 'fa-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'light' : 'dark'
const getCurrentIcon = () => themeButton.querySelector('.sun-icon').style.display === 'inline-block' ? 'sun' : 'moon'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light-theme
  document.body.classList[selectedTheme === 'light' ? 'add' : 'remove'](darkTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the light-theme class
    document.body.classList.toggle(darkTheme)
    
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
})

/*==================== SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER) ====================*/
const animateElements = document.querySelectorAll('.glass-card, .skills-card, .timeline-item, .personal-details, .home-content, .home-img-wrapper');

// Add animation class to observed elements
animateElements.forEach(el => el.classList.add('fade-in-up'));

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Once animated, we don't need to observe it anymore
            observer.unobserve(entry.target);
        }
    });
};

const revealObserver = new IntersectionObserver(revealCallback, {
    root: null, // viewport
    threshold: 0.15, // trigger when 15% of element is visible
    rootMargin: "0px 0px -50px 0px" // trigger slightly before entering view fully
});

animateElements.forEach(el => revealObserver.observe(el));

/*==================== CONTACT FORM SUBMISSION ====================*/
const contactForm = document.getElementById('contact-form');
const statusMsg = document.getElementById('form-status-msg');

// TODO: Replace this placeholder with your free Web3Forms Access Key from https://web3forms.com
// to receive emails directly in your inbox.
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY_HERE";

if(contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('form-name').value;
        const email = document.getElementById('form-email').value;
        const subject = document.getElementById('form-subject').value;
        const message = document.getElementById('form-message').value;
        
        // Simple form validation
        if(!name || !email || !subject || !message) {
            statusMsg.textContent = "Please fill in all fields.";
            statusMsg.className = "form-status-msg error";
            return;
        }
        
        // Show sending state
        const submitBtn = document.getElementById('btn-submit-message');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        // If the user has not configured the Web3Forms key, fall back to mailto:
        if (WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY_HERE") {
            setTimeout(() => {
                // Restore button
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                
                statusMsg.textContent = "Opening email client... Set Web3Forms key in script.js for background sending!";
                statusMsg.className = "form-status-msg success";
                
                // Open mailto link
                const mailtoUrl = `mailto:rajkumarv0607@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message)}`;
                window.location.href = mailtoUrl;
                
                contactForm.reset();
            }, 1000);
            return;
        }

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                })
            });
            
            const result = await response.json();
            
            if (response.status === 200) {
                statusMsg.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
                statusMsg.className = "form-status-msg success";
                contactForm.reset();
            } else {
                statusMsg.textContent = result.message || "Something went wrong. Please try again.";
                statusMsg.className = "form-status-msg error";
            }
        } catch (error) {
            statusMsg.textContent = "Network error. Please try again later.";
            statusMsg.className = "form-status-msg error";
        } finally {
            // Restore button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            // Clear message after 6 seconds
            setTimeout(() => {
                statusMsg.textContent = "";
            }, 6000);
        }
    });
}
