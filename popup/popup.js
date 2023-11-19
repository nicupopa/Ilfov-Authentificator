document.addEventListener('DOMContentLoaded', function () {
    let data;

    function saveDataToStorage() {
        if (chrome.storage && chrome.storage.local) {
            chrome.storage.local.set({ 'myExtensionData': data }, function () {
                console.log('Data saved to storage');
            });
        }
    }

    function showSlide(slideId) {
        document.querySelectorAll('.slide').forEach(slide => {
            slide.classList.remove('visible');
        });

        document.getElementById(slideId).classList.add('visible');
    }

    function togglePasswordVisibility(inputId, checkboxId) {
        var passwordField = document.getElementById(inputId);
        var showPasswordCheckbox = document.getElementById(checkboxId);

        showPasswordCheckbox.addEventListener('change', function () {
            passwordField.type = this.checked ? 'text' : 'password';
        });
    }

    function addEntry(url, username, password) {
        if (!data || !data.hasOwnProperty('database')) {
            data = { database: [] };
        }

        var entryExists = data.database.some(entry => entry.url === url && entry.username === username);

        if (entryExists) {
            console.log(`Entry already exists: URL - ${url}, Username - ${username}`);
        } else {
            data.database.push({ url: url, username: username, password: password });
            saveDataToStorage();
            console.log(`Entry added: URL - ${url}, Username - ${username}, Password - ${password}`);
        }

        showSlide('initialSlide');
    }

    function updatePassword(url, username, oldPassword, newPassword) {
        if (!data || !data.hasOwnProperty('database')) {
            data = { database: [] };
        }

        var entryIndex = data.database.findIndex(entry => entry.url === url && entry.username === username);

        if (entryIndex !== -1 && data.database[entryIndex].password === oldPassword) {
            data.database[entryIndex].password = newPassword;
            saveDataToStorage();
            console.log(`Password updated: URL - ${url}, Username - ${username}, New Password - ${newPassword}`);
        } else {
            console.log(`Invalid old password or user not found - URL: ${url}, Username: ${username}`);
        }

        showSlide('initialSlide');
    }

    // Button click event handlers
    document.getElementById('addEntryBtn').addEventListener('click', function () {
        showSlide('addEntrySlide');
    });

    document.getElementById("goBack").addEventListener('click', function () {
        showSlide('initialSlide');
    })

    document.getElementById("goBack1").addEventListener('click', function () {
        showSlide('initialSlide');
    })

    document.getElementById("goBack2").addEventListener('click', function () {
        showSlide('selectUserSlide');
    })

    document.getElementById("goBack3").addEventListener('click', function () {
        showSlide('loginUpdateSlide');
    })

    document.getElementById('addEntry').addEventListener('click', function () {
        var url = document.getElementById('url').value;
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        addEntry(url, username, password);
    });

    document.getElementById('selectUserBtn').addEventListener('click', function () {
        // Assuming userList is populated with user names
        var userList = document.getElementById('userList');
        userList.innerHTML = '';

        if (data && data.hasOwnProperty('database')) {
            data.database.forEach(entry => {
                var listItem = document.createElement('li');
                listItem.textContent = entry.username;

                listItem.addEventListener('click', function () {
                    showSlide('loginUpdateSlide');
                });

                userList.appendChild(listItem);
            });
        }

        showSlide('selectUserSlide');
    });

    document.getElementById('updatePasswordBtn').addEventListener('click', function () {
        var url = document.getElementById('url').value; // You may need to adjust this based on your data structure
        var username = document.getElementById('username').value; // You may need to adjust this based on your data structure
        var oldPassword = document.getElementById('oldPassword').value;
        var newPassword = document.getElementById('newPassword').value;

        updatePassword(url, username, oldPassword, newPassword);
    });

    document.getElementById('loginBtn').addEventListener('click', function () {
        // Placeholder for login functionality
        console.log('Login button clicked. Performing auto-fill.');
        window.close();
    });

    document.getElementById('updatePasswordRedirectBtn').addEventListener('click', function () {
        showSlide('updatePasswordSlide');
    });

    // Call the function to enable "Show Password" for password input fields
    togglePasswordVisibility('password', 'showPassword');
    togglePasswordVisibility('newPassword', 'showNewPassword');

    // Load data from storage when the popup is opened
    if (chrome.storage && chrome.storage.local) {
        chrome.storage.local.get('myExtensionData', function (result) {
            if (result && result.myExtensionData) {
                data = result.myExtensionData;
                console.log('Data loaded from storage:', data);
            }
        });

        chrome.storage.onChanged.addListener(function (changes) {
            if (changes.myExtensionData) {
                data = changes.myExtensionData.newValue;
                console.log('Data updated from storage:', data);
            }
        });
    } 
    else {
        // console.error('Error: chrome.storage.local is not available');
    }


});