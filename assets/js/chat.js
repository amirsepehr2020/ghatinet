/*
====================================
Spix Chat
====================================
*/

"use strict";

const messages = document.querySelector(".chat__messages");

const searchForm = document.querySelector(".search");

const input = document.querySelector(".search__input");


searchForm.addEventListener("submit",(event)=>{

    event.preventDefault();

    const text = input.value.trim();

    if(text==="") return;

    addUserMessage(text);

    setTimeout(()=>{

        addAiMessage(text);

    },600);

    input.value="";

});


function removeEmpty(){

    const empty=document.querySelector(".chat__empty");

    if(empty){

        empty.remove();

    }

}


function addUserMessage(message){

    removeEmpty();

    messages.insertAdjacentHTML("beforeend",`

    <div class="message message--user">

        <div class="message__bubble">

            ${message}

        </div>

    </div>

    `);

    scrollBottom();

}


function addAiMessage(message){

    let answer=`
        در حال حاضر این ابزار هنوز اضافه نشده.
        <br><br>
        شما نوشتید:
        <b>${message}</b>
    `;

    const lower=message.toLowerCase();

    if(lower.includes("pdf")){

        answer=`

        ابزار مناسب پیدا شد.

        <br><br>

        <a href="/tools/pdf">

            📄 ابزار PDF

        </a>

        `;

    }

    if(lower.includes("رمز")){

        answer=`

        ابزار مناسب پیدا شد.

        <br><br>

        <a href="/tools/password-generator">

            🔐 Password Generator

        </a>

        `;

    }

    if(lower.includes("عکس")){

        answer=`

        ابزار مناسب پیدا شد.

        <br><br>

        <a href="/tools/image">

            🖼 ابزارهای تصویر

        </a>

        `;

    }

    messages.insertAdjacentHTML("beforeend",`

    <div class="message message--ai">

        <div class="message__bubble">

            ${answer}

        </div>

    </div>

    `);

    scrollBottom();

}


function scrollBottom(){

    messages.scrollTop=messages.scrollHeight;

}
