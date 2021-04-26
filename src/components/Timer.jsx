import React, { useEffect, useRef, useState } from 'react'
import timeUpMp3 from "../assets/time_up.mp3"

export default function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [timerInstance, setTimerInstance] = useState('')
    const [isRunning, setIsRunning] = useState(false)

    // reference a dom element
    const audioEl = useRef()

    // TODO: improve code to use only seconds
    // currently using a  stupid logic but works ( a better approach wud be to track everything in seconds only .)
    // show minutes from seconds 

    // timer logic
    useEffect(() => {

        //main logic
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

    // constraint seconds and minutes from going to negetive
    useEffect(() => {
        if (seconds < 0) {
            setSeconds(59)
            setMinutes(prev => parseInt(prev) - 1)
            console.log('negatives not allowed!')
        }
        if (minutes < 0) {
            setMinutes(0)
            console.log('negatives not allowed!')
        }

    }, [seconds, minutes])

    // stop the timer ticking 
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
