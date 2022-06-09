<<<<<<< HEAD

const loginFormHandler = async (event) => {

=======
const loginFormHandler = async (event) => {
>>>>>>> a83a11e (adding assets)
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

<<<<<<< HEAD

  if (email && password) {

=======
  if (email && password) {
>>>>>>> a83a11e (adding assets)
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

<<<<<<< HEAD

    if (response.ok) {
      document.location.replace('/profile');
    } else {

=======
    if (response.ok) {
      document.location.replace('/profile');
    } else {
>>>>>>> a83a11e (adding assets)
      alert(response.statusText);
    }
  }
};


document
  .querySelector('#submitBtn')
  .addEventListener('click', loginFormHandler);
