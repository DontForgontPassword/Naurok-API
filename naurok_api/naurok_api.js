
const cheerio = require("cheerio")
const axios = require("axios")

async function get_test_session(Session) {
    const response = await fetch(`https://naurok.com.ua/api2/test/sessions/${Session}`, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8",
            "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    })
    if (response.ok) {
        return await response.json()
    } else {
        return "Ошибка"
    }
}

async function get_session_token_from_test(html) {
    const $ = cheerio.load(html);
    const session_not_parsed = $('div[ng-app="testik"]').attr("ng-init");
    const session_parsed = session_not_parsed.split(",")[1];
    return session_parsed;
}

async function join_test_game(ID, Name) {
    const response = await axios.get(`https://naurok.com.ua/test/join?gamecode=${ID}`);
    const html = response.data;
    const $ = cheerio.load(html);

    const csrf = $('meta[name="csrf-token"]').attr("content");

    const formData = new FormData();
    formData.append('_csrf', csrf);
    formData.append('JoinForm[gamecode]', ID);
    formData.append('JoinForm[name]', Name);

    const joinResponse = await axios.post(`https://naurok.com.ua/test/join`, formData, {
        headers: {
            'Cookie': response.headers['set-cookie']
        }
    });
}

async function set_test_answer(sessionId, answerId, questionId, point, homework) {
    const response = await fetch("https://naurok.com.ua/api2/test/responses/answer", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8",
            "content-type": "application/json;charset=UTF-8",
            "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `{\"session_id\":${sessionId},\"answer\":[\"${answerId}\"],\"question_id\":\"${questionId}\",\"show_answer\":0,\"type\":\"quiz\",\"point\":\"${point}\",\"homeworkType\":1,\"homework\":${homework}}`,
        "method": "PUT",
        "mode": "cors",
        "credentials": "include"
    });
    
    const data = await response.json();

    return data
}

async function end_test_session(Session) {
    const response = await fetch(`https://naurok.com.ua/api2/test/sessions/end/${Session}`, {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9,ru;q=0.8",
            "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin"
        },
        "referrer": "https://naurok.com.ua/test/testing/be5ac295-7b92-4730-8e78-e0efa929fa16",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "PUT",
        "mode": "cors",
        "credentials": "include"
    });
}

module.exports = {
    get_test_session, join_test_game, set_test_answer, get_session_from_test, end_test_session
}
