import styled from "styled-components";
import HomePage from "./pages/HomePage/HomePage";
import { Route, BrowserRouter, Routes, Link } from "react-router-dom"; //mudança de página dentro do site
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import ResetStyle from "./style/ResetStyle";
import GlobalStyle from "./style/GlobalStyle";

export default function App() {
  return (
    <BrowserRouter>
      <ResetStyle />
      <GlobalStyle />
      <Link to="/">
        <NavContainer>CINEFLEX</NavContainer>
      </Link>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sessoes/:movieId" element={<SessionsPage />} />
        <Route path="/assentos/:seatId" element={<SeatsPage />} />
        <Route path="/sucesso" element={<SuccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const NavContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c3cfd9;
  color: #e8833a;
  font-family: "Roboto", sans-serif;
  font-size: 34px;
  position: fixed;
  top: 0;
  a {
    text-decoration: none;
    color: #e8833a;
  }
`;
