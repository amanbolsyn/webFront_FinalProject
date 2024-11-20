//Manages navigation witing nav usin keyboard
document.addEventListener("DOMContentLoaded", () => {
    setupKeyboardNavigation();
});


//Manages navigation within nav using keyboard 
function setupKeyboardNavigation() {
    const navItems = document.querySelectorAll("#navMenu .nav-link");
    let currentIndex = 0;

    // Set focus to the first item initially
    navItems[currentIndex].focus();

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
            // Move to the next item
            currentIndex = (currentIndex + 1) % navItems.length;
            navItems[currentIndex].focus();
            event.preventDefault(); // Prevent default scrolling behavior
        } else if (event.key === "ArrowUp") {
            // Move to the previous item
            currentIndex = (currentIndex - 1 + navItems.length) % navItems.length;
            navItems[currentIndex].focus();
            event.preventDefault(); // Prevent default scrolling behavior
        }
    });
}



document.getElementById('myForm').addEventListener('submit', function(event) {
    let valid = true;

    // Clear previous error messages
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirmError').textContent = '';
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'none'; // Hide success message initially

    // Email validation
    const email = document.getElementById('email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Invalid email format.';
        valid = false;
    }

    // Password validation
    const password = document.getElementById('password').value;
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long.';
        valid = false;
    }

    // Confirm password validation
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        document.getElementById('confirmError').textContent = 'Passwords do not match.';
        valid = false;
    }

    // If valid, show success message
    if (valid) {
        event.preventDefault(); // Prevent actual form submission
        successMessage.style.display = 'block'; // Show success message
        successMessage.classList.add('fade-in'); // Add fade-in class for animation
        // Optionally, clear the form fields after success
        document.getElementById('myForm').reset();
    }

    // If any validation fails, prevent form submission
    if (!valid) {
        event.preventDefault();
    }
});

function submitQuiz() {
    var totalQuestions = 7;
    var score = 0;
    var answers = {
        q1: 2, // Avocados
        q2: 2, // Spaghetti
        q3: 3, // Anchovies
        q4: 3, // Soy sauce
        q5: 1, // Limes
        q6: 2, // Ratatouille
        q7: 1  // Miso paste
    };

    // Loop through each question and check the selected answer
    var correctAnswersList = document.getElementById("correct-answers-list");
    correctAnswersList.innerHTML = ''; // Clear the list first

    for (var i = 1; i <= totalQuestions; i++) {
        var question = document.querySelector(`input[name="q${i}"]:checked`);
        var correctAnswer = answers[`q${i}`];
        var questionDiv = document.querySelector(`.question:nth-of-type(${i})`);

        if (question) {
            if (parseInt(question.value) === correctAnswer) {
                score++;
                // Add the question to the correct answers list
                var listItem = document.createElement("li");
                listItem.textContent = `Q${i}: ${questionDiv.querySelector('p').textContent.trim()}`;
                correctAnswersList.appendChild(listItem);
            }
        }
    }

    // Show the result
    var resultDiv = document.getElementById("quiz-result");
    var scoreText = document.getElementById("score");
    var feedbackText = document.getElementById("feedback");

    scoreText.textContent = `You scored ${score} out of ${totalQuestions}.`;

    // Provide feedback
    if (score === totalQuestions) {
        feedbackText.textContent = "Excellent! You really know your recipes!";
    } else if (score >= 5) {
        feedbackText.textContent = "Good job! You're quite knowledgeable about recipes.";
    } else {
        feedbackText.textContent = "Keep practicing! You can do better next time.";
    }

    resultDiv.style.display = "block";
}


// Function to handle registration
document.getElementById('myForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    // Validate form fields
    if (password !== confirmPassword) {
        document.getElementById('confirmError').textContent = 'Passwords do not match!';
        return;
    }

    // Store user data in localStorage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);

    // Display success message
    document.getElementById('successMessage').style.display = 'block';

    // Redirect to login page after 2 seconds
    setTimeout(function () {
        window.location.href = 'login.html';
    }, 2000);
});

// Function to handle login
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    let loginEmail = document.getElementById('loginEmail').value;
    let loginPassword = document.getElementById('loginPassword').value;

    // Get stored credentials from localStorage
    let storedEmail = localStorage.getItem('userEmail');
    let storedPassword = localStorage.getItem('userPassword');

    // Validate login credentials
    if (storedEmail && storedPassword) {
        if (loginEmail === storedEmail && loginPassword === storedPassword) {
            // Redirect to profile page if credentials match
            window.location.href = 'profile.html';
        } else {
            // Display error message if credentials do not match
            document.getElementById('loginError').textContent = 'Invalid email or password';
        }
    } else {
        // Inform the user if no user data is found in localStorage
        document.getElementById('loginError').textContent = 'No registered users found. Please sign up first.';
    }
});


// Logout functionality
function logout() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
    window.location.href = 'login.html'; // Redirect to login page after logout
}





