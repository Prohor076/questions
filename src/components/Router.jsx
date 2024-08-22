import { HashRouter, Routes, Route } from "react-router-dom";
import General from "./general/General";
import Quiz from "./quiz/Quiz";
import App from "./App";

const Router = () => {
    return <HashRouter>
        <Routes>
            <Route element={<App/>} path='/'></Route>
            <Route element={<Quiz/>} path='/quiz/:id'></Route>

            <Route element={<App/>} path='*'></Route>
        </Routes>
    </HashRouter>
}

export default Router;