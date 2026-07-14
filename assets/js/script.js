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

/* ==========================================
   Auto Focus
========================================== */

window.addEventListener("load", () => {

    const input = document.querySelector(".search__input");

    if (input) {

        input.focus();

    }

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

document.querySelectorAll(".quick-actions__item").forEach(button => {

    button.addEventListener("click", () => {

        const input = document.querySelector(".search__input");

        if (input) {

            input.value = button.innerText;

            input.focus();

        }

    });

});

/* ==========================================
   Theme Ready
========================================== */

const theme = "dark";

document.documentElement.dataset.theme = theme;


console.log("🚀 Spix Loaded Successfully");
