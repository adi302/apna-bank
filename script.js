// script.js
const BASE_URL = 'https://apna-bank-i5zq.vercel.app/'; // Replace with your actual backend URL


document.addEventListener('DOMContentLoaded', function () {
  // ... logic trimmed for brevity ...
  function showNotification(msg, type = 'info') {
    const note = document.createElement('div');
    note.className = `notification ${type}`;
    note.textContent = msg;
    document.body.appendChild(note);
    setTimeout(() => note.remove(), 3000);
  }
});
