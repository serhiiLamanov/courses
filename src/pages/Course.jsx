import Hls from "hls.js"
import { useEffect, useRef, useState } from "react"
import { useLoaderData, useParams } from "react-router-dom"
import MediaSpeedChanger from "../components/MediaSpeedChanger"
// import Lesson from "../components/Lesson"
import { secondsToTimestring } from "../utils/helpers"

export default function Course(){
    const course = useLoaderData()
    const {id} = useParams()

    const videoRef = useRef(null)

    const [activeLesson, setActiveLesson] = useState(0)
    const [lessonsProgress, setLessonsProgress] = useState(JSON.parse(localStorage.getItem(id)) ?? Array(course.lessons.length).fill(0))
    const [playbackRate, setPlaybackRate] = useState(localStorage.getItem("playbackRate") ?? 1)

    useEffect(() => {
        const interval = setInterval(() => {
          const currentTime = Math.floor(videoRef.current.currentTime)
          if(currentTime !== lessonsProgress[activeLesson]){
            setLessonsProgress(lP => lP.map((progress, i) => i===activeLesson ? currentTime : progress))
            localStorage.setItem(id, JSON.stringify(lessonsProgress))
          }
        }, 1000);
        return () => clearInterval(interval);
      }, [activeLesson]);

    useEffect(()=>{
        try{
            if(videoRef.current.canPlayType("application/x-mpegurl")){
                videoRef.current.src = course.lessons[activeLesson].link
            }else if(Hls.isSupported()){
                const hls = new Hls()
                hls.loadSource(course.lessons[activeLesson].link)
                hls.attachMedia(videoRef.current)
            }
        }catch(error){
            console.error(error)
        }

        videoRef.current.currentTime = lessonsProgress[activeLesson]
    }, [activeLesson])

    useEffect(()=> {console.log(playbackRate)
        localStorage.setItem("playbackRate", playbackRate)
        videoRef.current.playbackRate = playbackRate
    }, [playbackRate])

    return(
        <>
        <h2>course {course?.title}</h2>
        <p><i>{course.description}</i></p>
        <p>duration {course.duration} rating {course.rating} launched {new Date(course.launchDate).toLocaleDateString('en-us', { day:"numeric", month:"long", year:"numeric"})}</p>
        <div className="fl-container">
            <section className="lessons-container" >
                <h2>LESSONS</h2>
                {course.lessons.map((lesson, i) =>{
                    const locked = lesson.status === "locked"
                    return(
                        <div 
                            className={"lesson" + (locked ? " locked" : "")} 
                            onClick={locked ? undefined : (()=>{setActiveLesson(i); videoRef.current.focus()})}  
                            key={lesson.order}
                        >
                            <h3>{lesson.title}</h3>
                            <div className="lesson-container">
                                <p>duration {secondsToTimestring(lesson.duration)} {locked ? "locked" : <progress value={lessonsProgress[i]/lesson.duration}/>}</p>
                                <img src={`${lesson.previewImageLink}/lesson-${lesson.order}.webp`} alt={lesson.title}/>
                                <div className="lesson-overlay">LOCKED</div>
                            </div>
                        </div>
                    )
                })}
            </section>
            <section>
                <h2>{`${course.lessons[activeLesson].order} ${course.lessons[activeLesson].title}`} </h2>
                <MediaSpeedChanger speed={playbackRate} setSpeed={setPlaybackRate}/>
                <video controls ref={videoRef}/>
            </section>
        </div>
        </>
    )
}
