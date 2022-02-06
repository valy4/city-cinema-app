import './App.css';
import MediaSearchSection from './Components/MediaSearchSection'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import MediaDetailsSection from './Components/MediaDetailsSection';
import Header from './Components/Header';
import { useState, useEffect } from 'react';
import axios from 'axios';

const getSearchMovies = async (query: string) => {
  return axios.get(`https://api.tvmaze.com/search/shows?q=${query}`)
}

const searchMovies =  async (query: string) => {
  const found: any = await getSearchMovies(query);
  const foundData: any[] = found.data;
  return foundData;
}


function App() {

  const [keyword, setKeyword] = useState<string>("");
  const [shows, setShows] = useState<any[]>([]);

  const today = new Date().toISOString().split('T')[0];


  const handleSearch = (e:any) => {
    setKeyword(e.target.value);
  }

  const callSearchFunction = async (e:any) => {
    e.preventDefault();
      setShows(await searchMovies(keyword));
  }

  useEffect(()=>{
    fetch(`https://api.tvmaze.com/schedule?country=GB&date=${today}`)
    .then((response) => response.json())
    .then((data) =>{ setShows(data) })
  },[])

  return (
    <div className="App">
      <Router>
        <Header handleSearch={handleSearch} callSearchFunction={callSearchFunction} keyword={keyword} />
        <Routes>
          <Route path="/" element={<MediaSearchSection shows={shows} />} />
          <Route path="/shows/:id" element={<MediaDetailsSection />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;