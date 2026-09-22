// Global event listeners and utility functions will be attached here.

/**
 * Handles the asynchronous submission of the waitlist form.
 * @param {Event} event - The form submit event.
 */
function handleWaitlistSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Use the assumed Formspree endpoint structure
    const formspreeEndpoint = 'YOUR_FORM_SPREE_ENDPOINT_HERE';

    const submitButton = form.querySelector('button');
    const container = form.closest('.form-wrapper');

    // 1. UI Lock
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        // Assuming Formspree returns a successful status code on success
        if (response.ok) {
            console.log("Waitlist submission successful!");
            // 2. Success State Update
            if (container) {
                // Clear previous success/error messages
                container.innerHTML = '';
                // Re-add the form wrapper structure for safety, but replace form content
                container.innerHTML = `
                    <div class="success-message glass-container">
                        🥳 Success! You've been added to the waitlist. We'll be in touch when AstraForm is ready for you.
                    </div>
                `;
            }
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .catch(error => {
        console.error('Submission failed:', error);
        // 3. Error State Update
        submitButton.disabled = false;
        submitButton.textContent = 'Join the Waitlist';
        alert('Oops! There was an issue submitting your email. Please try again.');
    });
}

/**
 * Handles the global mousemove event to create the pointer-reactive glass effect.
 * @param {MouseEvent} event - The mouse event.
 */
function handleMouseMove(event) {
    const body = document.getElementById('page-body');
    if (!body) return;

    // Calculate percentage position of the mouse relative to the viewport
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;

    // Update the pseudo-element background/background-attachment logic.
    // This directly manipulates the body::before pseudo-element's perceived effect.
    body.style.setProperty('--mouse-x', `${x * 100}%`);
    body.style.setProperty('--mouse-y', `${y * 100}%`);
}

/**
 * Initializes all interactive components: Tooltips and Global Effects.
 */
function initializeInteractions() {
    // 1. Tooltip/Popover Logic
    const trigger = document.querySelector('.tooltip-trigger');
    const popover = document.querySelector('.tooltip-popover');

    if (trigger && popover) {
        trigger.addEventListener('mouseenter', () => {
            popover.classList.add('active');
        });
        trigger.addEventListener('mouseleave', () => {
            popover.classList.remove('active');
        });
    }

    // 2. Global Mouse Tracking (Pointer Effect)
    document.addEventListener('mousemove', handleMouseMove);
}


document.addEventListener('DOMContentLoaded', () => {
    console.log("AstraForm Site Script Initialized.");

    // Initialize interactivity
    initializeInteractions();

    // Attach form listeners
    const waitlistForms = document.querySelectorAll('.waitlist-form');
    waitlistForms.forEach(form => {
        form.addEventListener('submit', handleWaitlistSubmit);
    });
});