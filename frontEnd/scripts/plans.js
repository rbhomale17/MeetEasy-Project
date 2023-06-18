let userDetails = JSON.parse(localStorage.getItem('userDetails')) || {};

const free_plan_button=document.getElementById("free-plan");
const pro_plan_button=document.getElementById("pro-plan");
const business_plan_button=document.getElementById("business-plan");
const premium_plan_button=document.getElementById("premium-plan");

free_plan_button.addEventListener("click",()=>{
    window.location.href="landing.html";
});

pro_plan_button.addEventListener("click",()=>{
    localStorage.setItem("amount","₹199");
    window.location.href="payment.html"
});

business_plan_button.addEventListener("click",()=>{
    localStorage.setItem("amount","₹399");
    window.location.href="payment.html"
});

premium_plan_button.addEventListener("click",()=>{
    localStorage.setItem("amount","₹799");
    window.location.href="payment.html"
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

let signUser = document.getElementById('username');
signUser.textContent = `${userDetails.name}`

let amount = localStorage.getItem('amount') ||{};
function logout(){

  localStorage.removeItem('userDetails');
  localStorage.removeItem('amount');
  location.href = 'index.html'

}