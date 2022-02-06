import '../App.css';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import noImageAvailable from "../assets/noImage.png";

export default function MediaSearchSection(props: any) {
  return (
    <div >
      <Container>
        {props.shows?.map((show:any) => (
          <Link to={`/shows/${show.show.id}`}>
            <Poster key={show?.show.id} src={show.show?.image ? show.show?.image?.original : noImageAvailable }  />
          </Link>
        ))}
      </Container>
    </div>
  )
}

const Poster = styled.img`
width: 13rem;
height: 15rem;
margin:2rem;
border-radius: 5px;
cursor: pointer;
&:hover{
  box-shadow: 5px 10px;
}`;
const Container = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
`;

