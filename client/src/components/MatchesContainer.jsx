import Match from "./Match";
import Wrapper from "../assets/wrappers/MatchesContainer";

import { useAllMatchesContext } from "../pages/AllMatches";

const MatchesContainer = () => {
  const { data } = useAllMatchesContext();
  const { matches } = data;
  if (matches.length === 0) {
    return (
      <Wrapper>
        <h2>No matches to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="jobs">
        {matches.map((match) => {
          return <Match key={match._id} {...match} />;
        })}
      </div>
    </Wrapper>
  );
};

export default MatchesContainer;
