/*
==========================================
Spix Main Script
Version 2.0
==========================================
*/

"use strict";

/* ==========================================
   Selectors
========================================== */

const header = document.querySelector(".header");

const menuButton = document.querySelector(".header__menu");

const navigation = document.querySelector(".header__nav");

const searchForm = document.querySelector(".search");

const searchInput = document.querySelector(".search__input");

const searchButton = document.querySelector(".search__submit");


/* ==========================================
   Header Shadow
========================================== */

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.style.background = "rgba(9,9,11,.82)";

        header.style.borderBottom = "1px solid rgba(255,255,255,.08)";

    } else {

        header.style.background = "rgba(9,9,11,.55)";

        header.style.borderBottom = "1px solid rgba(255,255,255,.06)";

    }

});


/* ==========================================
   Mobile Menu
========================================== */

if(menuButton){

    menuButton.addEventListener("click",()=>{

        navigation.classList.toggle("show-menu");

    });

}


/* ==========================================
   Search
========================================== */

if(searchForm){

    searchForm.addEventListener("submit",(event)=>{

        event.preventDefault();

        const value = searchInput.value.trim();

        if(value === ""){

            searchInput.focus();

            return;

        }

        console.log(value);

    });

}


/* ==========================================
   Auto Focus
========================================== */

window.addEventListener("load",()=>{

    searchInput.focus();

});


/* ==========================================
   Enter Animation
========================================== */

document.querySelectorAll(".tool-card").forEach((card,index)=>{

    card.style.animation = `fadeUp .7s ease ${index * .12}s forwards`;

});


/* ==========================================
   Quick Actions
========================================== */

document.querySelectorAll(".quick-actions__item").forEach(button=>{

    button.addEventListener("click",()=>{

        searchInput.value = button.innerText;

        searchInput.focus();

    });

});


/* ==========================================
   Theme Ready
========================================== */

const theme = "dark";

document.documentElement.dataset.theme = theme;


console.log("🚀 Spix Loaded Successfully");
