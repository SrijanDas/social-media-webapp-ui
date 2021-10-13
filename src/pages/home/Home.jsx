import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import "./home.css";

export default function Home() {
  return (
    <div className="pageContainer">
      {/* <Navbar /> */}
      <div className="page">
        <Sidebar className="sidebar" />
        <Feed className="pageContent" />
        <Rightbar />
      </div>
    </div>
  );
}
