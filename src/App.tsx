import "./App.css";
import MediaSearchSection from "./Components/MediaSearchSection";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MediaDetailsSection from "./Components/MediaDetailsSection";
import Header from "./Components/Header";
import { useState, useEffect } from "react";
import axios from "axios";

// call to API to get shows

const getSearchShows = async (query: string) => {
  return axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);
};

// get shows based on query typed on search bar

const searchShows = async (query: string) => {
  const found: any = await getSearchShows(query);
  const foundData: any[] = found.data;
  return foundData;
};

function App() {
  const [keyword, setKeyword] = useState<string>("");
  const [shows, setShows] = useState<any[]>([]);

  // save current date

  const today = new Date().toISOString().split("T")[0];

  // save query to state

  const handleSearch = (e: any) => {
    setKeyword(e.target.value);
  };

  // when user clicks search we save searched results to state

  const callSearchFunction = async (e: any) => {
    e.preventDefault();
    setShows(await searchShows(keyword));
  };

  // when page loads display shows scheduled for current date in GB

  useEffect(() => {
    fetch(`https://api.tvmaze.com/schedule?country=GB&date=${today}`)
      .then((response) => response.json())
      .then((data) => {
        setShows(data);
      });
  }, [today]);

  return (
    <div className="App">
      <Router>
        <Header
          handleSearch={handleSearch}
          callSearchFunction={callSearchFunction}
          keyword={keyword}
        />
        <Routes>
          <Route path="/" element={<MediaSearchSection shows={shows} />} />
          <Route path="/shows/:id" element={<MediaDetailsSection />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
