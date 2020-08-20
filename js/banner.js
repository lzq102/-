class setOpacity {
    constructor(element) {
        this.ele = element;
        this.oUllis = element.querySelectorAll('ul>li');

        this.oUl = element.querySelector('ul');
        this.oOl = element.querySelector('ol');

        this.index = 0;
        this.time;
    }

    init() {
        this.setLi();
        this.autoLoop();
        this.inOut();
        this.setActive();
    }

    // 设定焦点
    setLi() {

        this.oUllis.forEach((v, k) => {

            const li = document.createElement('li');

            li.setAttribute('index', k);
            li.setAttribute('name', 'olli');

            if (k === 0) {
                li.className = 'active';
            }
            this.oOl.appendChild(li);
        })
    }

    // 改变index索引数值函数   left --操作   right ++操作
    change(type) {
        this.oUllis[this.index].style.opacity = 0;
        if (type === 'left') {
            this.index--;
        } else if (type === 'right') {
            this.index++;
        }
        if (this.index === this.oUllis.length) {
            this.index = 0;
        } else if (this.index === -1) {
            this.index = this.oUllis.length - 1
        }
        this.oUllis[this.index].style.opacity = 1;
        this.setFocusStyle();
    }

    autoLoop() {
        this.time = setInterval(() => {
            this.change('right');
        }, 3000);
    }


    setFocusStyle() {
        // 获取ol中所有的li
        const oOllis = this.ele.querySelectorAll('ol>li');
        oOllis.forEach((v, k) => {
            // 清除 class 中的 active
            v.className = '';
            if (k === this.index) {
                v.className = 'active';
            }
        })
    }

    // 鼠标移入停止,移出继续自动轮播
    inOut() {
        this.ele.addEventListener('mouseenter', () => {
            clearInterval(this.time);
        })

        this.ele.addEventListener('mouseleave', () => {
            this.autoLoop();
        })
    }

    //左右切换和焦点
    setActive() {
        this.ele.addEventListener('click', e => {
            e = e || window.event;
            if (e.target.getAttribute('name') === 'left') {
                this.change('left');
            } else if (e.target.getAttribute('name') === 'right') {
                this.change('right');
            } else if (e.target.getAttribute('name') === 'olli') {
                this.oUllis[this.index].style.opacity = 0;
                this.index = e.target.getAttribute('index') - 0
                this.oUllis[this.index].style.opacity = 1;
                this.setFocusStyle();
            }
        })
    }
}