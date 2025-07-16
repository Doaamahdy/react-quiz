import React, { useEffect } from 'react';

const Timer = ({dispatch,secondsRemaining}) => {
    const mins = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    useEffect(()=>{
        const timeInterval = setInterval(()=>{
          dispatch({type:"tick"});
        },1000)
        return ()=>{
           clearInterval(timeInterval);
        }
    },[dispatch])
    return (
        <div className='timer'>
            {mins<10 && "0"}{mins}:{seconds<10 && "0"}{seconds}
        </div>
    );
}

export default Timer;
