export const secondsToTimestring = totalSeconds => {
    const totalMinutes = Math.floor(totalSeconds / 60)

    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    const seconds = totalSeconds % 60

    let result = hours ? `${hours}:` : ''
    result += (hours && (minutes < 10)) ? "0" + minutes : minutes
    result += (seconds < 10) ? ":0" + seconds : ":" + seconds
    
    return result
}