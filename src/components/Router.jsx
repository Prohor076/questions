import { BrowserRouter, Routes, Route } from "react-router-dom";
import General from "./general/General";
import Quiz from "./quiz/Quiz";
import App from "./App";

const Router = () => {
    return <BrowserRouter>
        <Routes>
            <Route element={<App/>} path='/questions'></Route>
            <Route element={<Quiz/>} path='/questions/quiz/:id'></Route>

            <Route element={<div>404 Not Found</div>} path='*'></Route>
        </Routes>
    </BrowserRouter>
}

export default Router;