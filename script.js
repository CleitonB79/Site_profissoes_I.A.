class LanguageManager {
  constructor() {
    this.currentLang = "pt"
    this.init()
  }

  init() {
    const langToggle = document.getElementById("langToggle")
    langToggle.addEventListener("click", () => this.toggleLanguage())
    this.updateContent()
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === "pt" ? "en" : "pt"
    this.updateContent()

    const langBtn = document.getElementById("langToggle")
    const langText = langBtn.querySelector(".lang-text")
    langText.textContent = this.currentLang === "pt" ? "EN" : "PT"
  }

  updateContent() {
    const elements = document.querySelectorAll("[data-pt][data-en]")
    elements.forEach((element) => {
      const text = element.getAttribute(`data-${this.currentLang}`)
      if (text) {
        element.textContent = text
      }
    })

    document.documentElement.lang = this.currentLang === "pt" ? "pt-BR" : "en"
  }
}

class CareerCarousel {
  constructor() {
    this.currentSlide = 0
    this.slides = document.querySelectorAll(".slide")
    this.indicators = document.querySelectorAll(".indicator")
    this.totalSlides = this.slides.length
    this.autoPlayInterval = null
    this.isExpanded = false

    this.init()
  }

  init() {
    document.getElementById("prevBtn").addEventListener("click", () => this.prevSlide())
    document.getElementById("nextBtn").addEventListener("click", () => this.nextSlide())

    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => this.goToSlide(index))
    })

    document.querySelectorAll(".expand-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => this.toggleExpand(e))
    })

    this.startAutoPlay()

    document.querySelector(".carousel-container").addEventListener("mouseenter", () => {
      this.stopAutoPlay()
    })

    document.querySelector(".carousel-container").addEventListener("mouseleave", () => {
      this.startAutoPlay()
    })
  }

  goToSlide(index) {
    this.slides[this.currentSlide].classList.remove("active")
    this.indicators[this.currentSlide].classList.remove("active")

    this.currentSlide = index

    this.slides[this.currentSlide].classList.add("active")
    this.indicators[this.currentSlide].classList.add("active")

    this.resetExpand()

    this.animateSlideContent()
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.totalSlides
    this.goToSlide(nextIndex)
  }

  prevSlide() {
    const prevIndex = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides
    this.goToSlide(prevIndex)
  }

  toggleExpand(e) {
    const currentSlideElement = this.slides[this.currentSlide]
    const description = currentSlideElement.querySelector(".career-description")
    const fullDescription = currentSlideElement.querySelector(".career-full-description")
    const button = e.target

    if (this.isExpanded) {
      description.style.display = "block"
      fullDescription.classList.add("hidden")
      button.textContent = button.getAttribute("data-pt") || "Saiba Mais"
      this.isExpanded = false
    } else {
      description.style.display = "none"
      fullDescription.classList.remove("hidden")
      button.textContent = button.getAttribute("data-pt") === "Saiba Mais" ? "Ver Menos" : "See Less"
      this.isExpanded = true
    }
  }

  resetExpand() {
    this.slides.forEach((slide) => {
      const description = slide.querySelector(".career-description")
      const fullDescription = slide.querySelector(".career-full-description")
      const button = slide.querySelector(".expand-btn")

      description.style.display = "block"
      fullDescription.classList.add("hidden")
      button.textContent = button.getAttribute("data-pt") || "Saiba Mais"
    })
    this.isExpanded = false
  }

  animateSlideContent() {
    const currentSlideContent = this.slides[this.currentSlide].querySelector(".slide-content")
    currentSlideContent.style.animation = "none"
    setTimeout(() => {
      currentSlideContent.style.animation = "slideInUp 1s ease-out"
    }, 50)
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide()
    }, 6000)
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval)
      this.autoPlayInterval = null
    }
  }
}

class FloatingNavigation {
  constructor() {
    this.nav = document.getElementById("floatingNav")
    this.lastScrollY = window.scrollY
    this.init()
  }

  init() {
    window.addEventListener("scroll", () => this.handleScroll())

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        this.setActiveLink(link)
        this.scrollToSection(link.getAttribute("href"))
      })
    })
  }

  handleScroll() {
    const currentScrollY = window.scrollY

    if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
      // Scrolling down
      this.nav.classList.add("hidden")
    } else {
      // Scrolling up
      this.nav.classList.remove("hidden")
    }

    this.lastScrollY = currentScrollY

    // Update active nav link based on scroll position
    this.updateActiveNavLink()
  }

  updateActiveNavLink() {
    const sections = ["ai-intro", "carouselContainer"]
    const scrollPosition = window.scrollY + 200

    sections.forEach((sectionId, index) => {
      const section = document.getElementById(sectionId)
      if (section) {
        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          const navLinks = document.querySelectorAll(".nav-link")
          navLinks.forEach((link) => link.classList.remove("active"))

          if (index === 0) {
            document.querySelector('[href="#ai-intro"]').classList.add("active")
          } else {
            document.querySelector('[href="#careers"]').classList.add("active")
          }
        }
      }
    })
  }

  setActiveLink(activeLink) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active")
    })
    activeLink.classList.add("active")
  }

  scrollToSection(href) {
    let targetId
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    } else if (href === "#ai-intro") {
      targetId = "ai-intro"
    } else if (href === "#careers") {
      targetId = "carouselContainer"
    }

    const target = document.getElementById(targetId)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  }
}

function initScrollIndicator() {
  const scrollIndicator = document.querySelector(".scroll-indicator")
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const carouselContainer = document.getElementById("carouselContainer")
      if (carouselContainer) {
        carouselContainer.scrollIntoView({ behavior: "smooth" })
      }
    })
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new LanguageManager()
  new CareerCarousel()
  new FloatingNavigation()
  initScrollIndicator()

  document.documentElement.style.scrollBehavior = "smooth"

  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease-in-out"
    document.body.style.opacity = "1"
  }, 100)
})

window.addEventListener("resize", () => {
  console.log("Window resized")
})

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    document.getElementById("prevBtn").click()
  } else if (e.key === "ArrowRight") {
    document.getElementById("nextBtn").click()
  }
})
