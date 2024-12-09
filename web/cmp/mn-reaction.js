class MnReaction extends HTMLElement {
    constructor() {
        super();
        this.reacted = false;
    }

    #render(){
        this.innerHTML =`
        <button>
            ${this.zurag}
            <span>${this.count}</span>
        </button>`;
    }
    connectedCallback() {
        this.count = this.getAttribute("cnt") || 0;
        this.zurag = this.getAttribute("icon") || "👍🏻";
        this.oid = this.getAttribute("ownerid") || 0;
        this.#render();
        this.querySelector("button")
            .addEventListener("click", this.reactionClicked.bind(this));
    }

    reactionClicked() { 
        this.reacted ? this.count-- : this.count++;
        this.reacted = !this.reacted;
        this.querySelector("button span").innerText = this.count;
        
        //uuriin aguulj baigaa componentiin public method iig ni duudah
        // this.parentElement.parentElement.react(this.reacted);
        
        //niit event huleej avahaar burtguulsen componentuud ruu ilgeeh
        const evnt = new CustomEvent("mn-reaction", { detail: { reacted:this.reacted, target: this.oid } });
        window.dispatchEvent(evnt);
    }
    
    disconnectedCallback() {

    }
    attributeChangedCallback(name, oldVal, newVal) {

    }

    
    adoptedCallback() {

    }


}

window.customElements.define('mn-reaction', MnReaction);