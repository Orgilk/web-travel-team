class MnPost extends HTMLElement {
    constructor() {
        super();
        
    }
    react(reacted) { 
        this.querySelector("article")
            .className = reacted ? "reacted" : "";
    }

    onReaction(evnt) {

        //buh post componentuud ene eventiig huleej avah buguud 
        //uurtuu ilgeegdsen(ooriin id tai eventeer damjuulsan id ni tentsuu baih)  baival 
        //hariu uildel uzuulj class dotroo reacted gedeg classiig zalgana.
        if (evnt.detail.target == this.id) { 
            let classname=""
            if (evnt.detail.reacted)
                classname = "reacted";
            this.querySelector("article").className = classname;
        }
            
    }

    #render() { 
        this.innerHTML = `
        <article>
            <h3>${this.title}</h3>
            <p>${this.body}</p>
            <mn-reaction cnt="23" icon="💓" ownerid="${this.id}"></mn-reaction>
            <mn-reaction cnt="13" icon="👎🏻" ownerid="${this.id}"></mn-reaction>
            <mn-reaction cnt="1" icon="📄" ownerid="${this.id}"></mn-reaction>
        </article>`;
    }
    connectedCallback() {
        this.id = this.getAttribute("id") || 0;
        this.title = this.getAttribute("garchig") || "Гарчиггүй"
        this.body = this.getAttribute("body") || "...";
        this.lks = this.getAttribute("likes") || 0;

        this.#render();
        window.addEventListener("mn-reaction", this.onReaction.bind(this))
    }

    disconnectedCallback() {
    
    }

    attributeChangedCallback(name, oldVal, newVal) {
    
    }

    adoptedCallback() {
    
    }

}

window.customElements.define('mn-post', MnPost);