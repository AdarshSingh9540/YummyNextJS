import React, { useState, useEffect } from "react";
import axios from "axios";

interface Restaurant {
  info: {
    name: string;
    areaName: string;
    avgRatingString: number;
    costForTwo:number;
    cloudinaryImageId:string;
    // Add any other properties here
  }
}

function RestrauantCard() {
  const [restaurantData, setRestaurantData] = useState<Restaurant[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://foodfire.onrender.com/api/restaurants?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING"
        );
        // Access the correct nested structure of your API response
        const restaurants: Restaurant[] = response?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        setRestaurantData(restaurants);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };
  
    fetchData();
    return () => {
      setRestaurantData(null);
    };
  }, []);

  if (!restaurantData) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-center">
        {/* For demonstration purposes, let's assume each restaurant object has name, location, and rating properties */}
        {console.log(restaurantData)}
        {restaurantData.map((restaurant, index) => (
          <div key={index}>
             <img
          className="w-48 h-auto"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/${restaurant.info.cloudinaryImageId}`}
          alt=""
        />
            <h3>{restaurant.info.name}</h3>
            <h4>{restaurant.info.areaName}</h4>
            <h4>{restaurant.info.avgRatingString} stars</h4>
            <h4>{restaurant.info.costForTwo}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestrauantCard;
