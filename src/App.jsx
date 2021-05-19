import React, { useState } from 'react'
import Footer from './components/Footer'
import Stopwatch from './views/Stopwatch'
import Timer from './views/Timer'

export default function App() {

    const [timerMode, setTimerMode] = useState(true)
    return (
        <div className="app">
            <div className="menu-bar">
                <div
                    className={timerMode ? "active" : null}
                    onClick={() => setTimerMode(true)}>
                    Timer
                    </div>
                <div
                    className={!timerMode ? "active" : null}
                    onClick={() => setTimerMode(false)}>
                    Stopwatch
                </div>
            </div>
            {timerMode ?  <Timer /> : <Stopwatch />}
            <Footer>
            Designed by: <a href="https://github.com/Rayanfer32/react-timer-stopwatch">Rayanfer32</a>
            </Footer>
        </div>
    )
}
