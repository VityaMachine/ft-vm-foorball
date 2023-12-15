export const modifiersHandler = (offsetX: number, offsetY: number ) => ({
    modifiers: [
        {
            name: 'offset',
            options: {
                offset: [offsetX, offsetY]
            }
        }
    ]
})