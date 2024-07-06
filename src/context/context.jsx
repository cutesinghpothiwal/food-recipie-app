import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [favouriteList, setFavouriteList] = useState([]);
  const navigate = useNavigate()

  function handleAddFavourite(getCurrentItem) {
    let copyFavouritesList = [...favouriteList];
    const index = copyFavouritesList.findIndex(
      (item) => item.id === getCurrentItem.id
    );
    if (index === -1) {
      copyFavouritesList.push(getCurrentItem);
    } else {
      copyFavouritesList.splice(index);
    }
    setFavouriteList(copyFavouritesList);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await response.json();

      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
        navigate('/')
      }

      console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSearchParam("");
    }
  }

  console.log(recipeList);

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        loading,
        recipeList,
        setRecipeDetails,
        handleSubmit,
        recipeDetails,
        handleAddFavourite,
        favouriteList
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
