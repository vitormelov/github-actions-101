import debounce from "lodash.debounce";
import { useCallback, useState } from "react";
import Favorites from "./Favorites";
import SuggestionsList from "./SuggestionsList";

// This endpoint is from TheMovieDB https://developers.themoviedb.org/3/search/search-movies
// There is a missing query string `query` to make the search
const MOVIES_ENDPOINT =
  "https://api.themoviedb.org/3/search/movie?api_key=a0471c3efcac73e624b948daeda6085f&query=";

export default function AutocompleteInput() {
  const [favorites, setFavorites] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [focused, setFocused] = useState(false);
  const [mappedResponses, setMappedResponses] = useState({});

  async function fetchResults(query) {
    const response = await fetch(MOVIES_ENDPOINT + query).then((res) =>
      res.json()
    );
    setMappedResponses({ ...mappedResponses, [query]: response });
    return response;
  }

  const changeHandler = async (event) => {
    const toSearch = event.target.value;
    const response =
      mappedResponses[toSearch] || (await fetchResults(toSearch));

    setSuggestions(response.results);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChangeHandler = useCallback(debounce(changeHandler, 250), [
    mappedResponses,
  ]);

  return (
    <div className="flex flex-col justify-center items-center">
      <input
        className="text-lg text-primary border-primary border rounded-md w-48 focus:w-96 transition-all focus:outline-none p-1 mb-2"
        placeholder="Search"
        type="text"
        onChange={debouncedChangeHandler}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {focused && (suggestions || []).length > 0 && (
        <SuggestionsList
          suggestions={suggestions}
          onSelect={(selected) => {
            if (!(favorites || []).includes(selected)) {
              setFavorites([...favorites, selected]);
            }
          }}
        />
      )}
      {favorites && favorites.length > 0 && <Favorites favorites={favorites} />}
    </div>
  );
}
