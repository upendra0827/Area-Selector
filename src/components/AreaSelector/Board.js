import React, { useState } from "react";

const Board = ({ rows, cols }) => {

    const array = new Array(rows * cols).fill(0)
    const [isMouseDown, setIsMouseDown] = useState(false)
    const [selectedBoxes, setSelectedBoxes] = useState([])

    const handleKeyDown = ({ i }) => {
        setSelectedBoxes([i])
        setIsMouseDown(true)
    }

    const handleMouseOver = ({ i }) => {
        if (isMouseDown) {
            const firstBox = selectedBoxes[0]

            const startRow = Math.floor(firstBox / cols)
            const startCol = Math.floor(firstBox % cols)
            const endRow = Math.floor(i / cols)
            const endCol = Math.floor(i % cols)

            const minRow = Math.min(startRow, endRow)
            const maxRow = Math.max(startRow, endRow)
            const minCol = Math.min(startCol, endCol)
            const maxCol = Math.max(startCol, endCol)

            const selected = []
            for (let row = minRow; row <= maxRow; row++) {
                for (let col = minCol; col <= maxCol; col++) {
                    selected.push(row * cols + col)
                }
            }
            if (selected.length) setSelectedBoxes(prev => [prev[0], ...selected])
        }
    }

    const handleMouseUp = () => {
        setIsMouseDown(true)
        setSelectedBoxes([])
    }

    return (
        <div className="board-container">
            <div className="board" onMouseUp={handleMouseUp}>
                {array.map((_, i) => {
                    return <div
                        onMouseOver={() => handleMouseOver({ i })}
                        onMouseDown={() => handleKeyDown({ i })}
                        className={`cell ${selectedBoxes.includes(i) && 'selected'}`}
                        key={i}>{''}</div>
                })}
            </div>
        </div>
    )
};

export default Board;
