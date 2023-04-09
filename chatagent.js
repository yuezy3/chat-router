

async function agent (chatid, msg) {
    return {id:chatid, msg:`echo: ${mesg}`};
}

export {agent};
export default {agent};
