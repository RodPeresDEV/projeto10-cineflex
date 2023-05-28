import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function SeatsPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [seats, setSeats] = useState({});
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [loading, setLoading] = useState(true);

  function reserve(event) {
    event.preventDefault();
    axios
      .post(`https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many`, {
        //nota
        ids: selectedSeat,
        name: name,
        cpf: cpf,
      })
      .then(() => {
        const result = [];
        for (let i = 0; i < seats.seats.length; i++) {
          //
          const currentSeat = seats.seats[i];
          for (let j = 0; j < selectedSeat.length; j++) {
            const currentSelectedSeat = selectedSeat[j];
            if (currentSeat.id === currentSelectedSeat) {
              result.push(currentSeat);
            }
          }
        }
        navigate("/sucesso", {
          state: {
            name: name,
            cpf: cpf,
            seats: result,
            movieName: seats.movie.title,
            date: seats.day.date,
            hour: seats.name,
          },
        });
      });
  }

  function selectSeat(seat) {
    if (seat.isAvailable === false) {
      alert("Esse assento não está disponível");
      return;
    }
    if (selectedSeat.includes(seat.id) === true) {
      // []
      const seats = selectedSeat.filter(
        (currentSeat) =>
          //[12860] = selectedSeat
          //12860   é diferente a 12860
          currentSeat !== seat.id
      );

      setSelectedSeat(seats);
      return;
    }

    setSelectedSeat([...selectedSeat, seat.id]);
  }

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = "djEfD23PF9q52MAgGSFlV4A1";
    axios
      .get(
        `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${params.seatId}/seats`
      )
      .then((res) => {
        setSeats(res.data);
        setLoading(false);
      });
  }, []);

  return (
    <PageContainer>
      {loading === true ? (
        <h1>Carregando</h1>
      ) : (
        <>
          <p>Selecione o(s) assento(s)</p>
          <SeatsContainer>
            {seats.seats.map((seat) => (
              <SeatItem
                seatId={seat.id}
                selectedSeat={selectedSeat}
                onClick={() => selectSeat(seat)}
                isAvailable={seat.isAvailable}
                key={seat.id}
              >
                {seat.name}
              </SeatItem>
            ))}
          </SeatsContainer>
          <CaptionContainer>
            <CaptionItem>
              <CaptionCircle color={"#1AAE9E"} borderColor={"#0E7D71"} />
              Selecionado
            </CaptionItem>
            <CaptionItem>
              <CaptionCircle color={"#C3CFD9"} borderColor={"#7B8B99"} />
              Disponível
            </CaptionItem>
            <CaptionItem>
              <CaptionCircle color={"#FBE192"} borderColor={"#F7C52B"} />
              Indisponível
            </CaptionItem>
          </CaptionContainer>

          <FormContainer>
            Nome do Comprador:
            <input
              onChange={(event) => setName(event.target.value)}
              value={name}
              placeholder="Digite seu nome..."
            />{" "}
            {/* nota*/}
            CPF do Comprador:
            <input
              onChange={(event) => setCpf(event.target.value)}
              value={cpf}
              placeholder="Digite seu CPF..."
            />{" "}
            {/* nota*/}
            <button onClick={reserve}>Reservar Assento(s)</button>
          </FormContainer>
          <FooterContainer>
            <div>
              <img src={seats.movie.posterURL} alt={seats.movie.title} />
            </div>
            <div>
              <p>{seats.movie.title}</p>
              <p>
                {seats.day.weekday} - {seats.name}
              </p>
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
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
`;
const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const FormContainer = styled.div`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  button {
    align-self: center;
  }
  input {
    width: calc(100vw - 60px);
  }
`;
const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;
const CaptionCircle = styled.div`
  border: ${(props) => `1px solid ${props.borderColor}`};
  background-color: ${(props) => `${props.color}`};
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;
const SeatItem = styled.div`
  border: ${(props) =>
    props.isAvailable === true ? "1px solid #7B8B99" : "1px solid #F7C52B"};
  background-color: ${(props) =>
    props.selectedSeat.includes(props.seatId)
      ? "#1AAE9E"
      : props.isAvailable === true
      ? "#C3CFD9"
      : "#FBE192"};
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
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
