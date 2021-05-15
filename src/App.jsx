import React,{useState} from 'react'
import Stopwatch from './views/Stopwatch'
import Timer from './views/Timer'

export default function App() {

    const [timerMode, setTimerMode] = useState(true)
    return (
        <div className="app">
            <div className="menu-bar">
                <div className={!timerMode? "active" : null} onClick={() => setTimerMode(false)}>Timer</div>
                <div className={timerMode? "active" : null} onClick={() => setTimerMode(true)}>Stopwatch</div>
            </div>
            {/* <button className="timer-stopwatch-toggle" onClick={() => setTimerMode(prevState => !prevState)}>{timerMode ? "Timer":"Stopwatch"}</button> */}
            {timerMode ?   <Stopwatch /> : <Timer />  }
            
        </div>
    )
}
