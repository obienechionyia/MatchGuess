import Match from "./Match";
import Wrapper from "../assets/wrappers/MatchesContainer";
import PageBtnContainer from "./PageBtnContainer";
import { useAllMatchesContext } from "../pages/AllMatches";

const MatchesContainer = () => {
  const { data } = useAllMatchesContext();
  const { matches, totalMatches } = data;
  if (matches.length === 0) {
    return (
      <Wrapper>
        <h2>No matches found...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalMatches} match{matches.length > 1 && "es"} found
      </h5>
      <div className="jobs">
        {matches.map((match) => {
          return <Match key={match._id} {...match} />;
        })}
      </div>
    </Wrapper>
  );
};

export default MatchesContainer;
