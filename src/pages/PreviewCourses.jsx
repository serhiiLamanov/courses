import { useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom"

import Sweetpagination from "sweetpagination"
import PreviewCourse from "../components/PreviewCourse"

export default function PreviewCourses(){
    const{courses} = useLoaderData()
    const [currentPageData, setCurrentPageData] = useState(courses.slice(0,10))
     return(
     <>
        <Sweetpagination 
            currentPageData={setCurrentPageData}
            getData={courses}
            dataPerPage={10}
            navigation={true}
        />
        <div className="courses-preview">
            {currentPageData.map(course => 
                (<NavLink to={"../course/"+course.id} key={course.id}>
                    <PreviewCourse course={course}/>
                </NavLink>)
            )}
        </div>
     </>
    )
}