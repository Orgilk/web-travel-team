// import { calculateTotalPrice, updateCartCount } from './utils.js';
import { jsonData } from './travelData.js'
import {
  handleOptionCardClick,
  updatePeopleCount,
  processBooking,
  calculateTotalPrice
} from './eventHandler.js'

class BookingSection extends HTMLElement {
  constructor () {
    super()
    this.selectedOptions = { duration: 0, hotel: 0, meal: 0, transport: 0 }
    this.peopleCount = { adults: 0, children: 0 }
    this.attachShadow({ mode: 'open' })
    this.itenary = new Map() // Initialize the itenary map
  }

  connectedCallback () {
    this.render()
    this.attachEventListeners()
    this.loadOptionsData()
  }

  get jsonData () {
    return jsonData
  }

  async loadOptionsData () {
    try {
      this.render()
      this.attachEventListeners()
    } catch (error) {
      console.error('Error loading JSON data:', error)
    }
  }

  render () {
    const direction = this.getAttribute('direction')
    const selectedDirection = this.jsonData.travelDirections.find(
      item => item.direction === direction
    )
    if (!selectedDirection) {
      console.error('Direction not found')
      return
    }

    this.optionsData = selectedDirection
    this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./css/styles.css">
            <style>
                .option-card { cursor: pointer; }
                .booking-selection { display: none; }
            </style>
            <section class="package-details">
                <div class="package-columns">
                    <div class="map">
                        <iframe src="${
                          this.optionsData.map
                        }" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                    <div class="booking-container">
                        ${this.optionsData.bookingSections
                          .map(section =>
                            this.createBookingSection(
                              section.title,
                              section.id,
                              section.options
                            )
                          )
                          .join('')}
                        <div class="booking-section">
                            <h2>👨‍👩‍👧‍👦 Хүмүүсийн Тоо</h2>
                            <div class="option-grid">
                                <div>
                                    <label>Насанд Хүрэгчид:</label>
                                    <input type="number" id="adult-count" value="0" min="0" class="input-number" />
                                </div>
                                <div>
                                    <label>Хүүхэд:</label>
                                    <input type="number" id="child-count" value="0" min="0" class="input-number" />
                                </div>
                            </div>
                        </div>
                        <div class="total-price" id="totalPrice">Нийт үнэ: 0₮</div>
                        <button id="bookBtn" class="booking-button">Захиалах</button>
                    </div>
                </div>
            </section>
        `
  }

  createBookingSection (title, type, options) {
    // Create an object with booking data
    const sectionData = {
      title,
      type,
      options: options.map(option => ({
        text: option.text,
        desc: option.desc,
        price: option.price,
        images: option.images || []
      }))
    }

    // Add the section data to the itenary map using title as the key
    this.itenary.set(title, sectionData)

    return `
            <div class="booking-section">
                <h2>${title}</h2>
                <div class="option-grid">
                    ${options
                      .map(
                        option => `
                        <div class="option-card" data-type="${type}" data-price="${
                          option.price
                        }">
                            <h3>${option.text}</h3>
                            <p>${option.desc}</p>
                            <p>Үнэ: ${option.price.toLocaleString()}₮</p>
                            <div class="booking-selection" style="display: none;">
                                ${
                                  option.images
                                    ? option.images
                                        .map(
                                          image => `
                                    <img src="${image}" alt="Option image" class="booking-image">
                                `
                                        )
                                        .join('')
                                    : ''
                                }
                            </div>
                        </div>
                    `
                      )
                      .join('')}
                </div>
            </div>
        `
  }

  attachEventListeners () {
    this.shadowRoot.querySelectorAll('.option-card').forEach(card => {
      card.addEventListener('click', event =>
        handleOptionCardClick(event, this)
      )
    })

    this.shadowRoot
      .getElementById('adult-count')
      .addEventListener('input', () => {
        updatePeopleCount(this)
        calculateTotalPrice(this) // Recalculate price when people count changes
      })
    this.shadowRoot
      .getElementById('child-count')
      .addEventListener('input', () => {
        updatePeopleCount(this)
        calculateTotalPrice(this) // Recalculate price when people count changes
      })
    this.shadowRoot
      .getElementById('bookBtn')
      .addEventListener('click', () => processBooking(this))
  }
}

customElements.define('booking-section', BookingSection)

export default BookingSection
