/*
====================================
Spix API
====================================
*/

"use strict";

const API_URL = "https://yy.sepehr2sodoury.workers.dev";

async function sendMessage(message) {

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });

        if (!response.ok) {
            throw new Error("Server Error");
        }

        return await response.json();

    } catch (error) {

        console.error(error);

        return {
            success: false,
            data: {
                title: "خطا",
                description: "ارتباط با سرور برقرار نشد.",
                url: "#"
            }
        };

    }

}
