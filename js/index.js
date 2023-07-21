init()

async function init() {
    const { data } = await API.history()
    $('.chat-container').innerHTML = data.map(({from, content, createdAt}) => {
        const type = from ? 0 : 1
        return `
            <div class="chat-item ${!type && 'me'}">
                <img class="chat-avatar" src="${!type ? "./asset/ggbond.jpg" : "https://img0.baidu.com/it/u=1530511589,184611645&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"}" />
                <div class="chat-content">${ content }</div>
                <div class="chat-date">${type ? formatTime(createdAt) : formatTime(Date.now())}</div>
            </div>
        `
    }).join('')
    $('.chat-container').scrollTop = $('.chat-container').scrollHeight
}
$('.msg-container').addEventListener('submit', async function(e) {
    e.preventDefault();
    const myMsg = $('#txtMsg').value
    renderMsg(0, myMsg)
    $('.main-title span').innerHTML = 'AI回复中...'
    const {data: {content, createdAt}} = await API.chat({ content: myMsg })
    renderMsg(1, content, createdAt)
    $('.main-title span').innerHTML = 'AI 聊天机器人'
})

$('.close').addEventListener("click", function () {
    removeItem('token')
    window.location.href = '/chatbot/login.html'
})

function renderMsg(type = 0, msg, createdAt) {
    const div = document.createElement('div');
    div.className = `chat-item ${!type && 'me'}`
    const myMsg = msg
    if (!type) {
        $('#txtMsg').value = '';
    }
    const str = ` <img class="chat-avatar" src="${!type ? "./asset/ggbond.jpg" : "https://img0.baidu.com/it/u=1530511589,184611645&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"}" />
    <div class="chat-content">${ myMsg }</div>
    <div class="chat-date">${type ? formatTime(createdAt) : formatTime(Date.now())}</div>`
    div.innerHTML = str;
    $('.chat-container').appendChild(div);
    $('.chat-container').scrollTop = $('.chat-container').scrollHeight
}

