import * as dotenv from 'dotenv';
dotenv.config();
const robot_id = process.env.ROBOT_ID;

async function send(chatobj, msg) {
    let receiver;
    //roomType integer 必需 QA所在房间类型 1=外部群 2=外部联系人 3=内部群 4=内部联系人
    if(chatobj.roomType == 1 || chatobj.roomType == 3){
        receiver = chatobj.groupRemark || chatobj.groupName;
      }else{
        receiver = chatobj.receivedName;
      };

    //send data to client
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
        "socketType": 2,
        "list": [
            {
                "type": 203,
                "titleList": [receiver],
                "receivedContent": msg,
                "atList": chatobj.atMe?[chatobj.receivedName]:null
            }
        ]
    });
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    fetch(`https://worktool.asrtts.cn/wework/sendRawMessage?robotId=${robot_id}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

}
export { send };
export default { send };