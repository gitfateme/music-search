import "./css/Home.scss";
import Search from "./Search";
import Header from "./Header";
import Footer from "./Footer";
import Trending from "./Trending";

function Home() {
  return (
    <div className="Home d-flex flex-column">
      <Header />
      <h1 className="text-center pt-5"> GoozAhang</h1>

      <p className="text-center">میتونی بخشی از آهنگ رو وارد کنی و پیداش کنی</p>
      <Search />
      <hr className="mx-5 mt-5" />
      <Trending />
      <Footer />
    </div>
  );
}

export default Home;
