import React,{useState, useEffect } from 'react'
import ClockView from "../components/ClockView"

export default function Stopwatch() {

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [timerInstance, setTimerInstance] = useState('')
    const [isRunning, setIsRunning] = useState(false)
    const [isBlown, setIsBlown] = useState(false)

    // stopwatch logic
    // constraint seconds and minutes from going to negetive and beyond 60
    useEffect(() => {
        if (minutes < 0) {
            setMinutes(0)
            console.log('negatives not allowed!')
        }
        // constrain seconds from going beyond 60
        if (seconds >= 60) {
            setSeconds(0)
            setMinutes(prev => parseInt(prev) + 1)
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
            setSeconds(prevSeconds => parseInt(prevSeconds) + 1)
        }, 1000))

        setIsBlown(false)
        setIsRunning(true)
    }

    // reset button to clear timer 
    const handleReset = () => {
        console.log('Reset pressed', `clearing timer ${timerInstance}`)
        stop()
        setSeconds(0)
        setMinutes(0)
        setIsBlown(false)
        setIsRunning(false)
    }

    return (
        <>
        {/* <h1>Stopwatch</h1> */}
        <ClockView 
            props={{ minutes, seconds, isRunning, isBlown }} 
            setMinutes={(t) => setMinutes(t)} 
            setSeconds={(t) => setSeconds(t)} 
            handleReset={handleReset} 
            handleStart={handleStart}>
        </ClockView>
        </>
    )
}
