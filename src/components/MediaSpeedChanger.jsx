import { useCallback, useEffect } from "react";

export default function MediaSpeedChanger({speed, setSpeed}){
    const handleKeyPress = event => {
        console.log(`Key pressed: ${event.key}`)
        if(event.shiftKey){
            if(event.key === "<"){
                setSpeed(speed - 0.25)
            }else if(event.key === ">"){
                setSpeed(speed + 0.25)
            }
        }
      }

    useEffect(() => {
        document.addEventListener('keyup', handleKeyPress)
        return () => {
          document.removeEventListener('keyup', handleKeyPress)
        };
      }, [handleKeyPress])

    return(
        <div className="media-speed-changer">
            <button onClick={()=>setSpeed(speed-0.25)} disabled={speed == 0.25}>slowdown (shift_&lt)</button>
            {speed}
            <button onClick={()=>setSpeed(speed+0.25)} disabled={speed == 5}>speed up (shift_&gt;)</button>
        </div>
    )
}