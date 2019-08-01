import Login from '../login/index';
import CourseSelect from '../courseSelect/index';
import Home from '../Home/index';
import Docs from '../docs/index';
import Teacher from '../teacher/index';

export default [
    { path: "/", name: "Login", component: Login },
    { path: "/course-select", name: "CourseSelect", component: CourseSelect, auth: true },
    { path: "/home", name: "Home", component: Home, auth: true },
    { path: "/docs", name: "Docs", component: Docs, auth: true },
    { path: "/teacher", name:"Teacher", component: Teacher, auth: true}
]