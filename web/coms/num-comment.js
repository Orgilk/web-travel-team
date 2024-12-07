class NumComment extends HTMLElement {
    constructor() {
        super();
        this.liked = false;
    }

    connectedCallback() {
        this.cmnt = this.getAttribute("body") || 'хоосон cmnt';
        this.lks = this.getAttribute("likes") || 0;
        this.#render();

        /*zuvhun uur luu ni ilgeesen numBtnLiked eventiig huleen avna
           iim component olon baigaa bol tohiromjtoi
        */this.addEventListener("numBtnLiked", e => {
            console.log(e.detail.liked+"**********");
            this.liked = e.detail.liked;
            this.querySelector("article").className = e.detail.liked ? "liked" : "";
        })

        /*window object ruu ilgesen buh numBtnLiked eventiig bolovsrulna
           iim component gants baigaa ued iluu tohiromjtoi.
        */
        // window.addEventListener("numBtnLiked", e => {
        //     console.log(e.detail.liked + "**********");
        //     this.liked = e.detail.liked;
        //     this.querySelector("article").className = e.detail.liked ? "liked" : "";
        // })
    }

    #render() {
        this.innerHTML =
            `<article class=${this.liked ? "liked" : ""}>
                <h4>${this.cmnt}</h4>
                <p>2024.12.03</p>
                <num-likes likes="${this.lks}" ></num-likes>
            </article>`;
    }
    likeClicked(lkd) {
        this.liked = lkd;
        this.liked ? --this.lks : ++this.lks;
        this.#render();
    }
    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }

    adoptedCallback() {
    }

}

window.customElements.define('num-comment', NumComment);