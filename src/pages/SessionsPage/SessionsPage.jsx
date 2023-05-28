import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

export default function SessionsPage() {
  const params = useParams(); //nota
  const [sessions, setSessions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = "djEfD23PF9q52MAgGSFlV4A1";
    axios
      .get(
        `https://mock-api.driven.com.br/api/v8/cineflex/movies/${params.movieId}/showtimes`
      )
      .then((res) => {
        setSessions(res.data);
        setLoading(false);
      });
  }, []);

  return (
    <PageContainer>
      {loading === true ? (
        <h1>Carregando</h1>
      ) : (
        <>
          <p>Selecione o horário</p>
          <div>
            {sessions.days.map((day) => (
              <SessionContainer key={day.id}>
                <p data-test="movie-day">
                  {day.weekday} - {day.date}
                </p>
                <ButtonsContainer>
                  {day.showtimes.map((time) => (
                    <Link data-test="showtime" to={`/assentos/${time.id}`} key={time.id}>
                      <button>{time.name}</button>
                    </Link>
                  ))}
                </ButtonsContainer>
              </SessionContainer>
            ))}
          </div>
          <FooterContainer data-test="footer">
            <div>
              <img src={sessions.posterURL} alt={sessions.title} />
            </div>
            <div>
              <p>{sessions.title}</p>
            </div>
          </FooterContainer>
        </>
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
  div {
    margin-top: 20px;
  }
`;
const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Roboto";
  font-size: 20px;
  color: #293845;
  padding: 0 20px;
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  button {
    margin-right: 20px;
  }
  a {
    text-decoration: none;
  }
`;
const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c3cfd9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 12px;
    img {
      width: 50px;
      height: 70px;
      padding: 8px;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      text-align: left;
      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
`;
