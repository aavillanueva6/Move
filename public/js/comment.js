async function commentFormHandler(event) {
  event.preventDefault();

  const post_id = window.location.pathname.split('/')[2];

  const content = document.querySelector('#comment-name').value.trim();

  if (content && post_id) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.new-comment-form').addEventListener('submit', commentFormHandler);


console.log(window.location.pathname.split('/')[2]);