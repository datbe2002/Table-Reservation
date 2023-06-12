import React from "react";
import Navigation from "../../components/navigation/Navigation";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <Navigation />
        <div>
          <div>Contact</div>
          <div>+(69)123456789</div>
          <div>restaurant@gmail.com</div>
        </div>
        <div>
          <div>Address</div>
          <p>
            Lorem ipsum dolor sit amet <br />
            consectetur adipisicing elit.
          </p>
        </div>
      </div>
      <div>@copyright by restaurant name</div>
    </>
  );
};

export default Footer;
