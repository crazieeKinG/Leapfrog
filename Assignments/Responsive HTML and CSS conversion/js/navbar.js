const nav_list = document.querySelector(".navlist");
const menu_open = document.querySelector("#menu-open");
const menu_close = document.querySelector("#menu-close");

menu_open.addEventListener('click', function(){
    nav_list.style.left = "0%";
});

menu_close.addEventListener('click', function(){
    nav_list.style.left = "100%";
});