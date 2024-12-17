class ReviewsSection extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <section class="reviews-section">
                <h2>Аяллын Сэтгэгдэл</h2>
                <div class="reviews-grid"></div>
                <div class="comment-section">
                    <h3>Сэтгэгдэл үлдээх</h3>
                    <form id="comment-form">
                        <input type="text" id="name-box" placeholder="Таны нэр" required>
                        <textarea id="comment-box" rows="4" placeholder="Сэтгэгдэлээ энд бичнэ үү..." required></textarea>
                        <button type="submit">Илгээх</button>
                    </form>
                    <div id="comment-error">Нэр болон сэтгэгдэл бичих шаардлагатай!</div>
                </div>
            </section>
        `;
        this.init();
    }

    // Load comments from localStorage
    loadComments(reviewsGrid) {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.forEach(comment => this.addCommentToGrid(comment.name, comment.text));
    }

    init() {
        const commentForm = this.querySelector('#comment-form');
        const nameBox = this.querySelector('#name-box');
        const commentBox = this.querySelector('#comment-box');
        const commentError = this.querySelector('#comment-error');
        const reviewsGrid = this.querySelector('.reviews-grid');

        // Load comments from localStorage
        this.loadComments(reviewsGrid);

        // Save comments to localStorage
        const saveComment = (name, text) => {
            const comments = JSON.parse(localStorage.getItem('comments')) || [];
            comments.push({ name, text });
            localStorage.setItem('comments', JSON.stringify(comments));
            console.log('Comments saved: ', comments); // Debugging line
        };

        // Remove a comment from localStorage
        const removeComment = (name, text) => {
            const comments = JSON.parse(localStorage.getItem('comments')) || [];
            const updatedComments = comments.filter(comment => comment.name !== name || comment.text !== text);
            localStorage.setItem('comments', JSON.stringify(updatedComments));
        };

        // Add a comment to the grid
        const addCommentToGrid = (name, text) => {
            const newReview = document.createElement('div');
            newReview.classList.add('review-card');
            newReview.innerHTML = `
                <p>"${text}"</p>
                <p class="reviewer new">- ${name}</p>
                <button class="remove-btn" style="background-color: orange; color: white; border: none; padding: 0.5rem; cursor: pointer; border-radius: 4px;">Устгах</button>
            `;
            const removeBtn = newReview.querySelector('.remove-btn');
            removeBtn.addEventListener('click', () => {
                reviewsGrid.removeChild(newReview);
                removeComment(name, text);
            });
            reviewsGrid.appendChild(newReview);
        };

        // Handle form submission
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log("Form submitted");  // Check if the form is being submitted
            const nameText = nameBox.value.trim();
            const commentText = commentBox.value.trim();
            console.log("nameText:", nameText, "commentText:", commentText);  // Check the input values
            if (nameText === '' || commentText === '') {
                commentError.style.display = 'block';
            } else {
                commentError.style.display = 'none';
                addCommentToGrid(nameText, commentText);
                saveComment(nameText, commentText);
                nameBox.value = '';
                commentBox.value = '';
            }
        });
        
    }
}

// Define the custom element
window.customElements.define('reviews-section', ReviewsSection);
