const btn1=document.getElementById("free-plan");
const btn2=document.getElementById("lite-plan");
const btn3=document.getElementById("pro-plan");
const btn4=document.getElementById("premium-plan");
btn1.addEventListener("click",()=>{
    window.location.href="../index.html";
});

btn2.addEventListener("click",()=>{
    localStorage.setItem("amount","$19");
    window.location.href="/Client/payment.html"
});

btn3.addEventListener("click",()=>{
    localStorage.setItem("amount","$39");
    window.location.href="/Client/payment.html"
});

btn4.addEventListener("click",()=>{
    localStorage.setItem("amount","$79");
    window.location.href="/Client/payment.html"
});

