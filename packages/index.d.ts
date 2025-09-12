declare type AnyScaleOptions = {
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
