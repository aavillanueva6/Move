<<<<<<< HEAD
const signupFormHandler = async (event) => {
  event.preventDefault();

=======

const signupFormHandler = async (event) => {
  event.preventDefault();

>>>>>>> a83a11e (adding assets)
  const username = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

<<<<<<< HEAD
=======


>>>>>>> a83a11e (adding assets)
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
