import React from "react";

const ScrollableCardList = ({ children }: any) => {
  return (
    <div
      className="w-[90%] bg-[rgba(200,200,200,1)] "
      style={{
        // Adjust width as needed
        height: "500px", // Adjust height as needed
        overflowY: "scroll", // Enable vertical scrolling
        border: "1px solid black", // Optional: Add border for visual clarity
        borderRadius: "5px", // Optional: Add border radius for rounded corners
        // background: "linear-gradient(to bottom, black, white)", // Add linear gradient from black to white
      }}
    >
      {children}
    </div>
  );
};

export default ScrollableCardList;
