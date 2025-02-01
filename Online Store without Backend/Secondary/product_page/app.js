// scripts.js
document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', function() {
        let rating = this.getAttribute('data-value');
        console.log('Rated:', rating);
        alert('You rated this product ' + rating + ' stars.');
        highlightStars(rating);
    });

    star.addEventListener('mouseover', function() {
        let rating = this.getAttribute('data-value');
        console.log('Mouseover:', rating);
        highlightStars(rating);
    });

    star.addEventListener('mouseout', function() {
        console.log('Mouseout');
        highlightStars(0);  // Reset stars on mouse out
    });
});

function highlightStars(rating) {
    console.log('Highlighting stars up to:', rating);
    document.querySelectorAll('.star').forEach(star => {
        star.style.color = star.getAttribute('data-value') <= rating ? '#ffd700' : '#888';
    });
}

function addReview() {
    let name = document.getElementById('reviewer-name').value;
    let text = document.getElementById('review-text').value;
    if (name && text) {
        let reviewContainer = document.createElement('div');
        reviewContainer.classList.add('review');
        reviewContainer.innerHTML = `<strong>${name}</strong><p>${text}</p>`;
        document.getElementById('reviews').appendChild(reviewContainer);
        document.getElementById('reviewer-name').value = '';
        document.getElementById('review-text').value = '';
    } else {
        alert('Please enter both your name and review.');
    }
}
