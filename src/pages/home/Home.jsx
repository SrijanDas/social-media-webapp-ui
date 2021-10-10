import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Navbar from "../../components/Navbar/Navbar";
import "./home.css";

export default function Home() {
  return (
    <div className="pageContainer">
      <Navbar />
      <div className="page">
        <Sidebar className="sidebar" />
        <Feed />
      </div>
    </div>
  );
}
