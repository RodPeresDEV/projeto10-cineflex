import styled from "styled-components";
import { useEffect, useState } from "react"; //
import axios from "axios";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    //useEffect é utilizado para disparar uma ação quando a página for acessada
    axios.defaults.headers.common["Authorization"] = "djEfD23PF9q52MAgGSFlV4A1";
    axios
      .get("https://mock-api.driven.com.br/api/v8/cineflex/movies")
      .then((res) => {
        setCatalog(res.data);
      });
  }, []);
  
  return (
    <PageContainer>
      {catalog.length === 0 ? (
        <h1>Carregando</h1>
      ) : (
        <>
          <h1>Selecione o Filme</h1>
          <ListContainer>
            {catalog.map((movie) => (
              <Link to={`/sessoes/${movie.id}`} key={movie.id}>
                <MovieContainer>
                  <img data-test="movie" src={movie.posterURL} alt={movie.title} />
                </MovieContainer>
              </Link>
            ))}
          </ListContainer>
        </>
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-top: 70px;
`;
const ListContainer = styled.div`
  width: 330px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 10px;
`;
const MovieContainer = styled.div`
  width: 145px;
  height: 210px;
  box-shadow: 0px 2px 4px 2px #0000001a;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  img {
    width: 130px;
    height: 190px;
  }
`;
