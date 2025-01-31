import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNav from "./component/MyNav";
import Home from "./component/Home";
import ExplorePage from "./component/ExplorePage";
import DetailsPage from "./component/DetailsPage";
import SearchPage from "./component/SearchPage";
import Footer from "./component/Footer";
import MobileNavBar from "./component/MobileNavBar";
import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  import.meta.env.VITE_ACCESS_TOKEN
}`;
const App = () => {
  return (
    <>
      <BrowserRouter>
        <MyNav />
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path=":explore" element={<ExplorePage />} />
            <Route path=":explore/:id" element={<DetailsPage />} />
            <Route path="search" element={<SearchPage />} />
          </Routes>
        </div>
        <Footer />
        <MobileNavBar />
      </BrowserRouter>
    </>
  );
};

export default App;
