// post to https://chat-agent.onlybot.club/api/chat with application/json of {id:"", msg:""}
import fetch, {Headers, } from 'node-fetch';

async function agent(chatid, msg) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({ chatid, msg });
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    let chatback = await fetch(`https://chat-agent.onlybot.club/api/chat`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    console.log(`chatback ${JSON.stringify(chatback)}`);
    return { chatid: chatid, msg: `echo: ${chatback.msg}` };
}

export { agent };
export default { agent };
