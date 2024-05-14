import React, { useState, useEffect } from "react";
import axios from "axios";
import Shimmer from "./Shimmer";

interface Restaurant {
  info: {
    name: string;
    areaName: string;
    avgRatingString: number;
    costForTwo: number;
    cloudinaryImageId: string;
    cuisines: string[];
  };
}

function filterData(searchInput: string, restaurants: Restaurant[]) {
  const filteredData = restaurants.filter((restaurant) =>
    restaurant.info.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  return filteredData;
}

function RestrauantCard() {
  const [restaurantData, setRestaurantData] = useState<Restaurant[] | null>(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://foodfire.onrender.com/api/restaurants?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING"
        );
        const restaurants: Restaurant[] =
          response?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        setRestaurantData(restaurants);
        setFilteredRestaurants(restaurants);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchData();
    return () => {
      setRestaurantData(null);
    };
  }, []);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    const data = filterData(e.target.value, restaurantData || []);
    setFilteredRestaurants(data);
  };

  const handleSearchButtonClick = () => {
    const data = filterData(searchInput, restaurantData || []);
    setFilteredRestaurants(data);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchButtonClick();
    }
  };

  if (!restaurantData) {
    return (
      <div className="flex justify-center items-center h-full">
        <Shimmer />
      </div>
    );
  }

  return (
    <div>
      <div className="mx-auto w-full mt-16  justify-evenly">
        <div className="mt-8  ml-8">
          <h2 className="font-bold text-2xl">Restaurants with online food delivery in Delhi</h2>
        </div>
        <div className=" flex justify-end m-4 mt-4">
          <input
            type="text"
            placeholder="Search for Dishes and Restaurants"
            className="shadow-lg mx-2 px-6 rounded-lg w-1/4"
            value={searchInput}
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress}
          />
          <button
            className="p-2 px-4 bg-blue-600 text-white rounded-md ml-4"
            onClick={handleSearchButtonClick}
          >
            Search
          </button>
        </div>
        <div className="grid grid-cols-4 gap-8  justify-evenly ">
          {filteredRestaurants.map((restaurant, index) => (
            <div
              key={index}
              className="relative cursor-pointer p-6 m-8 border-2  w-64 md:w-[330px] h-full rounded-lg shadow-lg overflow-hidden group transition-transform duration-300"
            >
              <img
                className="w-[100%] h-[180px] object-cover group-hover:-translate-y-2 transition-transform duration-300 ease-in-out delay-200"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/${restaurant.info.cloudinaryImageId}`}
                alt=""
              />
               <h2 className="text-lg font-serif font-semibold my-3 ">{restaurant.info.name}</h2>
                <h3 className="font-semibold  text-gradient ">{restaurant.info.cuisines.join(", ")}</h3>
                <h4 className="my-1 ">
                  <span>&#x1F4CD;</span> {restaurant.info.areaName}
                </h4>
              <div className="absolute font-extrabold bottom-0 left-0  w-full bg-gradient-to-t from-blue-800 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out delay-5000">
                <h3 className="text-lg  font-semibold my-3 ">{restaurant.info.name}</h3>
                <p className="">{restaurant.info.cuisines.join(", ")}</p>
                <h4 className="my-1 ">
                  <span>&#x1F4CD;</span> {restaurant.info.areaName}
                </h4>
                <h4 className="my-1 ">{restaurant.info.avgRatingString} ⭐️ </h4>
                <h4 className="my-1">{restaurant.info.costForTwo}</h4>
                <button className="bg-white text-blue-500 px-4 py-2 mt-2 rounded-md ">
                  Order Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RestrauantCard;
