import main from "../assets/images/study.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            English <span>Fast & Easy</span>
          </h1>
          <p>
            Too busy to study? Learn the most useful English words, phrases and
            idioms for work and everyday life. Improve your vocabulary step by
            step. Cartoon pictures show you how to use the words, phrases and
            idioms. Pronunciation helps you say the words. Examples help you
            remember. Review exercises help you improve.
            <br />
            English Fast & Easy is written by communication specialist Marianna
            Pascal, TEDx speaker of the popular talk “Learning a language? Speak
            it like you’re playing a video game.”
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
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

export default Landing;
