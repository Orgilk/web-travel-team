class NumLikes extends HTMLElement {
    constructor() {
        super();
        console.log("constructing numlikes")
        this.liked = false;
    }

    connectedCallback() {
        this.lks = this.getAttribute("likes") || 0;
        this.#render();
    }

    btnLiked() {
        this.liked ? --this.lks : ++this.lks;
        
        this.liked = !this.liked;
        // this.parentElement.parentElement.likeClicked(this.liked);
        
        const evnt = new CustomEvent("numBtnLiked", { detail: { liked: this.liked } });
        this.parentElement.parentElement.dispatchEvent(evnt);

        //componentoo dahij zurahgui iluu sain arga
        this.querySelector("span").innerText = this.lks;

        //componentoo dahiad ehnees ni zurna
        // this.#render();
    }
    #render() {
        console.log("rendering...")
        this.innerHTML= `
        <button>💓
            <span>${this.lks}</span>
        </button>`;
        this.querySelector("button").addEventListener("click", this.btnLiked.bind(this));

    }

    disconnectedCallback() {

    }

    attributeChangedCallback(name, oldVal, newVal) {

    }

    adoptedCallback() {

    }

}

window.customElements.define('num-likes', NumLikes);