/**
 * Annadhara - Food Rescue & Hunger Alleviation Platform
 * Master Application Logic
 */

// Initial Seed Data for Live Food Rescues
const DEFAULT_DONATIONS = [
  {
    id: "DON-1082",
    title: "50 Packed Fresh Biryani Boxes & Raita",
    donorName: "Royal Orchid Banquet Hall",
    donorType: "Caterer / Event",
    verified: true,
    category: "cooked",
    dietary: "veg",
    servings: 50,
    preparedAt: "2 hours ago",
    safeUntilHours: 4,
    location: "Indiranagar, Sector 4",
    distance: "1.8 km away",
    status: "available",
    handling: "Packed in sealed food-grade containers. Kept warm at 65°C."
  },
  {
    id: "DON-1083",
    title: "Fresh Artisanal Breads, Croissants & Buns",
    donorName: "Crumb & Crust Bakery",
    donorType: "Bakery & Cafe",
    verified: true,
    category: "bakery",
    dietary: "veg",
    servings: 40,
    preparedAt: "3 hours ago",
    safeUntilHours: 12,
    location: "Koramangala 5th Block",
    distance: "3.2 km away",
    status: "available",
    handling: "Individually wrapped paper packaging. Fresh from today's morning bake."
  },
  {
    id: "DON-1084",
    title: "35 Portions Dal Makhani, Paneer & Roti",
    donorName: "Spice Symphony Fine Dine",
    donorType: "Restaurant",
    verified: true,
    category: "cooked",
    dietary: "veg",
    servings: 35,
    preparedAt: "1 hour ago",
    safeUntilHours: 5,
    location: "MG Road Plaza",
    distance: "2.4 km away",
    status: "available",
    handling: "Bulk insulated thermal containers ready for shelter decanting."
  },
  {
    id: "DON-1085",
    title: "Crates of Fresh Seasonal Apples & Bananas",
    donorName: "Green Valley Organic Mart",
    donorType: "Supermarket",
    verified: true,
    category: "produce",
    dietary: "vegan",
    servings: 60,
    preparedAt: "4 hours ago",
    safeUntilHours: 48,
    location: "Jayanagar 4th T Block",
    distance: "4.1 km away",
    status: "available",
    handling: "Clean, washed, unblemished surplus fruit crates."
  },
  {
    id: "DON-1086",
    title: "25 Packaged Vegetable Pulao & Salad Bowls",
    donorName: "TechCorp Campus Cafeteria",
    donorType: "Corporate Kitchen",
    verified: true,
    category: "cooked",
    dietary: "vegan",
    servings: 25,
    preparedAt: "1.5 hours ago",
    safeUntilHours: 3.5,
    location: "Whitefield Tech Park",
    distance: "5.6 km away",
    status: "available",
    handling: "Standard meal trays with cutlery and nutrition seal."
  }
];

// Initial Seed Data for Shelter Requests
const DEFAULT_REQUESTS = [
  {
    id: "REQ-401",
    shelterName: "Aasra Children's Home",
    headcount: 45,
    contactPerson: "Sister Sunita",
    phone: "9876543210",
    location: "Shivajinagar, Central",
    urgency: "urgent",
    urgencyText: "Urgent (Dinner Needed)",
    dietaryReq: "Nutritious cooked meals or grains"
  },
  {
    id: "REQ-402",
    shelterName: "Sneha Deep Senior Citizens Sanctuary",
    headcount: 32,
    contactPerson: "Dr. R. Ramanathan",
    phone: "9823456789",
    location: "Malleshwaram",
    urgency: "today",
    urgencyText: "Needed by 7:30 PM",
    dietaryReq: "Soft cooked vegetarian diet"
  },
  {
    id: "REQ-403",
    shelterName: "Prerana Slum Community Learning Center",
    headcount: 70,
    contactPerson: "Kavita Rao",
    phone: "9845012345",
    location: "Rajajinagar Cluster",
    urgency: "today",
    urgencyText: "Daily After-School Nourishment",
    dietaryReq: "Fresh fruits, bakery items or warm meals"
  }
];

// Local Storage Handlers
function getStoredDonations() {
  const data = localStorage.getItem("annadhara_donations");
  if (!data) {
    localStorage.setItem("annadhara_donations", JSON.stringify(DEFAULT_DONATIONS));
    return DEFAULT_DONATIONS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_DONATIONS;
  }
}

function saveDonations(donations) {
  localStorage.setItem("annadhara_donations", JSON.stringify(donations));
}

function getStoredRequests() {
  const data = localStorage.getItem("annadhara_requests");
  if (!data) {
    localStorage.setItem("annadhara_requests", JSON.stringify(DEFAULT_REQUESTS));
    return DEFAULT_REQUESTS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return DEFAULT_REQUESTS;
  }
}

function saveRequests(requests) {
  localStorage.setItem("annadhara_requests", JSON.stringify(requests));
}

// Toast Notification Engine
function showToast(message, type = "success", duration = 4000) {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  const iconClass = type === "success" 
    ? "fa-circle-check" 
    : type === "warning" 
    ? "fa-triangle-exclamation" 
    : "fa-circle-info";

  toast.innerHTML = `
    <i class="fas ${iconClass}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Navigation & Active Link Highlight
function setupNavigation() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  
  document.querySelectorAll(".nav-link, .drawer-link").forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Header Scroll Effect
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // Mobile Drawer Toggle
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const drawer = document.getElementById("mobileNavDrawer");
  const closeBtn = document.getElementById("closeDrawerBtn");

  if (mobileBtn && drawer) {
    mobileBtn.addEventListener("click", () => {
      drawer.classList.add("active");
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener("click", () => {
      drawer.classList.remove("active");
    });
  }

  if (drawer) {
    drawer.addEventListener("click", (e) => {
      if (e.target === drawer) {
        drawer.classList.remove("active");
      }
    });
  }
}

// Render Food Cards
function renderFoodCards(filteredCategory = "all", searchQuery = "") {
  const container = document.getElementById("foodCardsContainer");
  if (!container) return;

  const donations = getStoredDonations();
  
  const filtered = donations.filter(item => {
    const matchesCat = (filteredCategory === "all") || (item.category === filteredCategory);
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.donorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: #fff; border-radius: 16px; border: 1px dashed #cbd5e1;">
        <i class="fas fa-box-open" style="font-size: 3rem; color: #94a3b8; margin-bottom: 1rem;"></i>
        <h3 style="color: #475569;">No available surplus listings found</h3>
        <p style="color: #64748b; margin-bottom: 1.5rem;">Try adjusting your search criteria or register a new donation.</p>
        <a href="donate.html" class="btn btn-primary btn-sm"><i class="fas fa-plus"></i> Post Food Surplus</a>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const isClaimed = item.status === "claimed";
    const dietaryClass = item.dietary === "veg" ? "veg" : item.dietary === "vegan" ? "vegan" : "nonveg";
    const dietaryLabel = item.dietary === "veg" ? "🌱 Vegetarian" : item.dietary === "vegan" ? "🌿 Pure Vegan" : "🍗 Non-Veg";

    return `
      <div class="food-card" id="card-${item.id}">
        <div class="food-card-header">
          <span class="food-type-pill ${dietaryClass}">${dietaryLabel}</span>
          ${isClaimed 
            ? `<span style="background: #e2e8f0; color: #475569; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.65rem; border-radius: 9999px;">CLAIMED</span>`
            : `<span class="urgency-badge"><i class="fas fa-clock"></i> Pickup in ~${item.safeUntilHours}h</span>`
          }
        </div>
        
        <div class="food-card-body">
          <h3 class="food-title">${item.title}</h3>
          <div class="food-donor-meta">
            <span><i class="fas fa-store"></i> ${item.donorName}</span>
            ${item.verified ? `<i class="fas fa-certificate donor-verified-icon" title="Verified Safe Donor"></i>` : ""}
          </div>
          
          <div class="food-specs-grid">
            <div class="spec-item">
              <span class="spec-label">Quantity</span>
              <span class="spec-val">${item.servings} Meals</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Prepared</span>
              <span class="spec-val">${item.preparedAt}</span>
            </div>
          </div>
          
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 0.5rem; line-height: 1.4;">
            <i class="fas fa-shield-halved" style="color: var(--primary);"></i> ${item.handling}
          </p>
        </div>

        <div class="food-card-footer">
          <div class="food-location">
            <i class="fas fa-location-dot"></i>
            <span>${item.location} (${item.distance})</span>
          </div>
          <button 
            class="btn ${isClaimed ? 'btn-secondary' : 'btn-primary'} btn-sm"
            onclick="openClaimModal('${item.id}')"
            ${isClaimed ? 'disabled' : ''}
          >
            ${isClaimed ? '<i class="fas fa-check"></i> Claimed' : '<i class="fas fa-hand-holding-heart"></i> Claim'}
          </button>
        </div>
      </div>
    `;
  }).join("");
}

// Setup Feed Filter & Search Controls
function setupFeedControls() {
  const tabs = document.querySelectorAll(".category-tabs .tab-btn");
  const searchInput = document.getElementById("foodSearchInput");

  let activeCat = "all";
  let query = "";

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeCat = tab.getAttribute("data-category") || "all";
      renderFoodCards(activeCat, query);
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      query = e.target.value.trim();
      renderFoodCards(activeCat, query);
    });
  }
}

// Claim Modal Engine
let currentClaimItemId = null;

function openClaimModal(id) {
  const donations = getStoredDonations();
  const item = donations.find(d => d.id === id);
  if (!item || item.status === "claimed") return;

  currentClaimItemId = id;
  const modal = document.getElementById("claimModal");
  if (!modal) return;

  document.getElementById("modalFoodTitle").textContent = item.title;
  document.getElementById("modalDonorName").textContent = `${item.donorName} • ${item.location}`;
  document.getElementById("modalPortions").textContent = `${item.servings} Meals Available`;
  
  modal.classList.add("active");
}

function closeClaimModal() {
  const modal = document.getElementById("claimModal");
  if (modal) {
    modal.classList.remove("active");
  }
  currentClaimItemId = null;
}

function confirmClaimAction(e) {
  if (e) e.preventDefault();
  if (!currentClaimItemId) return;

  const shelterNameInput = document.getElementById("claimShelterName");
  const phoneInput = document.getElementById("claimPhone");

  const shelter = shelterNameInput ? shelterNameInput.value.trim() : "Verified Community Shelter";
  const phone = phoneInput ? phoneInput.value.trim() : "7318405760";

  if (!shelter) {
    showToast("Please enter your shelter or organization name", "warning");
    return;
  }

  const donations = getStoredDonations();
  const index = donations.findIndex(d => d.id === currentClaimItemId);
  if (index !== -1) {
    donations[index].status = "claimed";
    donations[index].claimedBy = shelter;
    donations[index].claimedAt = new Date().toLocaleTimeString();
    saveDonations(donations);
  }

  closeClaimModal();
  renderFoodCards();
  showToast(`Success! Food claimed for ${shelter}. Pickup details sent to ${phone}.`, "success", 5000);
}

// Donation Form Handler
function setupDonationForm() {
  const form = document.getElementById("donorForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const donorName = document.getElementById("donorName").value.trim();
    const donorType = document.getElementById("donorType").value;
    const phone = document.getElementById("donorPhone").value.trim();
    const email = document.getElementById("donorEmail").value.trim();
    const foodTitle = document.getElementById("foodTitle").value.trim();
    const category = document.getElementById("foodCategory").value;
    const servings = parseInt(document.getElementById("foodQuantity").value, 10) || 20;
    const address = document.getElementById("pickupAddress").value.trim();
    const safeHours = parseFloat(document.getElementById("safeHours").value) || 4;
    const notes = document.getElementById("handlingNotes").value.trim() || "Freshly prepared under hygienic conditions.";

    const dietaryElem = document.querySelector('input[name="dietary"]:checked');
    const dietary = dietaryElem ? dietaryElem.value : "veg";

    const newDonation = {
      id: "DON-" + Math.floor(1000 + Math.random() * 9000),
      title: foodTitle,
      donorName: donorName,
      donorType: donorType,
      verified: true,
      category: category,
      dietary: dietary,
      servings: servings,
      preparedAt: "Just now",
      safeUntilHours: safeHours,
      location: address.split(",")[0] || "Downtown Hub",
      distance: "0.5 km away",
      status: "available",
      handling: notes
    };

    const donations = getStoredDonations();
    donations.unshift(newDonation);
    saveDonations(donations);

    // Show Confirmation Modal or Toast
    const confirmModal = document.getElementById("donationSuccessModal");
    if (confirmModal) {
      document.getElementById("successTicketId").textContent = newDonation.id;
      document.getElementById("successMealsCount").textContent = `${servings} Meals`;
      confirmModal.classList.add("active");
    } else {
      showToast(`Thank you! Your donation (${newDonation.id}) has been broadcast to nearby shelters.`, "success", 5000);
      form.reset();
    }
  });
}

// Recipient Form Handler
function setupRecipientForm() {
  const form = document.getElementById("recipientForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const shelterName = document.getElementById("recipName").value.trim();
    const contactPerson = document.getElementById("recipContactPerson").value.trim();
    const phone = document.getElementById("recipPhone").value.trim();
    const headcount = parseInt(document.getElementById("recipHeadcount").value, 10) || 30;
    const address = document.getElementById("recipAddress").value.trim();
    const urgency = document.getElementById("recipUrgency").value;
    const requirements = document.getElementById("recipRequirements").value.trim();

    const newRequest = {
      id: "REQ-" + Math.floor(100 + Math.random() * 900),
      shelterName: shelterName,
      headcount: headcount,
      contactPerson: contactPerson,
      phone: phone,
      location: address.split(",")[0] || "Central City",
      urgency: urgency,
      urgencyText: urgency === "urgent" ? "Urgent (<2 Hours)" : "Needed Today",
      dietaryReq: requirements || "Standard nutritious meals"
    };

    const requests = getStoredRequests();
    requests.unshift(newRequest);
    saveRequests(requests);

    const successModal = document.getElementById("recipientSuccessModal");
    if (successModal) {
      document.getElementById("recipTicketId").textContent = newRequest.id;
      successModal.classList.add("active");
    } else {
      showToast(`Food assistance request ${newRequest.id} recorded. Our dispatch team is matching surplus donors!`, "success", 5000);
      form.reset();
    }
  });
}

// Contact Form Handler
function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contactName").value.trim();
    const subject = document.getElementById("contactSubject").value.trim();

    showToast(`Thank you ${name}! Your message regarding "${subject}" has been received. Our team will contact you shortly.`, "success", 5000);
    form.reset();
  });
}

// Real-Time Hunger Crisis Ticker
// Research basis: ~9 million hunger-related deaths worldwide annually = ~24,650/day = 1 every ~3.5 seconds.
function setupHungerCounter() {
  const counterElem = document.getElementById("liveHungerCounter");
  if (!counterElem) return;

  const now = new Date();
  const secondsSinceMidnight = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  let count = Math.floor(secondsSinceMidnight / 3.5);

  counterElem.textContent = count.toLocaleString();

  setInterval(() => {
    count++;
    counterElem.textContent = count.toLocaleString();
  }, 3500);
}

// FAQ Accordion
function setupFAQ() {
  document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
      const parent = button.parentElement;
      const isActive = parent.classList.contains("active");

      // Close others
      document.querySelectorAll(".faq-item").forEach(item => {
        item.classList.remove("active");
      });

      if (!isActive) {
        parent.classList.add("active");
      }
    });
  });
}

// Annadhara Chatbot Assistant
function setupChatbot() {
  const widgetBtn = document.getElementById("chatbotBtn");
  const chatWindow = document.getElementById("chatbotWindow");
  const closeBtn = document.getElementById("closeChatBtn");
  const sendBtn = document.getElementById("chatSendBtn");
  const input = document.getElementById("chatInput");
  const messagesBox = document.getElementById("chatMessages");
  const chips = document.querySelectorAll(".chip-btn");

  if (!widgetBtn || !chatWindow) return;

  widgetBtn.addEventListener("click", () => {
    chatWindow.classList.toggle("active");
    const unread = document.querySelector(".chatbot-unread-dot");
    if (unread) unread.remove();
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      chatWindow.classList.remove("active");
    });
  }

  function appendMessage(text, sender = "bot") {
    const div = document.createElement("div");
    div.className = `msg ${sender}`;
    div.innerHTML = text;
    messagesBox.appendChild(div);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function botReply(userQuery) {
    const q = userQuery.toLowerCase();
    let reply = "I'm happy to help you with Annadhara food rescue! You can donate food, request meals for a shelter, or call our 24/7 hotline at <strong>+91 7318405760</strong>.";

    if (q.includes("donate") || q.includes("give food")) {
      reply = "🌟 Donating is easy! Go to <a href='donate.html' style='text-decoration: underline; font-weight: bold;'>Donate Surplus Food</a>, fill in your food details (cooked, bakery, or raw), specify portions and pickup time, and we'll notify verified shelters near you immediately.";
    } else if (q.includes("pickup") || q.includes("collect")) {
      reply = "🚚 <strong>Pickup Logistics:</strong> For donations over 20 meals, our verified volunteer couriers or shelter vans arrive within 60–90 minutes with insulated thermal carriers.";
    } else if (q.includes("safe") || q.includes("hygiene") || q.includes("quality")) {
      reply = "🛡️ <strong>Safety Standards:</strong> Annadhara adheres to strict FSSAI guidelines. All cooked donations must be consumed within safe 4-6 hour windows and packed in clean food-grade containers.";
    } else if (q.includes("free") || q.includes("cost") || q.includes("charge")) {
      reply = "💚 <strong>100% Free:</strong> Annadhara is a non-profit humanitarian initiative. Donating food and requesting meals is completely free with zero charges.";
    } else if (q.includes("shelter") || q.includes("ngo") || q.includes("need food")) {
      reply = "🤝 <strong>Need Food Assistance?</strong> Registered orphanages, elderly shelters, and community kitchens can submit an instant meal request on our <a href='recipients.html' style='text-decoration: underline; font-weight: bold;'>Recipients Portal</a>.";
    } else if (q.includes("contact") || q.includes("phone") || q.includes("number") || q.includes("help") || q.includes("address") || q.includes("location")) {
      reply = "📞 <strong>Direct Helpline:</strong> Call or WhatsApp our Rapid Rescue team at <strong>+91 7318405760</strong>, email <strong>ak8924095@gmail.com</strong>, or visit our Headquarters at <strong>SEC-5, GIDA, GORAKHPUR, UTTAR PRADESH, INDIA</strong>.";
    }

    setTimeout(() => {
      appendMessage(reply, "bot");
    }, 450);
  }

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;
    appendMessage(text, "user");
    input.value = "";
    botReply(text);
  }

  if (sendBtn && input) {
    sendBtn.addEventListener("click", handleSend);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleSend();
    });
  }

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const prompt = chip.getAttribute("data-prompt") || chip.textContent;
      appendMessage(prompt, "user");
      botReply(prompt);
    });
  });
}

// Document Initialization
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  renderFoodCards();
  setupFeedControls();
  setupDonationForm();
  setupRecipientForm();
  setupContactForm();
  setupHungerCounter();
  setupFAQ();
  setupChatbot();
});
