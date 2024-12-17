class HighlightSection extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // Retrieve attributes for dynamic content
        const title1 = this.getAttribute('title1') || 'Default Title 1';
        const desc1 = this.getAttribute('desc1') || 'Default description 1';
        const title2 = this.getAttribute('title2') || 'Default Title 2';
        const desc2 = this.getAttribute('desc2') || 'Default description 2';
        const iframeSrc = this.getAttribute('iframe-src') || '';

        // Render the content
        this.shadowRoot.innerHTML = `
            <style>
                .highlights-grid {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                }
                .highlight-card {
                    background-color: #f9f9f9;
                    border-radius: 8px;
                    padding: 1rem;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }
                iframe {
                    border-radius: 8px;
                    border: none;
                }
            </style>
            <section>
                <div class="highlights-grid">
                    <div class="highlight-card">
                        <h3>${title1}</h3>
                        <p>${desc1}</p>
                    </div>
                    <div class="highlight-card">
                        <h3>${title2}</h3>
                        <p>${desc2}</p>
                    </div>
                    <div class="highlight-card">
                        <iframe width="100%" height="150" src="${iframeSrc}" 
                            title="Embedded Content" frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </section>
        `;
    }
}

// Define the custom element
customElements.define('highlight-section', HighlightSection);
