<<<<<<< HEAD

=======
>>>>>>> a83a11e (adding assets)
const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

<<<<<<< HEAD

  if (response.ok) {
    document.location.replace('/');
  } else {

=======
  if (response.ok) {
    document.location.replace('/');
  } else {
>>>>>>> a83a11e (adding assets)
    alert(response.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', logout);
