import React, { useState, useEffect } from "react";
import RestaurantImage1 from "./assetsLaindingPage/background-restaurant.jpg";
import RestaurantImage2 from "./assetsLaindingPage/background-restaurant-2.jpg";
import "./home.scss";

function Home() {
  const [currentImage, setCurrentImage] = useState(RestaurantImage1);
  const [isTransitioning, setIsTransitioning] = useState(false);

   useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImage((prevImage) =>
          prevImage === RestaurantImage1 ? RestaurantImage2 : RestaurantImage1
        );
        setIsTransitioning(false);
      }, 500);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage">
      <div className="home">
        <div
          className={`backgroundRestaurant ${isTransitioning ? "transition" : ""}`}
          style={{ backgroundImage: `url(${currentImage})` }}
        />
        <p className="title">Welcome to our restaurant</p>
        <h1 className="blog">Blog</h1>
        <p className="content-blog">
          Welcome to "The Gourmet Explorer" - where we embark on a culinary
          journey to discover exquisite flavors and exceptional dining
          experiences around the world. Join us as we share articles, reviews,
          and recommendations of top-notch restaurants, from traditional
          kitchens to innovative and creative establishments. Our blog is a
          source of inspiration for food enthusiasts who want to explore
          outstanding dining destinations worldwide. We'll take you on a
          flavorful adventure, showcasing unique traditional dishes and
          unraveling the culinary culture of each location. From flavorful pho
          in Vietnam to mouthwatering pizzas in Italy, and authentic Japanese
          lunches, we offer a diverse and rich culinary experience. Beyond
          restaurant introductions, we also share cooking recipes, tips, and
          techniques, enabling you to recreate delicious meals at home. Detailed
          articles, guides, and step-by-step instructions will help you become a
          skilled chef in your own kitchen. Join us on "The Gourmet Explorer"
          and let us be your source of inspiration and valuable companion on
          your culinary journey. Together, let's explore the world of
          gastronomy, from renowned dining establishments to hidden local gems.
          Let "The Gourmet Explorer" fuel your passion for food and elevate your
          dining experiences.
        </p>
      </div>
    </div>
  );
}

export default Home;
