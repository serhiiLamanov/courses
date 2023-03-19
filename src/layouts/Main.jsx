import { NavLink, Outlet } from "react-router-dom";
import "../styles/style.css"

export default function Main(){
    return(
     <>
        <header>
            <h1>Courses App</h1>
            <nav>
                <NavLink to={"/preview-courses"}>preview-courses</NavLink>
                <NavLink to={"/course"}>course</NavLink>
            </nav>
        </header>
        <main>
            <Outlet/>
        </main>
   
     </>
    )  
}