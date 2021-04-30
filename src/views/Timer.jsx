import React, { useEffect, useRef, useState } from 'react'
import timeUpMp3 from "../assets/time_up.mp3"
import timeUpS7Mp3 from "../assets/time_up_s7.mp3"
import ClockView from '../components/ClockView';

export default function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [timerInstance, setTimerInstance] = useState('')
    const [isRunning, setIsRunning] = useState(false)
    const [isBlown, setIsBlown] = useState(false)
    // reference a dom element
    const audioEl = useRef()

    // TODO: improve code to use only total seconds
    // currently using a  stupid logic but works ( a better approach wud be to track everything in seconds only .)
    // show minutes from seconds 

    // timer logic
    useEffect(() => {

        // decrement minutes and set seconds  when only seconds hit 0
        if (seconds <= -1 && minutes > 0 && isRunning) {
            // here timer should wait 1 sec before setting seconds to 59 
            // bcz as seconds hit 0 it doesnt wait for 1 sec to show it .. it directly sets seconds to 59 

            // Fix : instead of checking for seconds to hit 0 check if seconds hit -1
            setMinutes(prevMinutes => prevMinutes - 1)
            setSeconds(59)

        }

        // detect when seconds and minutes hit 0
        if (seconds <= 0 && minutes <= 0 && isRunning) {
            stop()
            setSeconds(0)
            setMinutes(0)
            setIsBlown(true)
            setIsRunning(false)
            audioEl.current.play()
            // alert('Time Up')
        }
    }, [seconds, minutes, isRunning])

    // constraint seconds and minutes from going to negetive and beyond 60
    useEffect(() => {
        // if (seconds < 0) {
        //     setSeconds(0)
        //     // setMinutes(prev => parseInt(prev) - 1)
        //     console.log('negatives not allowed!')
        // }
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
            setSeconds(prevSeconds => prevSeconds - 1)
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
        audioEl.current.pause()
        audioEl.current.load()
    }

    return (
        <>
            {/* minutes={minutes} seconds={seconds} isBlown={isBlown} isRunning={isRunning} */}
            <ClockView 
                props={{ minutes, seconds, isRunning, isBlown }} 
                setMinutes={(t) => setMinutes(t)} 
                setSeconds={(t) => setSeconds(t)} 
                handleReset={handleReset} 
                handleStart={handleStart}>
            </ClockView>
            <audio ref={audioEl} className="audio-element">
                <source src={timeUpS7Mp3}></source>
            </audio>
        </>
    )
}
