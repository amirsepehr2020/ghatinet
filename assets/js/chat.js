/*
====================================
Spix Chat
====================================
*/

"use strict";

const messages = document.querySelector(".chat__messages");
const searchForm = document.querySelector(".search");
const input = document.querySelector(".search__input");


searchForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const text = input.value.trim();

    if (!text) return;

    addUserMessage(text);

    input.value = "";

    showTyping();

    try {

        const response = await sendMessage(text);

        removeTyping();

        if (response.success) {

    if (response.success) {

    addAiMessage(response.answer);

} else {

    addAiMessage("❌ مشکلی در دریافت پاسخ به وجود آمد.");

}



    } catch (error) {

        removeTyping();

        addAiMessage("❌ ارتباط با سرور برقرار نشد.");

        console.error(error);

    }

});


function removeEmpty() {

    const empty = document.querySelector(".chat__empty");

    if (empty) {

        empty.remove();

    }

}


function addUserMessage(message) {

    removeEmpty();

    messages.insertAdjacentHTML("beforeend", `

        <div class="message message--user">

            <div class="message__bubble">

                ${message}

            </div>

        </div>

    `);

    scrollBottom();

}


function addAiMessage(message) {

    messages.insertAdjacentHTML("beforeend", `

        <div class="message message--ai">

            <div class="message__bubble">

                ${message}

            </div>

        </div>

    `);

    scrollBottom();

}


function showTyping() {

    removeEmpty();

    messages.insertAdjacentHTML("beforeend", `

        <div class="message message--ai" id="typing-message">

            <div class="message__bubble">

                ⏳ در حال جستجو...

            </div>

        </div>

    `);

    scrollBottom();

}


function removeTyping() {

    const typing = document.getElementById("typing-message");

    if (typing) {

        typing.remove();

    }

}


function scrollBottom() {

    messages.scrollTop = messages.scrollHeight;

}
