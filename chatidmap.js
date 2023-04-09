import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
let crypto;
try {
  crypto = await import('node:crypto');
} catch (err) {
  console.error('crypto support is disabled!');
}

// db init
const adapter = new JSONFile('db.json');
const db = new Low(adapter);
await db.read();
db.data = db.data || { }; //chat obj: {"chatid1":{//this id content}, "chatid2"...}
const chatidtable = db.data;

async function obj2id(chatinfo){
    const str = 
    `"receivedName": ${chatinfo.receivedName},
    "groupName": ${chatinfo.groupName},
    "groupRemark": ${chatinfo.groupRemark},
    "roomType": ${chatinfo.roomType},
    "atMe": ${chatinfo.atMe},
    "textType": ${chatinfo.textType}`;
    const hash = crypto.createHash('sha256');
    hash.update(str);
    const id = hash.digest('hex');
    chatidtable[id] = chatinfo;
    await db.write();
    console.log(`write ${id}`);

    return id;
}

async function id2obj(chatid){
    console.log(`read ${chatid}`);
    return chatidtable[chatid];
}

export {obj2id, id2obj};
export default {obj2id, id2obj}