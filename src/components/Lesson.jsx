export default function Lesson({lesson}){

    return(
        <div className="lesson">
            <h3>{lesson.title}</h3>
            <p>duration {lesson.duration} {lesson.status === "locked" ? "locked" : 'progress'}</p>
            <img src={`${lesson.previewImageLink}/lesson-${lesson.order}.webp`} alt={lesson.title}></img>
        </div>
    )
}