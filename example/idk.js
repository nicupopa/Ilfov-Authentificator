var objPeople = [
  {
    username: "nicu",
    password: "mihaiteiubesc"
  },
  // ... (other users)
];

function getInfo() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  for (var i = 0; i < objPeople.length; i++) {
    if (username == objPeople[i].username && password == objPeople[i].password) {
      // Save a log in localStorage
      saveLog(username + " logged in");
      console.log(username + " e bazat");

      // Redirect to page2.html
      window.location.href = "2.html";
      return;
    }
  }

  console.log("waaaaaaa");
  // Redirect to page2.html even if the credentials are incorrect (for demonstration purposes)
  window.location.href = "2.html";
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
