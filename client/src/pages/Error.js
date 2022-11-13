import { Link } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="not found" />
        <h3>Ohh! page not found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/">back home</Link>
      </div>
      <footer className="copyright">
        © 2022 Develope by
        <a
          className="mohammad"
          href="https://mohammadketabi.com"
          target="_blank"
        >
          Mohammad Ketabi
        </a>
      </footer>
    </Wrapper>
  );
};

export default Error;
