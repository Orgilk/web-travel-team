class HeroSection extends HTMLElement {
    constructor () {
      super()
      this.bgImages = []
      this.currentIndex = 0
      this.name = ''
      this.desc = ''
    }
  
    connectedCallback () {
      const styleLink = document.createElement('link')
      styleLink.setAttribute('rel', 'stylesheet')
      styleLink.setAttribute('href', './css/styles.css')
      this.appendChild(styleLink) 
  
      const bgImagesAttr = this.getAttribute('data-bg-images')
      const nameAttr = this.getAttribute('name')
      const descAtr = this.getAttribute('desc')
  
      if (bgImagesAttr) {
        this.bgImages = bgImagesAttr.split(',')
      }
      if (nameAttr) {
        this.name = nameAttr 
      }
      if (descAtr) {
        this.desc = descAtr 
      }
  
      this.innerHTML = `
    <header id="hero-section" class="home-main" data-bg-images="${bgImagesAttr}">
                  <section class="destination-overview">
                      <!-- Slot hero-title -->
                      <slot name="hero-title">
                          <h1 style="font-size: 60px; color: white;">${this.name}</h1>
                      </slot>
                      <!-- Slot hero-description -->
                      <slot name="hero-description" class="hero-desc">
                          <h5 class="hero-desc" style="font-size: 30px; color: white; text-align: center;">${this.desc}</h5>
                      </slot> 
                  </section>
              </header>
          `
      this.style.backgroundImage = `url(${this.bgImages[this.currentIndex]})`
      this.style.backgroundSize = 'cover'
      this.style.backgroundPosition = 'center'
      this.style.height = '100vh'
      this.style.width = '100%'
      this.style.display = 'block'
  
      this.bgImages.forEach(src => {
        const img = new Image()
        img.src = src
      })
  
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.bgImages.length
        this.style.backgroundImage = `url(${this.bgImages[this.currentIndex]})`
  
        this.classList.add('animate-bg')
        setTimeout(() => {
          this.classList.remove('animate-bg')
        }, 500) 
      }, 5000) 
    }
  }
  window.customElements.define('hero-section', HeroSection)
  