import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import {Route, BrowserRouter, Routes, Link} from "react-router-dom" //mudança de página dentro do site
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import ResetStyle from "./style/ResetStyle"
import GlobalStyle from "./style/GlobalStyle"

export default function App() {
    return (
        <BrowserRouter>
        <ResetStyle/>
        <GlobalStyle/>
        <Link to="/">
        <NavContainer>CINEFLEX</NavContainer>
        </Link>
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/sessions/:movieId" element={<SessionsPage/>}/>
        </Routes>
            {/* <SeatsPage /> */}
            {/* <SessionsPage /> */}
            {/* <SuccessPage /> */}
        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
