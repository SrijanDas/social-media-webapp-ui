import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import "./home.css";

export default function Home() {
  return (
    <div className="pageContainer">
      <Topbar />
      <div className="page">
        <Sidebar className="sidebar" />
        <Feed />
      </div>
    </div>
  );
}
