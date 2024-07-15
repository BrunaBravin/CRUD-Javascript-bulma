document.addEventListener('DOMContentLoaded', function() {
    const userName = localStorage.getItem('loggedInUser');

    if (userName) {
      document.getElementById('user-name').textContent = userName;
    } else {
      window.location.href = 'login.html';
    }
     document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
      });
  });