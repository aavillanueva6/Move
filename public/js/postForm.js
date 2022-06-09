// create new post
const newPostHandler = async (event) => {
  event.preventDefault();

  const categories = document.querySelector('#category').getElementsByTagName('option');

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  const category_name = document.querySelector('#post-category').value;
  let category_id;

  for (let i = 0; i < categories.length; i++) {
    if (categories[i].label === category_name) {
      category_id = categories[i].dataset.id;
      i = categories.length;
    }
  }

  if (title && content && category_id) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, content, category_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

// updates existing post
const updatePostHandler = async (event) => {
  event.preventDefault();

  const postId = event.target.dataset.id;
  const title = document.querySelector('#post-title').value.trim();

  const category_name = document.querySelector('#post-category').value;
  let category_id;

  for (let i = 0; i < categories.length; i++) {
    if (categories[i].label === category_name) {
      category_id = categories[i].dataset.id;
      i = categories.length;
    }
  }

  if (title && content && category_id) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content, category_id }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

// deletes existing post
const deletePostHandler = async (event) => {
  event.preventDefault();

  const postId = event.target.dataset.id;

  const response = await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert('Failed to delete post');
  }
};

// query select page elements
const newPostFormE = document.querySelector('.new-post-form');
const updatePostButtE = document.querySelector('#update-post');
const deletePostButtE = document.querySelector('#delete-post');

// add event listeners if elements exist
if (newPostFormE) {
  newPostFormE.addEventListener('submit', newPostHandler);
}

if (updatePostButtE) {
  updatePostButtE.addEventListener('click', updatePostHandler);
  deletePostButtE.addEventListener('click', deletePostHandler);
}
