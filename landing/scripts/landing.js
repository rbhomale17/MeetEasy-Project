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

    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log('File uploaded successfully. Accessible link:', data.link);
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