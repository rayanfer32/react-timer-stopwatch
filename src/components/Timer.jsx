import React, { useEffect, useRef, useState } from 'react'
import timeUpMp3 from "../assets/time_up.mp3"

export default function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [timerInstance, setTimerInstance] = useState('')
    const [isRunning, setIsRunning] = useState(false)

    // reference a dom element
    const audioEl = useRef()

    useEffect(() => {
        // decrement minutes and set seconds  when only seconds hit 0
        if (seconds <= 0 && minutes > 0 && isRunning) {
            setMinutes(prevMinutes => prevMinutes - 1)
            setSeconds(59)
        }

        // constrain seconds from going beyond 60
        if (seconds >= 60) {
            setSeconds(0)
            setMinutes(prev => parseInt(prev) + 1)
        }

        if (seconds < 0 || minutes < 0) {
            setSeconds(0)
            setMinutes(0)
            console.log('negatives not allowed!')
        }

        // detect when seconds and minutes hit 0
        if (seconds <= 0 && minutes <= 0 && isRunning) {
            stop()
            setSeconds(0)
            setMinutes(0)
            setIsRunning(false)
            audioEl.current.play()
            // alert('Time Up')
        }
    }, [seconds, minutes])

    function stop() {
        clearInterval(timerInstance)
        setIsRunning(false)
        setTimerInstance('')
    }


    // stuff to set when start button is pressed
    const handleStart = () => {
        console.log('start pressed');

        if (isRunning) {
            stop()
            return
        }

        setTimerInstance(setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1)
        }, 1000))
        setIsRunning(true)
    }

    // reset button to clear timer 
    const handleReset = () => {
        console.log('Reset pressed', `clearing timer ${timerInstance}`)
        stop()
        setSeconds(0)
        setMinutes(0)
        setIsRunning(false)
        audioEl.current.pause()
        audioEl.current.load()
    }

    return (
        <div className="timer-container">
            <h1>Timer</h1>
            <div className="circle">
                <input type="number" className="minutes-input" value={minutes} onChange={(e) => setMinutes(e.target.value)} placeholder="00" />
                <p>:</p>
                <input type="number" className="seconds-input" value={seconds} onChange={(e) => setSeconds(e.target.value)} placeholder="00" />
            </div>
            <div>
                <button className="btn-start" onClick={handleStart} >{!isRunning ? 'Start' : 'Pause'}</button>
                <button className="btn-reset" onClick={handleReset}>Reset</button>
            </div>
            <audio ref={audioEl} className="audio-element">
                <source src={timeUpMp3}></source>
            </audio>
        </div>
    )
}
