

async function agent (chatid, msg) {
    return {id:chatid, msg:`echo: ${msg}`};
}

export {agent};
export default {agent};
