const createButton = document.querySelector("#createroom");
const codeCont = document.querySelector('#roomcode');
const joinBut = document.querySelector('#joinroom');
let userDetails = localStorage.getItem('userDetails') || {};

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

let amount = localStorage.getItem('amount') || {};
function logout() {

    localStorage.removeItem('userDetails');
    localStorage.removeItem('amount');
    window.location.href = 'https://meeteasy.netlify.app/' // add netlify link here

}

// userDetails.name = 'rushi'
let signUser = document.getElementById('username');

signUser.textContent = `${userDetails.name}`

let userName
const createroomtext = 'Creating Meeting...';

createButton.addEventListener('click', (e) => {
    e.preventDefault();

    Swal.fire({
        title: 'Join as',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Join',
        showLoaderOnConfirm: true,
        preConfirm: (text) => {
            // localStorage.setItem("userName",JSON.stringify(text))
            userName = text
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            createButton.disabled = true;
            createButton.innerHTML = 'Creating Meeting';
            createButton.classList = 'createroom-clicked';

            setInterval(() => {
                if (createButton.innerHTML < createroomtext) {
                    createButton.innerHTML = createroomtext.substring(0, createButton.innerHTML.length + 1);
                }
                else {
                    createButton.innerHTML = createroomtext.substring(0, createButton.innerHTML.length - 3);
                }
            }, 500);

            window.location.href = "/room";

        }
    })

});

joinBut.addEventListener('click', (e) => {
    e.preventDefault();

    Swal.fire({
        title: 'Join as',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Join',
        showLoaderOnConfirm: true,
        preConfirm: (text) => {
            // localStorage.setItem("userName",JSON.stringify(text))
            const userName = text
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            if (codeCont.value.trim() == "") {
                codeCont.classList.add('roomcode-error');
                return;
            }
            const code = codeCont.value;
            window.location.href = `/${code}`;

        }
    })


})

codeCont.addEventListener('change', (e) => {
    e.preventDefault();
    if (codeCont.value.trim() !== "") {
        codeCont.classList.remove('roomcode-error');
        return;
    }
})
