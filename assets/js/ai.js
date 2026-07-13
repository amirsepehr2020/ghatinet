/*
==================================
Spix API
==================================
*/

"use strict";

const API_URL = "https://api.ghatinet.ir/chat";
// فعلاً اگر لوکال تست می‌کنی:
// const API_URL = "http://127.0.0.1:8000/chat";


async function sendMessage(message){

    try{

        const response = await fetch(API_URL,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                message:message

            })

        });

        const data = await response.json();

        return data;

    }

    catch(error){

        return{

            success:false,

            answer:"ارتباط با سرور برقرار نشد."

        };

    }

}
