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
              <link rel="stylesheet" href="../css/styles.css">
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
