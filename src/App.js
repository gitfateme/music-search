import "./css/App.css";
import SearchPage from "./SearchPage";
import Header from "./Header";
import Footer from "./Footer";
import Trending from "./Trending";

function App() {
  return (
    <div className="App d-flex flex-column">
      <Header />
      <h1 className="text-center pt-5">آهنگیاب</h1>
      <p className="text-center">
        میتونی بخشی از آهنگ مورد علاقه ات رو وارد کنی و پیداش کنی
      </p>
      <SearchPage />
      <Trending />
      <Footer />
      {/* <MusicPlayerBar /> */}
    </div>
  );
}

export default App;
