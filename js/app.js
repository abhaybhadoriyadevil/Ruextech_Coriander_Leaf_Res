/**
 * Coriander Leaf - Frontend Demo Logic (High Interactivity)
 * This file handles simulated backend actions, navigation, and UI states.
 */

// Simulated navigation helper
function navigate(page) {
    console.log(`Navigating to: ${page}`);
    // Optional: Add a transition effect here
    window.location.href = page;
}

// Simulated action helper with "Real-World" feedback
async function fakeAction(actionName) {
    console.log(`Action triggered: ${actionName}`);

    const processingActions = ["Order", "Book", "Filter", "Applying", "Claim", "Notifications", "Settings", "Saved"];
    const needsProcessing = processingActions.some(word => actionName.includes(word));

    if (needsProcessing) {
        let toast = createToast(`${actionName}...`, 'info');
        await sleep(1500);
        toast.remove();

        if (actionName.includes("Order")) {
            alert("Order Placed Successfully! ✅\n\nYour fresh meal is being prepared. Track your order in the 'Orders' section.");
            navigate('orders.html');
            return;
        }
    }

    alert(`${actionName}\n\nThis interaction is fully functional in the demo. In a live environment, this would communicate with our secure servers.`);
}

// Realistic Form Submission (Inquiry)
async function submitInquiry() {
    const nameInput = document.querySelector('input[placeholder*="Name"]');
    const emailInput = document.querySelector('input[placeholder*="Email"]');
    const messageInput = document.querySelector('textarea');

    if (!nameInput?.value || !emailInput?.value) {
        alert("Please fill in your name and email to proceed.");
        return;
    }

    const btn = document.querySelector('button[onclick*="submitInquiry"]');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<span class="animate-spin material-symbols-rounded">progress_activity</span> Sending...`;

    await sleep(2000);

    btn.innerHTML = originalText;
    btn.disabled = false;

    alert(`Success! Thank you ${nameInput.value}.\n\nYour message was sent to our support team. We usually respond within 2-4 hours.`);

    // Reset form
    nameInput.value = "";
    emailInput.value = "";
    if (messageInput) messageInput.value = "";
}

// Table Booking Logic
async function confirmBooking() {
    const btn = document.querySelector('button[onclick*="confirmBooking"]');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = `<span class="animate-spin material-symbols-rounded">progress_activity</span> Securing Table...`;

    await sleep(2500);

    btn.innerHTML = originalText;
    btn.disabled = false;

    alert("Booking Confirmed! ✅\n\nOrder ID: #RES-7782\nYou will receive a WhatsApp confirmation shortly.");
    navigate('index.html');
}

// Cart Management
let cartCount = 0;
function updateCartCount(change) {
    cartCount += change;
    const badges = document.querySelectorAll('#cart-badge, .cart-badge');
    badges.forEach(badge => {
        badge.textContent = cartCount;
        badge.classList.remove('hidden');
        badge.classList.add('scale-125');
        setTimeout(() => badge.classList.remove('scale-125'), 300);
    });

    createToast(`Added to cart! Total items: ${cartCount}`, 'success');
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    // Hide badges if count is 0
    if (cartCount === 0) {
        document.querySelectorAll('#cart-badge, .cart-badge').forEach(b => b.classList.add('hidden'));
    }
});

// Utility Functions
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function createToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-3xl shadow-2xl font-bold text-sm transition-all duration-300 transform translate-y-[-20px] opacity-0 flex items-center gap-3 border border-white/10 ios-blur`;

    if (type === 'success') {
        toast.classList.add('bg-emerald-500', 'text-white');
        toast.innerHTML = `<span class="material-symbols-rounded">check_circle</span> ${message}`;
    } else {
        toast.classList.add('bg-slate-900', 'text-white');
        toast.innerHTML = `<span class="material-symbols-rounded animate-pulse">info</span> ${message}`;
    }

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-[-20px]', 'opacity-0');
    });

    return {
        remove: () => {
            toast.classList.add('translate-y-[-20px]', 'opacity-0');
            setTimeout(() => toast.remove(), 300);
        }
    };
}

