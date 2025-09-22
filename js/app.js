/**
 * FlavorCraft - Modern Recipe Application
 *
 * This file contains all the JavaScript functionality for the FlavorCraft recipe application.
 * Features include: mobile navigation, recipe carousel, search/filter functionality,
 * favorites system, modal dialogs, and modern animations.
 *
 * @version 1.0.0
 * @author FlavorCraft Team
 * @date 2024
 */

// ================================
// CONSTANTS AND CONFIGURATION
// ================================

const CONFIG = {
  CAROUSEL_INTERVAL: 5000,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 300,
  STORAGE_KEYS: {
    FAVORITES: "flavorcraft_favorites",
    VIEWED_RECIPES: "flavorcraft_viewed",
    SEARCH_HISTORY: "flavorcraft_search_history",
  },
  CLASSES: {
    ACTIVE: "active",
    VISIBLE: "visible",
    LOADING: "loading",
    FILTERED: "filtered",
  },
};

// Recipe data structure
const RECIPE_DATA = {
  "pan-seared-steak": {
    title: "Pan-Seared Steak",
    description:
      "A perfectly seared steak with aromatic herbs, garlic, and butter for restaurant-quality results at home.",
    image: "./img/pan-seared-steak.jpg",
    difficulty: "medium",
    time: "30 min",
    servings: "2",
    cuisine: "american",
    rating: 5,
    ingredients: [
      "1 steak (approx. 1 lbs.)",
      "Kosher salt",
      "Black pepper",
      "1 tablespoon olive oil",
      "1/4 cup butter",
      "2 large sprigs of rosemary",
      "3 garlic cloves, crushed",
    ],
    instructions: [
      "Remove steak from refrigerator 30 minutes before cooking to bring to room temperature.",
      "Season generously with salt and pepper on both sides.",
      "Heat olive oil in a heavy skillet over high heat until smoking.",
      "Add steak and cook for 3-4 minutes without moving.",
      "Flip and add butter, rosemary, and garlic to the pan.",
      "Tilt pan and baste steak with the flavored butter for 2-3 minutes.",
      "Rest for 5 minutes before serving.",
    ],
    nutrition: {
      calories: 420,
      protein: "38g",
      carbs: "2g",
      fat: "28g",
    },
  },
  "curried-shrimp": {
    title: "Curry-Coconut Shrimp",
    description:
      "Flavorful shrimp in a creamy coconut curry sauce with aromatic spices. Quick and delicious!",
    image: "./img/curried-shrimp.jpg",
    difficulty: "easy",
    time: "20 min",
    servings: "4",
    cuisine: "asian",
    rating: 5,
    ingredients: [
      "1 teaspoon sugar",
      "1 tablespoon water",
      "1 teaspoon canola oil",
      "½ cup minced onion",
      "1 tablespoon cornstarch",
      "1 clove garlic, minced",
      "1 teaspoon ground cumin",
      "½ teaspoon curry powder",
      "½ cup light coconut milk",
      "¾ teaspoon ground coriander",
      "½ cup minced red bell pepper",
      "¼ teaspoon crushed red pepper flakes",
      "1 pound jumbo shrimp, peeled and deveined",
      "2 tablespoons chopped fresh cilantro",
    ],
    instructions: [
      "Heat oil in a large skillet over medium-high heat.",
      "Add onion and cook until softened, about 3 minutes.",
      "Add garlic, cumin, curry powder, and coriander. Cook for 1 minute.",
      "Stir in coconut milk and bring to a simmer.",
      "Add shrimp and bell pepper. Cook for 4-5 minutes until shrimp are pink.",
      "Stir in cilantro and red pepper flakes.",
      "Serve immediately over rice or with naan bread.",
    ],
    nutrition: {
      calories: 185,
      protein: "24g",
      carbs: "8g",
      fat: "6g",
    },
  },
  "lobster-ravioli": {
    title: "Lobster-Filled Ravioli",
    description:
      "Luxurious homemade ravioli filled with fresh lobster and ricotta, served in a delicate cream sauce.",
    image: "./img/lobster-ravioli.jpg",
    difficulty: "hard",
    time: "45 min",
    servings: "4",
    cuisine: "italian",
    rating: 5,
    ingredients: [
      "2 unit Scallions",
      "10 ounce Shrimp",
      "9 ounce Lobster Ravioli",
      "1.5 ounce Tomato Paste",
      "2 tablespoon Sour Cream",
      "½ cup Panko Breadcrumbs",
      "1 teaspoon Italian Seasoning",
      "2 tablespoon Cream Cheese",
      "¼ cup Parmesan Cheese",
    ],
    instructions: [
      "Bring a large pot of salted water to boil for the ravioli.",
      "Heat olive oil in a large skillet over medium heat.",
      "Add minced scallions and cook until fragrant.",
      "Add shrimp and cook until pink, about 3-4 minutes.",
      "Stir in tomato paste and cook for 1 minute.",
      "Add cream cheese and sour cream, stirring until smooth.",
      "Cook ravioli according to package directions.",
      "Toss cooked ravioli with the sauce and top with breadcrumbs and Parmesan.",
    ],
    nutrition: {
      calories: 520,
      protein: "32g",
      carbs: "38g",
      fat: "24g",
    },
  },
  "pan-seared-salmon": {
    title: "Pan-Seared Salmon",
    description:
      "Crispy-skinned salmon with a perfectly flaky interior, served with fresh kale and apple salad.",
    image: "./img/pan-seared-salmon.jpg",
    difficulty: "easy",
    time: "25 min",
    servings: "4",
    cuisine: "mediterranean",
    rating: 4,
    ingredients: [
      "Four 5-ounce center-cut salmon fillets (about 1-inch thick)",
      "4 whole wheat dinner rolls",
      "3 tablespoons fresh lemon juice",
      "3 tablespoons olive oil",
      "Kosher salt",
      "1 bunch kale, ribs removed, leaves very thinly sliced",
      "1/4 cup dates",
      "1 Honeycrisp apple",
      "1/4 cup finely grated pecorino",
      "3 tablespoons toasted slivered almonds",
      "Freshly ground black pepper",
    ],
    instructions: [
      "Season salmon fillets with salt and pepper.",
      "Heat olive oil in a non-stick skillet over medium-high heat.",
      "Place salmon skin-side up and cook for 4-5 minutes.",
      "Flip and cook for another 3-4 minutes until flaky.",
      "Meanwhile, massage kale with lemon juice and a pinch of salt.",
      "Add diced apple, dates, and almonds to the kale.",
      "Serve salmon over the salad with grated pecorino.",
    ],
    nutrition: {
      calories: 385,
      protein: "29g",
      carbs: "18g",
      fat: "22g",
    },
  },
  "mushroom-kale-salad": {
    title: "Mushroom Kale Salad",
    description:
      "A hearty and healthy salad with massaged kale, sautéed mushrooms, and a tangy horseradish dressing.",
    image: "./img/steakhouse-salad.jpg",
    difficulty: "easy",
    time: "15 min",
    servings: "4",
    cuisine: "american",
    rating: 4,
    ingredients: [
      "4 ounce Kale",
      "8 ounce Button Mushrooms",
      "1 unit Shallot",
      "1 unit Green Bell Pepper",
      "1 unit Roma Tomato",
      "1 tablespoon Bold & Savory Steak Spice",
      "1 teaspoon Garlic Powder",
      "2 tablespoon Soy Sauce",
      "5 teaspoon Balsamic Vinegar",
      "2 ounce Creamy Horseradish Sauce",
      "2 tablespoon Yogurt",
      "2 tablespoon Mayonnaise",
      "4 teaspoon Cooking Oil",
      "1 tablespoon Olive Oil",
      "1 tablespoon Butter",
    ],
    instructions: [
      "Remove stems from kale and massage leaves with a pinch of salt.",
      "Heat butter and oil in a large skillet.",
      "Sauté mushrooms until golden, about 5 minutes.",
      "Add diced bell pepper and cook for 2 minutes.",
      "Season mushrooms with steak spice and garlic powder.",
      "Whisk together horseradish sauce, yogurt, mayo, and balsamic vinegar.",
      "Toss kale with dressing and top with warm mushrooms and diced tomato.",
    ],
    nutrition: {
      calories: 165,
      protein: "6g",
      carbs: "12g",
      fat: "11g",
    },
  },
};

// ================================
// UTILITY FUNCTIONS
// ================================

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Local storage helper functions
 */
const storage = {
  get: (key, defaultValue = []) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading from localStorage: ${error.message}`);
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error writing to localStorage: ${error.message}`);
    }
  },

  add: (key, value) => {
    const existing = storage.get(key, []);
    if (!existing.includes(value)) {
      existing.push(value);
      storage.set(key, existing);
    }
  },

  remove: (key, value) => {
    const existing = storage.get(key, []);
    const filtered = existing.filter((item) => item !== value);
    storage.set(key, filtered);
  },
};

/**
 * Animation helper functions
 */
const animations = {
  fadeIn: (element, duration = CONFIG.ANIMATION_DURATION) => {
    element.style.opacity = "0";
    element.style.display = "block";

    const start = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      element.style.opacity = progress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  },

  fadeOut: (element, duration = CONFIG.ANIMATION_DURATION) => {
    const start = performance.now();
    const initialOpacity = parseFloat(getComputedStyle(element).opacity);

    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      element.style.opacity = initialOpacity * (1 - progress);

      if (progress >= 1) {
        element.style.display = "none";
      } else {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  },
};

// ================================
// NAVIGATION FUNCTIONALITY
// ================================

class Navigation {
  constructor() {
    this.header = document.getElementById("header");
    this.toggle = document.getElementById("toggle");
    this.navbar = document.getElementById("navbar");
    this.isOpen = false;

    this.init();
  }

  init() {
    if (!this.toggle || !this.navbar) return;

    // Mobile menu toggle
    this.toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!this.header.contains(e.target) && this.isOpen) {
        this.closeMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.closeMenu();
      }
    });

    // Handle scroll for header background
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Smooth scroll for anchor links
    this.initSmoothScroll();
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.toggle.classList.toggle(CONFIG.CLASSES.ACTIVE, this.isOpen);
    this.navbar.classList.toggle(CONFIG.CLASSES.ACTIVE, this.isOpen);
    this.toggle.setAttribute("aria-expanded", this.isOpen);

    // Prevent body scroll when menu is open on mobile
    if (window.innerWidth <= 768) {
      document.body.style.overflow = this.isOpen ? "hidden" : "";
    }
  }

  closeMenu() {
    if (this.isOpen) {
      this.isOpen = false;
      this.toggle.classList.remove(CONFIG.CLASSES.ACTIVE);
      this.navbar.classList.remove(CONFIG.CLASSES.ACTIVE);
      this.toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  }

  handleScroll() {
    const scrolled = window.scrollY > 50;
    this.header.style.background = scrolled
      ? "rgba(255, 255, 255, 0.98)"
      : "rgba(255, 255, 255, 0.95)";
  }

  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          const headerHeight = this.header.offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          this.closeMenu();
        }
      });
    });
  }
}

// ================================
// CAROUSEL FUNCTIONALITY
// ================================

class RecipeCarousel {
  constructor(selector) {
    this.carousel = document.querySelector(selector);
    if (!this.carousel) return;

    this.track = this.carousel.querySelector(".carousel-track");
    this.slides = this.carousel.querySelectorAll(".recipe-slide");
    this.prevBtn = this.carousel.querySelector(".prev");
    this.nextBtn = this.carousel.querySelector(".next");
    this.indicators = this.carousel.querySelectorAll(".indicator");

    this.currentSlide = 0;
    this.isPlaying = true;
    this.autoplayInterval = null;

    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    // Button event listeners
    this.prevBtn?.addEventListener("click", () => this.previousSlide());
    this.nextBtn?.addEventListener("click", () => this.nextSlide());

    // Indicator event listeners
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goToSlide(index));
    });

    // Keyboard navigation
    this.carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.previousSlide();
      if (e.key === "ArrowRight") this.nextSlide();
    });

    // Pause on hover
    this.carousel.addEventListener("mouseenter", () => this.pause());
    this.carousel.addEventListener("mouseleave", () => this.play());

    // Touch/swipe support
    this.initTouchEvents();

    // Start autoplay
    this.play();

    // Handle visibility change
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.pause();
      } else {
        this.play();
      }
    });
  }

  goToSlide(index) {
    if (index < 0 || index >= this.slides.length) return;

    this.currentSlide = index;
    const translateX = -index * (100 / this.slides.length);
    this.track.style.transform = `translateX(${translateX}%)`;

    // Update indicators
    this.indicators.forEach((indicator, i) => {
      indicator.classList.toggle(CONFIG.CLASSES.ACTIVE, i === index);
    });

    // Update slides
    this.slides.forEach((slide, i) => {
      slide.classList.toggle(CONFIG.CLASSES.ACTIVE, i === index);
    });

    // Announce slide change for screen readers
    this.announceSlideChange();
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(nextIndex);
  }

  previousSlide() {
    const prevIndex =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prevIndex);
  }

  play() {
    if (!this.isPlaying) return;

    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, CONFIG.CAROUSEL_INTERVAL);
  }

  pause() {
    clearInterval(this.autoplayInterval);
  }

  initTouchEvents() {
    let startX = 0;
    let isDragging = false;

    this.carousel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      this.pause();
    });

    this.carousel.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });

    this.carousel.addEventListener("touchend", (e) => {
      if (!isDragging) return;

      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
      }

      isDragging = false;
      this.play();
    });
  }

  announceSlideChange() {
    const currentSlideElement = this.slides[this.currentSlide];
    const title = currentSlideElement.querySelector("h3")?.textContent;

    if (title) {
      // Create or update screen reader announcement
      let announcement = document.getElementById("carousel-announcement");
      if (!announcement) {
        announcement = document.createElement("div");
        announcement.id = "carousel-announcement";
        announcement.className = "sr-only";
        announcement.setAttribute("aria-live", "polite");
        document.body.appendChild(announcement);
      }
      announcement.textContent = `Now showing: ${title}`;
    }
  }
}

// ================================
// RECIPE FUNCTIONALITY
// ================================

class RecipeManager {
  constructor() {
    this.recipesContainer = document.getElementById("recipes-container");
    this.searchInput = document.getElementById("recipe-search");
    this.difficultyFilter = document.getElementById("difficulty-filter");
    this.timeFilter = document.getElementById("time-filter");
    this.cuisineFilter = document.getElementById("cuisine-filter");
    this.viewToggle = document.querySelectorAll(".view-btn");
    this.noResults = document.getElementById("no-results");
    this.clearFiltersBtn = document.getElementById("clear-filters");

    this.currentView = "grid";
    this.favorites = storage.get(CONFIG.STORAGE_KEYS.FAVORITES);

    this.init();
  }

  init() {
    if (!this.recipesContainer) return;

    // Search functionality
    if (this.searchInput) {
      this.searchInput.addEventListener(
        "input",
        debounce(
          (e) => this.handleSearch(e.target.value),
          CONFIG.DEBOUNCE_DELAY
        )
      );
    }

    // Filter functionality
    [this.difficultyFilter, this.timeFilter, this.cuisineFilter].forEach(
      (filter) => {
        if (filter) {
          filter.addEventListener("change", () => this.applyFilters());
        }
      }
    );

    // View toggle
    this.viewToggle.forEach((btn) => {
      btn.addEventListener("click", (e) =>
        this.toggleView(e.target.dataset.view)
      );
    });

    // Clear filters
    this.clearFiltersBtn?.addEventListener("click", () =>
      this.clearAllFilters()
    );

    // Recipe interactions
    this.initRecipeInteractions();

    // Initialize favorites
    this.updateFavoritesDisplay();
  }

  handleSearch(query) {
    const cards = this.recipesContainer.querySelectorAll(".recipe-card");
    const searchTerm = query.toLowerCase().trim();

    if (searchTerm) {
      storage.add(CONFIG.STORAGE_KEYS.SEARCH_HISTORY, searchTerm);
    }

    cards.forEach((card) => {
      const title =
        card.querySelector(".recipe-title")?.textContent.toLowerCase() || "";
      const description =
        card.querySelector(".recipe-description")?.textContent.toLowerCase() ||
        "";
      const cuisine = card.dataset.cuisine?.toLowerCase() || "";

      const matches =
        title.includes(searchTerm) ||
        description.includes(searchTerm) ||
        cuisine.includes(searchTerm);

      card.style.display = matches ? "block" : "none";
      card.classList.toggle(CONFIG.CLASSES.FILTERED, !matches);
    });

    this.updateNoResultsVisibility();
  }

  applyFilters() {
    const cards = this.recipesContainer.querySelectorAll(".recipe-card");
    const difficulty = this.difficultyFilter?.value || "all";
    const time = this.timeFilter?.value || "all";
    const cuisine = this.cuisineFilter?.value || "all";

    cards.forEach((card) => {
      let show = true;

      // Difficulty filter
      if (difficulty !== "all" && card.dataset.difficulty !== difficulty) {
        show = false;
      }

      // Time filter
      if (time !== "all") {
        const cardTime = parseInt(card.dataset.time);
        if (time === "quick" && cardTime >= 30) show = false;
        if (time === "medium" && (cardTime < 30 || cardTime > 60)) show = false;
        if (time === "long" && cardTime <= 60) show = false;
      }

      // Cuisine filter
      if (cuisine !== "all" && card.dataset.cuisine !== cuisine) {
        show = false;
      }

      card.style.display = show ? "block" : "none";
      card.classList.toggle(CONFIG.CLASSES.FILTERED, !show);
    });

    this.updateNoResultsVisibility();
  }

  toggleView(view) {
    if (view === this.currentView) return;

    this.currentView = view;
    this.recipesContainer.className =
      view === "list" ? "recipes-grid list-view" : "recipes-grid";

    // Update button states
    this.viewToggle.forEach((btn) => {
      const isActive = btn.dataset.view === view;
      btn.classList.toggle(CONFIG.CLASSES.ACTIVE, isActive);
      btn.setAttribute("aria-pressed", isActive);
    });
  }

  clearAllFilters() {
    // Clear form inputs
    if (this.searchInput) this.searchInput.value = "";
    if (this.difficultyFilter) this.difficultyFilter.value = "all";
    if (this.timeFilter) this.timeFilter.value = "all";
    if (this.cuisineFilter) this.cuisineFilter.value = "all";

    // Show all cards
    const cards = this.recipesContainer.querySelectorAll(".recipe-card");
    cards.forEach((card) => {
      card.style.display = "block";
      card.classList.remove(CONFIG.CLASSES.FILTERED);
    });

    this.updateNoResultsVisibility();
  }

  updateNoResultsVisibility() {
    if (!this.noResults) return;

    const visibleCards = this.recipesContainer.querySelectorAll(
      '.recipe-card[style*="block"], .recipe-card:not([style*="none"])'
    );
    const hasResults = visibleCards.length > 0;

    this.noResults.style.display = hasResults ? "none" : "block";
  }

  initRecipeInteractions() {
    // Recipe card clicks
    this.recipesContainer.addEventListener("click", (e) => {
      const recipeBtn = e.target.closest(".recipe-btn");
      const favoriteBtn = e.target.closest(".favorite-btn");
      const saveBtn = e.target.closest(".save-btn");

      if (recipeBtn) {
        e.preventDefault();
        const recipeId = recipeBtn.dataset.recipe;
        this.openRecipeModal(recipeId);
      }

      if (favoriteBtn) {
        e.preventDefault();
        const recipeCard = favoriteBtn.closest(".recipe-card");
        const recipeId = recipeCard.dataset.recipe;
        this.toggleFavorite(recipeId, favoriteBtn);
      }

      if (saveBtn) {
        e.preventDefault();
        const recipeCard = saveBtn.closest(".recipe-card");
        const recipeId = recipeCard.dataset.recipe;
        this.saveRecipe(recipeId);
      }
    });
  }

  toggleFavorite(recipeId, button) {
    const isFavorite = this.favorites.includes(recipeId);

    if (isFavorite) {
      storage.remove(CONFIG.STORAGE_KEYS.FAVORITES, recipeId);
      this.favorites = this.favorites.filter((id) => id !== recipeId);
    } else {
      storage.add(CONFIG.STORAGE_KEYS.FAVORITES, recipeId);
      this.favorites.push(recipeId);
    }

    button.classList.toggle(CONFIG.CLASSES.ACTIVE, !isFavorite);
    this.showToast(
      isFavorite ? "Removed from favorites" : "Added to favorites"
    );
  }

  saveRecipe(recipeId) {
    // This could integrate with a backend or just use localStorage
    const savedRecipes = storage.get("saved_recipes", []);
    if (!savedRecipes.includes(recipeId)) {
      storage.add("saved_recipes", recipeId);
      this.showToast("Recipe saved!");
    } else {
      this.showToast("Recipe already saved");
    }
  }

  updateFavoritesDisplay() {
    this.recipesContainer.querySelectorAll(".recipe-card").forEach((card) => {
      const recipeId = card.dataset.recipe;
      const favoriteBtn = card.querySelector(".favorite-btn");

      if (favoriteBtn && this.favorites.includes(recipeId)) {
        favoriteBtn.classList.add(CONFIG.CLASSES.ACTIVE);
      }
    });
  }

  openRecipeModal(recipeId) {
    const recipe = RECIPE_DATA[recipeId];
    if (!recipe) return;

    // Track viewed recipes
    storage.add(CONFIG.STORAGE_KEYS.VIEWED_RECIPES, recipeId);

    // Create and show modal
    const modal = new RecipeModal(recipe);
    modal.show();
  }

  showToast(message, duration = 3000) {
    // Create toast element
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.style.transform = "translateX(0)";
    });

    // Remove after duration
    setTimeout(() => {
      toast.style.transform = "translateX(100%)";
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, duration);
  }
}

// ================================
// RECIPE MODAL
// ================================

class RecipeModal {
  constructor(recipe) {
    this.recipe = recipe;
    this.modal = null;
    this.isOpen = false;
  }

  show() {
    this.create();
    this.open();
  }

  create() {
    // Remove existing modal
    const existing = document.getElementById("recipe-modal");
    if (existing) {
      existing.remove();
    }

    // Create modal HTML
    const modalHTML = `
            <div class="modal" id="recipe-modal" role="dialog" aria-labelledby="modal-title" aria-hidden="true">
                <div class="modal-overlay" data-close-modal></div>
                <div class="modal-content">
                    <header class="modal-header">
                        <h2 id="modal-title" class="modal-title">${
                          this.recipe.title
                        }</h2>
                        <button class="modal-close" data-close-modal aria-label="Close modal">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="24" height="24">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </header>
                    <div class="modal-body">
                        ${this.generateModalContent()}
                    </div>
                </div>
            </div>
        `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);
    this.modal = document.getElementById("recipe-modal");
    this.initModalEvents();
  }

  generateModalContent() {
    const {
      title,
      description,
      image,
      time,
      servings,
      difficulty,
      rating,
      ingredients,
      instructions,
      nutrition,
    } = this.recipe;

    return `
            <div class="recipe-modal-content">
                <div class="recipe-modal-header">
                    <div class="recipe-modal-image">
                        <img src="${image}" alt="${title}" loading="lazy">
                        <div class="recipe-modal-badges">
                            <span class="difficulty-badge ${difficulty}">${difficulty}</span>
                            <span class="time-badge">${time}</span>
                        </div>
                    </div>
                    
                    <div class="recipe-modal-info">
                        <div class="recipe-modal-meta">
                            <div class="meta-item">
                                <span class="meta-label">Serves:</span>
                                <span>${servings}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Time:</span>
                                <span>${time}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Level:</span>
                                <span>${difficulty}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Rating:</span>
                                <span>${"★".repeat(rating)}${"☆".repeat(
      5 - rating
    )}</span>
                            </div>
                        </div>
                        
                        <p class="recipe-modal-description">${description}</p>
                        
                        <div class="recipe-modal-actions">
                            <button class="btn btn-primary start-cooking-btn">Start Cooking</button>
                            <button class="btn btn-secondary print-recipe-btn">Print Recipe</button>
                            <button class="btn btn-secondary share-recipe-btn">Share</button>
                        </div>
                    </div>
                </div>
                
                <div class="recipe-modal-details">
                    <div class="recipe-section">
                        <h3>Ingredients (${servings} servings)</h3>
                        <ul class="ingredients-list">
                            ${ingredients
                              .map((ingredient) => `<li>${ingredient}</li>`)
                              .join("")}
                        </ul>
                        <div class="serving-adjuster">
                            <label for="serving-count">Adjust servings:</label>
                            <div class="serving-controls">
                                <button class="serving-btn minus" data-action="decrease">−</button>
                                <input type="number" id="serving-count" value="${servings}" min="1" max="20">
                                <button class="serving-btn plus" data-action="increase">+</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="recipe-section">
                        <h3>Instructions</h3>
                        <ol class="instructions-list">
                            ${instructions
                              .map(
                                (instruction, index) =>
                                  `<li class="instruction-item">
                                    <div class="instruction-content">
                                        <span class="step-number">${
                                          index + 1
                                        }</span>
                                        <div class="step-text">${instruction}</div>
                                    </div>
                                    <button class="step-timer-btn" data-step="${
                                      index + 1
                                    }">Set Timer</button>
                                </li>`
                              )
                              .join("")}
                        </ol>
                    </div>
                    
                    <div class="recipe-section nutrition-section">
                        <h3>Nutrition Information</h3>
                        <div class="nutrition-grid">
                            <div class="nutrition-item">
                                <span class="nutrition-label">Calories</span>
                                <span class="nutrition-value">${
                                  nutrition.calories
                                }</span>
                            </div>
                            <div class="nutrition-item">
                                <span class="nutrition-label">Protein</span>
                                <span class="nutrition-value">${
                                  nutrition.protein
                                }</span>
                            </div>
                            <div class="nutrition-item">
                                <span class="nutrition-label">Carbs</span>
                                <span class="nutrition-value">${
                                  nutrition.carbs
                                }</span>
                            </div>
                            <div class="nutrition-item">
                                <span class="nutrition-label">Fat</span>
                                <span class="nutrition-value">${
                                  nutrition.fat
                                }</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  initModalEvents() {
    if (!this.modal) return;

    // Close modal events
    this.modal.querySelectorAll("[data-close-modal]").forEach((element) => {
      element.addEventListener("click", () => this.close());
    });

    // Escape key to close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });

    // Prevent modal content click from closing modal
    this.modal
      .querySelector(".modal-content")
      .addEventListener("click", (e) => {
        e.stopPropagation();
      });

    // Serving adjuster
    this.initServingAdjuster();

    // Recipe actions
    this.initRecipeActions();

    // Step timers
    this.initStepTimers();
  }

  initServingAdjuster() {
    const servingInput = this.modal.querySelector("#serving-count");
    const servingButtons = this.modal.querySelectorAll(".serving-btn");
    const originalServings = parseInt(this.recipe.servings);

    servingButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.dataset.action;
        let currentValue = parseInt(servingInput.value);

        if (action === "increase" && currentValue < 20) {
          currentValue++;
        } else if (action === "decrease" && currentValue > 1) {
          currentValue--;
        }

        servingInput.value = currentValue;
        this.updateIngredientQuantities(originalServings, currentValue);
      });
    });

    servingInput.addEventListener("change", (e) => {
      const newValue = parseInt(e.target.value);
      if (newValue >= 1 && newValue <= 20) {
        this.updateIngredientQuantities(originalServings, newValue);
      }
    });
  }

  updateIngredientQuantities(originalServings, newServings) {
    const multiplier = newServings / originalServings;
    const ingredientsList = this.modal.querySelector(".ingredients-list");
    const ingredients = ingredientsList.querySelectorAll("li");

    ingredients.forEach((ingredient, index) => {
      const originalText = this.recipe.ingredients[index];
      const updatedText = this.adjustIngredientQuantity(
        originalText,
        multiplier
      );
      ingredient.textContent = updatedText;
    });
  }

  adjustIngredientQuantity(ingredient, multiplier) {
    // Simple regex to find numbers (including fractions and decimals)
    const numberRegex = /(\d+(?:\.\d+)?(?:\/\d+)?)/g;

    return ingredient.replace(numberRegex, (match) => {
      let number = parseFloat(match);
      if (match.includes("/")) {
        const [numerator, denominator] = match.split("/");
        number = parseFloat(numerator) / parseFloat(denominator);
      }

      const adjusted = number * multiplier;

      // Format the result
      if (adjusted < 1 && adjusted > 0) {
        // Convert to fraction for small amounts
        const fraction = this.decimalToFraction(adjusted);
        return fraction;
      } else if (adjusted % 1 === 0) {
        return adjusted.toString();
      } else {
        return adjusted.toFixed(1);
      }
    });
  }

  decimalToFraction(decimal) {
    const tolerance = 1.0e-6;
    let numerator = 1;
    let denominator = 1;
    let x = decimal;

    while (x % 1 !== 0 && Math.abs(x - Math.round(x)) > tolerance) {
      x *= 10;
      denominator *= 10;
    }

    numerator = Math.round(x);

    // Simplify fraction
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const commonDivisor = gcd(numerator, denominator);

    return `${numerator / commonDivisor}/${denominator / commonDivisor}`;
  }

  initRecipeActions() {
    const startCookingBtn = this.modal.querySelector(".start-cooking-btn");
    const printBtn = this.modal.querySelector(".print-recipe-btn");
    const shareBtn = this.modal.querySelector(".share-recipe-btn");

    startCookingBtn?.addEventListener("click", () => {
      this.startCookingMode();
    });

    printBtn?.addEventListener("click", () => {
      this.printRecipe();
    });

    shareBtn?.addEventListener("click", () => {
      this.shareRecipe();
    });
  }

  startCookingMode() {
    // This could open a step-by-step cooking interface
    alert(
      "Cooking mode would open a step-by-step interface with timers and checkboxes!"
    );
  }

  printRecipe() {
    const printContent = this.generatePrintContent();
    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  }

  generatePrintContent() {
    const {
      title,
      ingredients,
      instructions,
      nutrition,
      time,
      servings,
      difficulty,
    } = this.recipe;

    return `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${title} - FlavorCraft Recipe</title>
                <style>
                    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                    h1 { color: #FF6B35; border-bottom: 2px solid #FF6B35; padding-bottom: 10px; }
                    .recipe-meta { display: flex; gap: 20px; margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 8px; }
                    .ingredients { background: #fff; padding: 15px; border-left: 4px solid #FF6B35; margin: 20px 0; }
                    .instructions { margin: 20px 0; }
                    .instructions li { margin-bottom: 10px; line-height: 1.6; }
                    .nutrition { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 20px 0; }
                    .nutrition-item { text-align: center; padding: 10px; background: #f9f9f9; border-radius: 4px; }
                </style>
            </head>
            <body>
                <h1>${title}</h1>
                <div class="recipe-meta">
                    <span><strong>Serves:</strong> ${servings}</span>
                    <span><strong>Time:</strong> ${time}</span>
                    <span><strong>Difficulty:</strong> ${difficulty}</span>
                </div>
                
                <div class="ingredients">
                    <h3>Ingredients</h3>
                    <ul>
                        ${ingredients
                          .map((ingredient) => `<li>${ingredient}</li>`)
                          .join("")}
                    </ul>
                </div>
                
                <div class="instructions">
                    <h3>Instructions</h3>
                    <ol>
                        ${instructions
                          .map((instruction) => `<li>${instruction}</li>`)
                          .join("")}
                    </ol>
                </div>
                
                <div class="nutrition">
                    <div class="nutrition-item">
                        <strong>Calories</strong><br>${nutrition.calories}
                    </div>
                    <div class="nutrition-item">
                        <strong>Protein</strong><br>${nutrition.protein}
                    </div>
                    <div class="nutrition-item">
                        <strong>Carbs</strong><br>${nutrition.carbs}
                    </div>
                    <div class="nutrition-item">
                        <strong>Fat</strong><br>${nutrition.fat}
                    </div>
                </div>
                
                <p style="text-align: center; margin-top: 40px; color: #666;">
                    Recipe from FlavorCraft - ${window.location.origin}
                </p>
            </body>
            </html>
        `;
  }

  shareRecipe() {
    if (navigator.share) {
      navigator.share({
        title: this.recipe.title,
        text: this.recipe.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      const shareText = `Check out this recipe: ${this.recipe.title} - ${window.location.href}`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert("Recipe link copied to clipboard!");
      });
    }
  }

  initStepTimers() {
    const timerButtons = this.modal.querySelectorAll(".step-timer-btn");

    timerButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const stepNumber = btn.dataset.step;
        this.showTimerDialog(stepNumber);
      });
    });
  }

  showTimerDialog(stepNumber) {
    const minutes = prompt(`Set timer for step ${stepNumber} (minutes):`, "5");
    if (minutes && !isNaN(minutes) && minutes > 0) {
      this.startTimer(parseInt(minutes), stepNumber);
    }
  }

  startTimer(minutes, stepNumber) {
    const seconds = minutes * 60;
    let remaining = seconds;

    // Create timer display
    const timerDisplay = document.createElement("div");
    timerDisplay.className = "timer-display";
    timerDisplay.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 10001;
            font-weight: bold;
            text-align: center;
            min-width: 150px;
        `;

    document.body.appendChild(timerDisplay);

    const interval = setInterval(() => {
      const mins = Math.floor(remaining / 60);
      const secs = remaining % 60;
      timerDisplay.innerHTML = `
                Step ${stepNumber} Timer<br>
                ${mins}:${secs.toString().padStart(2, "0")}
            `;

      remaining--;

      if (remaining < 0) {
        clearInterval(interval);
        timerDisplay.innerHTML = `Step ${stepNumber}<br>Time's up!`;
        timerDisplay.style.background = "#e74c3c";

        // Play notification sound (if available)
        try {
          const audio = new Audio(
            "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhDNXh6+vfzTItaDJoAQAAAE3nfuq9mWVjk2qKQZx1QhOQaYqK4jCJb6KJaEhEhDcVCnBXVp+XzJo0+a1RhF+D"
          );
          audio.play();
        } catch (e) {
          // Fallback: browser notification
          if (
            "Notification" in window &&
            Notification.permission === "granted"
          ) {
            new Notification(`FlavorCraft Timer`, {
              body: `Step ${stepNumber} is complete!`,
              icon: "/favicon.ico",
            });
          }
        }

        setTimeout(() => {
          document.body.removeChild(timerDisplay);
        }, 5000);
      }
    }, 1000);
  }

  open() {
    if (!this.modal) return;

    this.isOpen = true;
    document.body.style.overflow = "hidden";
    this.modal.classList.add(CONFIG.CLASSES.ACTIVE);
    this.modal.setAttribute("aria-hidden", "false");

    // Focus the close button for accessibility
    const closeBtn = this.modal.querySelector(".modal-close");
    if (closeBtn) {
      closeBtn.focus();
    }
  }

  close() {
    if (!this.modal) return;

    this.isOpen = false;
    document.body.style.overflow = "";
    this.modal.classList.remove(CONFIG.CLASSES.ACTIVE);
    this.modal.setAttribute("aria-hidden", "true");

    // Remove modal after animation
    setTimeout(() => {
      if (this.modal && this.modal.parentNode) {
        this.modal.parentNode.removeChild(this.modal);
      }
    }, CONFIG.ANIMATION_DURATION);
  }
}

// ================================
// ADDITIONAL FEATURES
// ================================

class BackToTop {
  constructor() {
    this.button = document.getElementById("back-to-top");
    if (!this.button) return;

    this.init();
  }

  init() {
    // Show/hide button based on scroll position
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.toggleVisibility();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Click to scroll to top
    this.button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  toggleVisibility() {
    const shouldShow = window.scrollY > window.innerHeight / 2;
    this.button.classList.toggle(CONFIG.CLASSES.VISIBLE, shouldShow);
  }
}

// Stats animation
class StatsAnimator {
  constructor() {
    this.stats = document.querySelectorAll(".stat-item");
    this.hasAnimated = false;

    if (this.stats.length > 0) {
      this.init();
    }
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.animateStats();
          this.hasAnimated = true;
        }
      });
    });

    this.stats.forEach((stat) => observer.observe(stat));
  }

  animateStats() {
    this.stats.forEach((stat) => {
      const numberElement = stat.querySelector(".stat-number");
      const targetValue = stat.dataset.count;
      const isPercentage = targetValue.includes("%");
      const numericValue = parseInt(targetValue.replace(/[^\d]/g, ""));

      let current = 0;
      const increment = numericValue / 50; // 50 steps
      const duration = 2000; // 2 seconds
      const stepTime = duration / 50;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          current = numericValue;
          clearInterval(timer);
        }

        let displayValue = Math.floor(current);
        if (targetValue.includes("K+")) {
          displayValue =
            displayValue >= 1000
              ? `${Math.floor(displayValue / 1000)}K+`
              : displayValue.toString();
        } else if (isPercentage) {
          displayValue = `${displayValue}%`;
        } else {
          displayValue = `${displayValue}+`;
        }

        numberElement.textContent = displayValue;
      }, stepTime);
    });
  }
}

// ================================
// INITIALIZATION
// ================================

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", () => {
  // Request notification permission
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }

  // Initialize all components
  new Navigation();
  new RecipeCarousel(".recipe-carousel");
  new RecipeManager();
  new BackToTop();
  new StatsAnimator();

  // Initialize service worker for PWA features (if available)
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch((err) => {
      console.log("Service Worker registration failed:", err);
    });
  }

  // Add loading class removal after page load
  window.addEventListener("load", () => {
    document.body.classList.remove("loading");
  });

  console.log("🍽️ FlavorCraft initialized successfully!");
});

// ================================
// GLOBAL ERROR HANDLING
// ================================

window.addEventListener("error", (e) => {
  console.error("FlavorCraft Error:", e.error);
  // Could send error to analytics service here
});

// Handle unhandled promise rejections
window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled Promise Rejection:", e.reason);
  e.preventDefault();
});

// ================================
// EXPORT FOR TESTING (if needed)
// ================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    Navigation,
    RecipeCarousel,
    RecipeManager,
    RecipeModal,
    BackToTop,
    StatsAnimator,
  };
}
