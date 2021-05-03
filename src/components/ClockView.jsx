import React from 'react'

export default function ClockView({ props, setMinutes,setSeconds, handleStart, handleReset}) {
    
    const {minutes,seconds,isRunning, isBlown } = props
    return (
    <div className="clock-container">
        {/* <h1>Timer</h1> */}
        <div className={isBlown ? "circle blown" : "circle"}>
            <input type="number" className="minutes-input" value={minutes} onChange={(e) => setMinutes(e.target.value)} placeholder="00" />
            <p>:</p>
            <input type="number" className="seconds-input" value={seconds} onChange={(e) => setSeconds(e.target.value)} placeholder="00" />
        </div>
        <div>
            <button className={isRunning ? "btn reset blown" : "btn start"} onClick={handleStart} >{!isRunning ? 'Start' : 'Pause'}</button>
            <button className={isBlown ? "btn reset blown" : "btn reset"} onClick={handleReset}>Reset</button>
        </div>
    </div>
    )
}
