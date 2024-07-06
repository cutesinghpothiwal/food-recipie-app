import { useContext } from "react";
import { GlobalContext } from "../../context/context";
import RecipeItem from "../../components/recipe-list/recipe";



export default function Favourites(){
    const { favouriteList, loading } = useContext(GlobalContext);

    if (loading) return <div>Loading Please wait...</div>;
  
    return (
      <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
        {favouriteList && favouriteList.length > 0 ? (
          favouriteList.map((item) => <RecipeItem item={item} />)
        ) : (
          <div>
            <p className="lg:text-4xl  text-xl text-center text-black font-bold">
              {" "}
              Nothing is Added !{" "}
            </p>
          </div>
        )}
      </div>
    );
}