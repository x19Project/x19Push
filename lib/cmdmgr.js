async function cmdMgr(msg) {
    let raw_msg = msg.raw_message;
    if (raw_msg.startsWith('!! ') || raw_msg === '!!') {
        msg.reply('输入格式错误！');
        return;
    }
    let targetCmd = raw_msg.replace('!!', '').split(' ')[0];
    let targetSubCmd = '';
    let param = raw_msg.replace('!!' + targetCmd + ' ', '').replace('!!' + targetCmd + '', '').split(' ');
    if (Command[targetCmd] === undefined) {
        return;
    }
    if (param[0] === 'default' || param[0] === 'config') {
        msg.reply('命令输入格式错误！');
        return;
    }
    let isSimple = Command[targetCmd].main.config.isSimpleCommand;
    if (!isSimple) {
        /* 不是简单指令，进行预处理 */
        targetSubCmd = param[0];
        param.splice(0, 1);
        if (targetSubCmd == '') {
            msg.reply('命令输入格式错误！');
            return;
        }
        if (Command[targetCmd].main[targetSubCmd] === undefined) {
            return;
        }
    } else {
        if (param[0] === '') {
            /* 针对简单命令出现的空字符串处理 */
            param.splice(0, 1);
        }
    }
    switch (isSimple) {
        case true:
            Command[targetCmd].main.default.cmd(msg);
            break;
        case false:
            Command[targetCmd].main[targetSubCmd].cmd(msg);
            break;
    }
    return;
}

export { cmdMgr }