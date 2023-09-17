import PublicHeader from "../../components/header/public/PublicHeader";
import "./NotFound.scss";
import { Link} from 'react-router-dom';
export default function NotFound() {
  return (
    <>
      <PublicHeader />
      <div className="main404">
        <img
          className="imgmungbean"
          src="/mungbean.png"
          width={300}
          height={300}
        />
      </div>
      <div className="txt404">
         <h3 className="notfound" > <span className="sp1">4</span><span className="sp2">0</span><span className="sp3">4</span> NOT FOUND</h3> 
         <p className="textwarn">It's look like you may have taken a wrong turn, Don't worry..It happens to the most of us</p>
            <Link to="/">GO BACK TO OUR HOME PAGE</Link>
        </div>
    </>
  );
}
