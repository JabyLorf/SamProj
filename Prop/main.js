document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to log out?')) {
                // Simulate logout (e.g., clear session, tokens)
                alert('Logged out successfully!');
                window.location.href = 'index.html'; // Redirect to login page
            }
        });
    }

    // Logic for topic-detail.html
    if (window.location.pathname.includes('topic-detail.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const topicId = urlParams.get('id');
        if (topicId) {
            document.getElementById('topicIdDisplay').textContent = `Topic ${topicId}`;
            document.getElementById('topicTitle').textContent = `Details for Topic ${topicId}`;
        }
    }
});
