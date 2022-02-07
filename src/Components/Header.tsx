import styled from "styled-components";

export default function Header(props: any) {
  return (
    <Head className="titleSearch">
      <h1 className="title">City Cinema</h1>
      <div className="inputButton">
        <input
          className="inputField"
          value={props.keyword}
          onChange={props.handleSearch}
          placeholder="Search"
          type="text"
        />
        <button
          className="buttonSearch"
          onClick={props.callSearchFunction}
          type="submit"
        >
          <i className="fa fa-search icon"></i>
        </button>
      </div>
    </Head>
  );
}

const Head = styled.div`
  background-color: black;
`;
