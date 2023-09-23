import { toast } from "react-toastify";
import { MatchesContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async ({ request }) => {
  try {
    const { data } = await customFetch.get("/matches");
    return {
      data,
    };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllMatchesContext = createContext();

const AllMatches = () => {
  const { data } = useLoaderData();

  return (
    <AllMatchesContext.Provider value={{ data }}>
      <SearchContainer />
      <MatchesContainer />
    </AllMatchesContext.Provider>
  );
};

export const useAllMatchesContext = () => useContext(AllMatchesContext);

export default AllMatches;
