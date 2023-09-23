import { FaLocationArrow, FaCalendarAlt } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Match";
import MatchInfo from "./MatchInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const Match = ({
  _id,
  opponent1,
  opponent2,
  location,
  matchDate,
  predictedWinner,
}) => {
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{predictedWinner.charAt(0)}</div>
        <div className="info">
          <h2>{opponent1}</h2>
          <h2 style={{ textTransform: "none" }}>vs</h2>
          <h2>{opponent2}</h2>
          <p>Your Predicted Winner: {predictedWinner}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <MatchInfo icon={<FaLocationArrow />} text={location} />
          <MatchInfo icon={<FaCalendarAlt />} text={matchDate} />
        </div>

        <footer className="actions">
          <Link to={`../edit-match/${_id}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="post" action={`../delete-match/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Match;
