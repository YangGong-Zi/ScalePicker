interface ScalePickerOptions {
    /*
      @description 目标元素节点
     */
    el: HTMLElement | null
    /*
      @description 宽度
    */
    width: number //  宽度
    /*
      @description 高度
    */
    height: number // 高度
    /*
      @description 缩放比例
    */
    scale?: number // 缩放比例
    /*
      @description 可选数字类型（默认值在类内部实现）
    */
    currentValue: number // 可选数字类型（默认值在类内部实现）
    /*
      @description 刻度间隔
     */
    unit: number // 刻度间隔 'px'
    /*
       @description 刻度容量值
    */
    capacity: number // 刻度容量值
    /*
       @description 坐标开始数值
    */
    start: number // 坐标开始数值
    /*
       @description 坐标结束数值
    */
    end: number // 坐标结束数值
    /*
       @description 字体大小
    */
    fontSize: number // 字体大小
    /*
       @description 字体颜色
    */
    fontColor?: string // 字体颜色
    /*
       @description 背景颜色
     */
    background?: string // 背景颜色
    /*
       @description 刻度线颜色
     */
    scaleLineColor?: string // 刻度线颜色
    /*
       @description 中间线颜色
     */
    midLineColor?: string // 中间线颜色
    /*
       @description 是否开启刻度间隔改变
     */
    openUnitChange?: boolean //  是否开启刻度间隔改变
    /*
       @description 值变化回调函数
     */
    onChange?: (value: number) => void // 值变化时的回调函数
}
class ScalePicker {
    config: ScalePickerOptions = {
        el: null, // 目标元素节点
        start: 0, // 坐标开始数值
        end: 100, // 坐标结束数值
        width: 200, // 宽度
        height: 120, // 高度
        scale: 1, // 缩放比例
        unit: 10, // 刻度间隔 'px'
        capacity: 1, // 刻度容量值
        currentValue: 0, // 当前值
        fontSize: 14, //  字体大小
        fontColor: '#333', // 字体颜色
        background: '', // 背景色
        midLineColor: '', // 中间游标颜色
        openUnitChange: false // 是否开启单位切换
    }
    canvasDom: HTMLCanvasElement = null as unknown as HTMLCanvasElement
    current_def = 0
    dpr: number = window.devicePixelRatio || 1.2 // 获取dpr
    ctx: CanvasRenderingContext2D = null as unknown as CanvasRenderingContext2D
    callBack: (val: number) => void = (_val: number) => {
        // console.log(val)
    }

    moveDraw = () => {
        this.ctx.clearRect(0, 0, this.config.width, this.config.height)
        this.createScale()
        this.createMidCursor()
        if (typeof this.callBack === 'function') {
            this.callBack(Math.round(this.current_def))
        }
    }

    /**
     * @description 缓动函数
     * @param t 时间
     * @param b 起始值
     * @param c 变化量
     * @param d 持续时间
     */
    slowActionFn = function (t: number, b: number, c: number, d: number) {
        return c * ((t = t / d - 1) * t * t + 1) + b
    }

    constructor(config: ScalePickerOptions) {
        this.config = config
        // 如果配置中传入了回调函数，则使用传入的回调函数
        try {
            if (config.onChange && typeof config.onChange === 'function') {
                this.callBack = config.onChange
            } else {
                throw new Error('onChange is not a function')
            }
        } catch (error) {
            console.log(error)
        }
        this.init()
    }

    init() {
        this.createCanvas()
        this.createScale()
        this.createMidCursor()
        this.addEvent()
    }

    createCanvas() {
        this.canvasDom = document.createElement('canvas')
        // console.log(this.config.el?.getBoundingClientRect())
        const DOMRect = this.config?.el?.getBoundingClientRect()
        this.config.width = Math.floor(Number(DOMRect?.width))
        this.config.height = Math.floor(Number(this.config.height))
        // console.log(DOMRect?.width, this.dpr)
        this.canvasDom.style.width = `${this.config.width}px`
        this.canvasDom.style.height = `${this.config.height}px`
        this.canvasDom.width = this.dpr * this.config?.width // 确保canvas宽高为整数
        this.canvasDom.height = this.dpr * this.config?.height
        this.config.el?.appendChild(this.canvasDom)
        this.ctx = this.canvasDom.getContext('2d')!
        this.ctx?.scale(this.dpr, this.dpr)
        this.current_def =
            Math.floor(
                ((this.config.end - this.config.start) / 2 + this.config.start) /
                    this.config.capacity
            ) * this.config.capacity
    }

    createScale() {
        const canvas_bg = document.createElement('canvas')!
        const ctx_bg = canvas_bg.getContext('2d')!
        canvas_bg.width = this.config.width * this.dpr
        canvas_bg.height = this.config.height * this.dpr
        ctx_bg.scale(this.dpr, this.dpr)
        const begin_num =
            this.current_def - (this.config.width / 2) * (this.config.capacity / this.config.unit)
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
        const space_num =
            Math.ceil(begin_num / this.config.capacity) * this.config.capacity - begin_num
        const space_x = space_num * (this.config.unit / this.config.capacity)
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
            const showCurrentValue = () => {
                if (Math.round(this.current_def) === cur_num) {
                    ctx_bg.fillStyle = '#1675DE'
                    ctx_bg.font = '18px Helvetica, Tahoma, Arial'
                    ctx_bg.fillText(String(cur_num), cur_x, 75)
                }
            }
            if (cur_num % (this.config.capacity * 10) === 0 || cur_num === this.config.start) {
                ctx_bg.moveTo(cur_x, this.config.height / 2)
                ctx_bg.strokeStyle = this.config?.scaleLineColor || '#4AC979'
                ctx_bg.shadowColor = '#9e9e9e'
                ctx_bg.shadowBlur = 1
                ctx_bg.font = '14px Helvetica, Tahoma, Arial'
                Math.round(this.current_def) === cur_num
                    ? showCurrentValue()
                    : ctx_bg.fillText(String(cur_num), cur_x, 75)
            } else if (cur_num % (this.config.capacity * 5) === 0) {
                ctx_bg.moveTo(cur_x, this.config.height / 2)
                ctx_bg.strokeStyle = this.config?.scaleLineColor || '#FF131B'
                if (real_len <= 10) {
                    ctx_bg.font = '14px Helvetica, Tahoma, Arial'
                    Math.round(this.current_def) === cur_num
                        ? showCurrentValue()
                        : ctx_bg.fillText(String(cur_num), cur_x, 75)
                }
            } else {
                // ctx_bg.moveTo(cur_x, (this.config.height * 4) / 5)
                ctx_bg.moveTo(cur_x, this.config.height / 4)
            }
            // showCurrentValue()
            ctx_bg.lineTo(cur_x, 0)
            ctx_bg.stroke()
            ctx_bg.closePath()
        }
        this.ctx.drawImage(
            canvas_bg,
            0,
            0,
            this.config.width * this.dpr,
            this.config.height * this.dpr,
            0,
            0,
            this.config.width,
            this.config.height
        )
    }

    createMidCursor() {
        const mid_x = Math.floor(this.config.width / 2)
        this.ctx.beginPath()
        this.ctx.fillStyle = this.config?.midLineColor || '#e5c17c'
        this.ctx.stroke()
        this.ctx.moveTo(mid_x, 10)
        this.ctx.lineTo(mid_x - 5, 2)
        this.ctx.lineTo(mid_x - 5, 0)
        this.ctx.lineTo(mid_x + 5, 0)
        this.ctx.lineTo(mid_x + 5, 2)
        this.ctx.fill()
        this.ctx.closePath()
    }

    addEvent() {
        // let begin_x = 0 // 手指x坐标
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
                last_x = e.pageX
                // begin_x = e.pageX
            } else {
                last_x = e.touches[0].pageX
                // begin_x = e.touches[0].pageX
            }
            lastMove_x = last_x
            lastMoveTime = e.timeStamp || Date.now()
        }

        const move = (e: any) => {
            e.stopPropagation()
            e.preventDefault()
            const current_x = e.touches ? e.touches[0].pageX : e.pageX
            if (this.current_def < this.config.start || this.current_def > this.config.end) {
                ifMove = false
            }
            if (ifMove) {
                const move_x = current_x - last_x
                this.current_def =
                    this.current_def - move_x * (this.config.capacity / this.config.unit)
                window.requestAnimationFrame(this.moveDraw)
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
                    this.current_def =
                        Math.round(this.current_def / this.config.capacity) * this.config.capacity
                }
                this.moveDraw()
                t++
                if (t <= d) {
                    // 继续运动
                    window.requestAnimationFrame(step)
                } else {
                    // 结束
                }
            }

            ifMove = false

            let t = 0
            const d = 15
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
                    this.current_def =
                        Math.round(this.current_def / this.config.capacity) * this.config.capacity
                }
                this.moveDraw()
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

// 导出类型
export type { ScalePickerOptions }

// 导出类
export default ScalePicker
