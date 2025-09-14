declare module 'scale-picker' {
    interface ScalePickerOptions {
        el: HTMLElement | null
        width: number
        height: number
        scale?: number
        currentValue: number
        unit: number
        capacity: number
        start: number
        end: number
        fontSize: number
        fontColor?: string
        background?: string
        scaleLineColor?: string
        midLineColor?: string
        openUnitChange?: boolean
        onChange?: (value: number) => void
    }

    class ScalePicker {
        constructor(config: ScalePickerOptions)
        init(): void
        createCanvas(): void
        createScale(): void
        createMidCursor(): void
        addEvent(): void
    }

    export default ScalePicker
}
