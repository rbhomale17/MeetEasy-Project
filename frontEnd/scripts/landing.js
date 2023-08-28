let userDetails = JSON.parse(localStorage.getItem('userDetails')) || {};

document.getElementById('uploadButton').addEventListener('click', (e) => {
  e.preventDefault();

  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  // console.log(file)
  if (!file) {
    return;
  }
  const formData = new FormData();
  formData.append('file', file);
  // console.log(formData);

  fetch('https://meeteasy-main-server.onrender.com/photos/upload', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log('File uploaded successfully. Accessible link:', data.link);
      console.log(userDetails);
      console.log(userDetails.picture);
      userDetails.picture = data.link;
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      let imageDiv = document.getElementById('imageDiv');

      imageDiv.innerHTML = null;
      let image = document.createElement('img');
      image.setAttribute('src', userDetails.picture);
      image.setAttribute('alt', userDetails.name);
      imageDiv.append(image);
      document.getElementById('fileInput') = null
    })
    .catch(error => {
      console.error('An error occurred during file upload:', error);
    });
});

let header = document.querySelector("header");
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});

menu.onclick = () => {
  navbar.classList.toggle("active");
};
window.onscroll = () => {
  navbar.classList.remove("active");
};

// caching user data from params
const urlParams = new URLSearchParams(window.location.search);
const userData = JSON.parse(decodeURIComponent(urlParams.get('userdata')));
// Use the user data in your HTML page
// console.log(userData); // Output the user data to the console or perform any other operations
window.addEventListener('load', () => {
  if (userData) {
    localStorage.setItem('userDetails', JSON.stringify(userData))
  }
})

// Check if the page has already been reloaded
const hasReloaded = sessionStorage.getItem('hasReloaded');

if (!hasReloaded) {
  // Perform necessary operations before the reload
  if (userData) {
    localStorage.setItem('userDetails', JSON.stringify(userData));
  }
  console.log(userData);

  // Set the flag indicating the page has been reloaded
  sessionStorage.setItem('hasReloaded', true);

  // Reload the page
  setTimeout(() => {
    window.location.reload();
  }, 2000);
}

let signUser = document.getElementById('username');
let user_detail_name = document.getElementById('user-detail-name');

signUser.textContent = `${userDetails.name}`
user_detail_name.textContent = `${userDetails.name}`;

let imageDiv = document.getElementById('imageDiv');

imageDiv.innerHTML = null;
let image = document.createElement('img');
image.setAttribute('src', userDetails.picture);
image.setAttribute('alt', userDetails.name);
imageDiv.append(image);
// https://meeteasy-main-server.onrender.com/photos/files/648b04ab43adde36fe392b22

let amount = localStorage.getItem('amount') || {};
function logout() {

  localStorage.removeItem('userDetails');
  localStorage.removeItem('amount');
  location.href = 'index.html'

}