interface AnyScaleOptions {
    el: HTMLElement | null;  // 必须元素节点
    width: number;
    height: number,
    scale?: number;
    currentValue: number,// 可选数字类型（默认值在类内部实现）
    unit: number, // 刻度间隔 'px'
    capacity: number, // 刻度容量值
    start: number,
    end: number,
    fontSize: number,
    fontColor?: string,
    background?: string,
    scaleLineColor?: string,
    midLineColor?: string,
    openUnitChange?: boolean,
}

class anyScale {
    config: AnyScaleOptions = {
        el: null,
        start: 0,
        end: 100,
        width: 200,
        height: 120,
        scale: 1,
        unit: 10, // 刻度间隔 'px'
        capacity: 1, // 刻度容量值
        currentValue: 0,
        fontSize: 14,
        fontColor: '#333',
        background: '',
        midLineColor: '',
        openUnitChange: false
    }
    canvasDom:  HTMLCanvasElement = null as unknown as HTMLCanvasElement
    current_def = 0
    dpr: number = window.devicePixelRatio || 1.2 // 获取dpr
    ctx: CanvasRenderingContext2D = null as unknown as CanvasRenderingContext2D
    _callBack = (val:number) =>
        console.log(val)

    _moveDraw = () => {
        this.ctx.clearRect(0, 0, this.config.width, this.config.height)
        console.log(this.current_def,'current_def');

        this.createScale()
        this.createMidCursor()
        // this.$_drawSign()

        if (typeof this._callBack === 'function') {
            // console.log(value);
            this._callBack(Math.round(this.current_def))
        } else {
            throw new Error('scale函数的第二个参数，必须为正确的回调函数！')
        }
    }
    slowActionFn = function (t: number, b: number, c: number, d: number) {
        // return -c * ((t = t/d - 1) * t * t*t - 1) + b;
        return c * ((t = t / d - 1) * t * t + 1) + b
    }

    constructor(conf: AnyScaleOptions) {
        this.config = conf
        this.init()
    }

    init() {
        console.log(this.config)
        this.createCanvas()
        this.createScale()
        this.createMidCursor()
        this.addEvent()
    }

    createCanvas() {
        this.canvasDom = document.createElement('canvas')
        // this.canvasDom.style.width = this.config.el?.clientWidth + 'px'
        // this.canvasDom.style.height = this.config.height + 'px'
        console.log(this.config.el?.getBoundingClientRect())
        const DOMRect = this.config?.el?.getBoundingClientRect()
        this.config.width = Math.floor(Number(DOMRect?.width))
        this.config.height = Math.floor(Number(this.config.height))
        console.log(DOMRect?.width, this.dpr)
        this.canvasDom.style.width = `${this.config.width}px`
        this.canvasDom.style.height = `${this.config.height}px`
        this.canvasDom.width = this.dpr * this.config?.width // 确保canvas宽高为整数
        this.canvasDom.height = this.dpr * this.config?.height
        this.config.el?.appendChild(this.canvasDom)
        this.ctx = this.canvasDom.getContext('2d')!
        this.ctx?.scale(this.dpr, this.dpr)
        this.current_def = Math.floor(((this.config.end - this.config.start) / 2 + this.config.start) / this.config.capacity) * this.config.capacity
    }

    createScale() {
        const canvas_bg = document.createElement('canvas')!
        const ctx_bg = canvas_bg.getContext('2d')!
        canvas_bg.width = this.config.width * this.dpr
        canvas_bg.height = this.config.height * this.dpr
        ctx_bg.scale(this.dpr, this.dpr)
        let begin_num = this.current_def - (this.config.width / 2) * (this.config.capacity / this.config.unit)
        let cur_x = 0
        let cur_num: number = 0
        const scale_len = Math.ceil((this.config.width + 1) / this.config.unit) // 刻度条数
        const real_len = Math.ceil((this.config.end - this.config.start + 1) / this.config.capacity) // 实际可绘制的刻度条数

        ctx_bg.fillStyle = this.config?.background ?? 'transparent' // 背景色
        ctx_bg.fillRect(0, 0, this.config.width, this.config.height)
        ctx_bg.closePath()
        // 底线
        ctx_bg.beginPath()
        ctx_bg.moveTo(0, 0)
        ctx_bg.lineTo(this.config.width, 0)
        ctx_bg.strokeStyle = '#333'
        ctx_bg.lineWidth = 1
        ctx_bg.stroke()
        ctx_bg.closePath()
        let space_num = Math.ceil(begin_num / this.config.capacity) * this.config.capacity - begin_num
        let space_x = space_num * (this.config.unit / this.config.capacity)
        // 绘制刻度线
        for (let i = 0; i < scale_len; i++) {
            cur_num = (Math.ceil(begin_num / this.config.capacity) + i) * this.config.capacity
            if (cur_num < this.config.start) {
                continue
            } else if (cur_num > this.config.end) {
                break
            }
            ctx_bg.beginPath()
            ctx_bg.strokeStyle = this.config.scaleLineColor || '#1675DE'
            ctx_bg.font = String(this.config.fontSize ?? 14)
            ctx_bg.fillStyle = this.config.fontColor ?? '#333'
            ctx_bg.textAlign = 'center'
            ctx_bg.shadowBlur = 0
            cur_x = space_x + i * this.config.unit

            if (cur_num % (this.config.capacity * 10) === 0) {
                ctx_bg.moveTo(cur_x, (this.config.height * 1) / 2)
                ctx_bg.strokeStyle = this.config?.scaleLineColor || '#4AC979'
                ctx_bg.shadowColor = '#9e9e9e'
                ctx_bg.shadowBlur = 1
                ctx_bg.font = '14px Helvetica, Tahoma, Arial'
                // ctx_bg.fillText(String(cur_num), cur_x, 100)
            } else if (cur_num % (this.config.capacity * 5) === 0) {
                ctx_bg.moveTo(cur_x, (this.config.height * 1) / 2)
                ctx_bg.strokeStyle = this.config?.scaleLineColor || '#FF131B'
                if (real_len <= 10) {
                    ctx_bg.font = '14px Helvetica, Tahoma, Arial'
                    // ctx_bg.fillText(String(cur_num), cur_x, 100)
                }
            } else {
                // ctx_bg.moveTo(cur_x, (this.config.height * 4) / 5)
                ctx_bg.moveTo(cur_x, this.config.height / 4)
            }
            if (Math.round(this.current_def) === cur_num) {
                ctx_bg.fillStyle = '#1675DE'
                ctx_bg.font = '28px Helvetica, Tahoma, Arial'
                ctx_bg.fillText(String(cur_num), cur_x, 100)
            }
            ctx_bg.lineTo(cur_x, 0)
            ctx_bg.stroke()
            ctx_bg.closePath()
        }
        this.ctx.drawImage(canvas_bg, 0, 0, this.config.width * this.dpr, this.config.height * this.dpr, 0, 0, this.config.width, this.config.height)
    }

    createMidCursor() {
        const mid_x = Math.floor(this.config.width / 2)
        this.ctx.beginPath()
        this.ctx.fillStyle = this.config?.midLineColor || '#087af7'
        this.ctx.fillRect(mid_x - 1, 0, 2, this.config.height)
        this.ctx.stroke()
        this.ctx.moveTo(mid_x, 8)
        this.ctx.lineTo(mid_x - 5, 2)
        this.ctx.lineTo(mid_x - 5, 0)
        this.ctx.lineTo(mid_x + 5, 0)
        this.ctx.lineTo(mid_x + 5, 2)
        this.ctx.fill()
        this.ctx.moveTo(mid_x, this.config.height - 8)
        this.ctx.lineTo(mid_x - 5, this.config.height - 2)
        this.ctx.lineTo(mid_x - 5, this.config.height)
        this.ctx.lineTo(mid_x + 5, this.config.height)
        this.ctx.lineTo(mid_x + 5, this.config.height - 2)
        this.ctx.fill()
        this.ctx.closePath()
    }

    addEvent() {
        let begin_x = 0 // 手指x坐标
        let last_x = 0 //上一次x坐标
        let ifMove = false // 是否开始交互
        let from_def = 0

        let lastMoveTime = 0
        let lastMove_x = 0
        const start = (e: any) => {
            e.stopPropagation()
            e.preventDefault()
            ifMove = true
            if (!e.touches) {
                last_x = begin_x = e.pageX
            } else {
                last_x = begin_x = e.touches[0].pageX
            }
            lastMove_x = last_x
            lastMoveTime = e.timeStamp || Date.now()
        }

        const move = (e: any) => {
            e.stopPropagation()
            e.preventDefault()
            const current_x = e.touches ? e.touches[0].pageX : e.pageX
            if (ifMove) {
                const move_x = current_x - last_x
                this.current_def = this.current_def - move_x * (this.config.capacity / this.config.unit)
                window.requestAnimationFrame(this._moveDraw)
                // moveDraw();

                last_x = current_x
                const nowTime = e.timeStamp || Date.now()
                if (nowTime - lastMoveTime > 300) {
                    lastMoveTime = nowTime
                    lastMove_x = last_x
                }
            }
        }

        const end = (e: any) => {
            const current_x = e.changedTouches ? e.changedTouches[0].pageX : e.pageX
            const nowTime = e.timeStamp || Date.now()
            const v = -(current_x - lastMove_x) / (nowTime - lastMoveTime) // 手指划动速度
            const step = () => {
                this.current_def = this.slowActionFn(t, from_def, this.config.capacity * v * 50, d)
                if (this.current_def < this.config.start) {
                    this.current_def = this.config.start
                } else if (this.current_def > this.config.end) {
                    this.current_def = this.config.end
                }
                if (this.config.openUnitChange) {
                    this.current_def = Math.round(this.current_def / this.config.capacity) * this.config.capacity
                }
                this._moveDraw()
                t++
                if (t <= d) {
                    // 继续运动
                    window.requestAnimationFrame(step)
                } else {
                    // 结束
                }
            }

            ifMove = false

            let t = 0,
                d = 15
            if (Math.abs(v) >= 0.3) {
                from_def = this.current_def
                step()
            } else {
                if (this.current_def < this.config.start) {
                    this.current_def = this.config.start
                } else if (this.current_def > this.config.end) {
                    this.current_def = this.config.end
                }
                if (this.config.openUnitChange) {
                    this.current_def = Math.round(this.current_def / this.config.capacity) * this.config.capacity
                }
                this._moveDraw()
            }
        }
        // 注册事件，移动端和PC端
        const hasTouch = 'ontouchstart' in window
        const startEvent = hasTouch ? 'touchstart' : 'mousedown'
        const moveEvent = hasTouch ? 'touchmove' : 'mousemove'
        const endEvent = hasTouch ? 'touchend' : 'mouseup'
        this.canvasDom.addEventListener(startEvent, start)
        this.canvasDom.addEventListener(moveEvent, move)
        this.canvasDom.addEventListener(endEvent, end)

    }


}

export default anyScale
