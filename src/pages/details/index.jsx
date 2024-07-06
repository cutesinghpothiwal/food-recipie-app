import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context/context";

export default function Details() {
  const { id } = useParams();
  const { recipeDetails, setRecipeDetails, favouriteList, handleAddFavourite } =
    useContext(GlobalContext);

  const [loading, setLoading] = useState(true); // Initially set to true

  useEffect(() => {
    async function getRecipeDetails() {
      try {
        const response = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
        );
        const data = await response.json();

        if (data?.data?.recipe) {
          setRecipeDetails(data.data.recipe);
        }

        setLoading(false); // Mark loading as false after data fetch
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setLoading(false); // Ensure loading is set to false on error
      }
    }

    getRecipeDetails();
  }, [id]);

  console.log(recipeDetails);

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="row-start-2 lg:row-start-auto">
            <div className="h-96 overflow-hidden rounded-xl group">
              <img
                alt="OOps"
                src={recipeDetails?.image_url}
                className="w-full h-full object-cover block group-hover:scale-105 duration-300"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-sm text-cyan-700 font-medium">
              {recipeDetails.publisher}
            </span>
            <h3 className="font-bold text-2xl truncate text-black">
              {recipeDetails.title}
            </h3>

            <div>
              <button
                onClick={() => handleAddFavourite(recipeDetails)}
                className="p-3 px-8 rounded-lg text-sm uppercase font-medium  tracking-wider shadow-md bg-black text-white inline-block"
              >
                {favouriteList &&
                favouriteList.length &&
                favouriteList.findIndex(
                  (item) => item.id === recipeDetails.id
                ) !== -1
                  ? "Remove From Favourites"
                  : "Add To Favourites"}
              </button>
            </div>
            <div>
              <span className="text-2xl font-semibold text-black">
                Ingredients
              </span>
              <ul className="flex flex-col gap-3">
                {recipeDetails.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <span className="text-xl font-semibold text-black">
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                    <span className="text-xl font-semibold text-black">
                      {ingredient.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
