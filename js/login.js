const loginId = document.querySelector('#txtLoginId')
const loginPwd = document.querySelector('#txtLoginPwd')
const loginBtn = document.querySelector('.submit')

const validLoginId = new FieldValidator('#txtLoginId', async function (val) {
    if (!val) {
        return '请输入账号！'
    }
})

const validPassword = new FieldValidator('#txtLoginPwd', function (val) {
    if (!val) {
        return '请输入密码！'
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{6,10}$/.test(val)) {
        return '密码必须包含大小写英文字母和数字、在6~10位之间！'
    }
})

loginBtn.addEventListener('click', async function (e) {
    e.preventDefault();
    const res = await FieldValidator.validate(validLoginId, validPassword)
    if (!res) return;
    const {code, msg} = await API.login({
        loginId: loginId.value,
        loginPwd: loginPwd.value
    })
    if (code) {
        return alert(msg)
    } else {
        alert('登录成功')
        location.href = '/'
    }
})
