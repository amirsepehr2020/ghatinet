/*
====================================
Spix Chat
====================================
*/

"use strict";

const messages = document.querySelector(".chat__messages");
const searchForm = document.querySelector(".search");
const input = document.querySelector(".search__input");

if (searchForm && input && messages) {

    searchForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const text = input.value.trim();

        if (!text) return;

        addUserMessage(text);

        input.value = "";
        input.focus();

        showTyping();

        try {

            const response = await sendMessage(text);

            removeTyping();

            if (response.success) {

    let tool;

    try {

        tool = JSON.parse(response.answer);

    } catch {

        addAiMessage(response.answer);

        return;

    }

    addToolCard(tool);

} else {

    addAiMessage("❌ مشکلی در دریافت پاسخ به وجود آمد.");

}

        } catch (error) {

            removeTyping();

            addAiMessage("❌ ارتباط با سرور برقرار نشد.");

            console.error(error);

        }

    });

}

function removeEmpty() {

    const empty = document.querySelector(".chat__empty");

    if (empty) {

        empty.remove();

    }

}

function addUserMessage(message) {

    removeEmpty();

    messages.insertAdjacentHTML(
        "beforeend",
        `
        <div class="message message--user">
            <div class="message__bubble">
                ${escapeHtml(message)}
            </div>
        </div>
        `
    );

    scrollBottom();

}

function addAiMessage(message) {

    messages.insertAdjacentHTML("beforeend", `

        <div class="chat__message chat__message--ai">

            <div class="message__bubble">

                ${message}

            </div>

        </div>

    `);

    const lastMessage = messages.querySelector(
        ".chat__message--ai:last-child"
    );

    lastMessage.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

}

function addToolCard(tool) {

    const html = `

    <div class="tool-result">

        <div class="tool-result__icon">

            🌐

        </div>

        <div class="tool-result__content">

            <h3>

                ${tool.title}

            </h3>

            <p>

                ${tool.description}

            </p>

            <a
                href="${tool.url}"
                target="_blank"
                class="tool-result__button"
            >

                🚀 ورود به ابزار

            </a>

        </div>

    </div>

    `;

    addAiMessage(html);

}

function showTyping() {

    removeEmpty();

    removeTyping();

    messages.insertAdjacentHTML(
        "beforeend",
        `
        <div class="message message--ai" id="typing-message">
            <div class="message__bubble">
                ⏳ در حال فکر کردن...
            </div>
        </div>
        `
    );

    scrollBottom();

}

function removeTyping() {

    const typing = document.getElementById("typing-message");

    if (typing) {

        typing.remove();

    }

}

function scrollBottom() {

    messages.scrollTo({
        top: messages.scrollHeight,
        behavior: "smooth"
    });

}

function escapeHtml(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}
