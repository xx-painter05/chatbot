const validLoginId = new FieldValidator('#txtLoginId', async function (val) {
    if (!val) {
        return '请输入账号！'
    }
    const {code} = await API.exists(val)
    if (code) {
        return  '账号已存在'
    }
})

const validNickname = new FieldValidator('#txtNickname', function (val) {
    if (!val) {
        return '请输入昵称！'
    }
    if (!/^[a-zA-Z0-9]{3,6}$/.test(val)) {
        return '昵称只能包含英文字母、数字、在3~6位之间！'
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

const validPassword2 = new FieldValidator('#txtLoginPwdConfirm', function (val) {
    if (!val) {
        return '请输入密码！'
    }
    if (val !== $('#txtLoginPwd').value) {
        return `密码不一致，请重新输入！`
    }
})

$('.user-form').addEventListener('submit', async e => {
    e.preventDefault()
    const res = await FieldValidator.validate(validLoginId, validNickname, validPassword, validPassword2)
    if (!res) return;
    const form = new FormData($('.user-form'))
    const { code, msg } = await API.register(Object.fromEntries(form.entries()))
    if (code) return alert(msg)
    if (this.confirm('注册成功，点击确定前往登录页！')) {
        window.location.href = '/chatbot/login.html'
    }
})