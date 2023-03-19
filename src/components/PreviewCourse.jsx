export default function PreviewCourse({course}){
    return(
        <div className="course">
            <h2>{course.title}</h2>
            <div>
                <img src={course.previewImageLink + '/cover.webp'} alt={course.title}></img>
                <div>
                    <p>lessons {course.lessonsCount}</p>
                    <p>rating {course.rating}</p>
                    {course.meta.skills && <ul className="skills">
                        {course.meta.skills.map((skill, i) => <li key={i}>{skill}</li>)}
                    </ul>}
                </div>
            </div>            
        </div>
    )
}