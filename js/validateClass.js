class FieldValidator {
    /**
     * 表单内容校验构造器
     * @param {object} ele 要校验的元素，可以是选择器、类名、id等
     * @param {Function} validatorFunc 校验的函数，由使用者自己定义，返回内容则为校验失败的提示，返回true则校验通过
     */
    constructor(ele, validatorFunc) {
        this.ele = document.querySelector(ele);
        this.parntNode = this.ele.parentNode;
        this.txt = this.ele.nextElementSibling;
        this.validatorFunc = validatorFunc;
        this.ele.addEventListener('blur', () => {
            this.validateField()
        });
    }

    async validateField() {
        const res = await this.validatorFunc(this.ele.value);
        // 有错误
        if (res) {
            this.parntNode.classList.add('is-err');
            this.txt.innerText = res
            return false
        }
        this.parntNode.classList.contains('is-err') && this.parntNode.classList.remove('is-err');
        this.txt.innerText = ''
        return true
    }

    static async validate(...validators) {
        const res = await Promise.all(validators.map(item => item.validateField()))
        return res.every(item => item)
    }
}
