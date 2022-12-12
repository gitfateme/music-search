import "./css/SearchPage.scss";
import Search from "./Search";
import Header from "./Header";
import Footer from "./Footer";

function SearchPage() {
  return (
    <div className="SearchPage d-flex flex-column">
      <Header />
      <h1 className="text-center pt-5"> - Search </h1>
      <p className="text-center">میتونی بخشی از آهنگ رو وارد کنی و پیداش کنی</p>
      <Search />
      <Footer />
    </div>
  );
}

export default SearchPage;
