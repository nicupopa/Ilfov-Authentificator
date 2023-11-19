var objPeople = [
  {
    username: "nicu",
    password: "mihaiteiubesc"
  },
  // ... (other users)
];

function getInfo(username, password) {

  const user = userCredentials.find(
    cred => objPeople.username === username && objPeople.password === password
  );

  if (user) {
    // Redirect to the next page upon successful login
    window.location.href = '2.html'; // Replace 'next_page_url' with the URL of the next page
  } else {
    // Handle incorrect credentials or display an error message
    alert('Invalid username or password. Please try again.');
  }
}

function saveLog(logEntry) {
  // Retrieve logs from localStorage
  var logs = JSON.parse(localStorage.getItem('logs')) || [];

  // Push the new log entry
  logs.push(logEntry);

  // Save the updated logs back to localStorage
  localStorage.setItem('logs', JSON.stringify(logs));
}

function logout() {
  // Clear data from localStorage
  localStorage.removeItem('logs');

  // Go back to the previous page
  window.history.back();
}

// Retrieve and log saved logs on page load
document.addEventListener('DOMContentLoaded', function() {
  var logs = localStorage.getItem('logs');
  if (logs) {
    logs = JSON.parse(logs);
    logs.forEach(function(log) {
      console.log(log);
    });
  }
});
