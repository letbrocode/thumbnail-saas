"use client";

import { useState } from "react";

const Style = ({
  image,
  selectStyle,
  isSelected,
}: {
  image: string;
  selectStyle: () => void;
  isSelected: boolean;
}) => {
  const [mouseOver, setMouseOver] = useState(false);
  return (
    <div
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      onClick={selectStyle}
      className="relative w-fit cursor-pointer transition-all hover:scale-105"
    >
      {(mouseOver || isSelected) && (
        <>
          <div className="absolute -top-4 -right-6 h-4 w-4 -rotate-45 border-t border-black dark:border-white"></div>
          <div className="absolute -top-6 -right-3 h-4 w-4 -rotate-[75deg] border-t border-black dark:border-white"></div>
          <div className="absolute -top-0 -right-7 h-4 w-4 -rotate-[20deg] border-t border-black dark:border-white"></div>
        </>
      )}
      <img alt="examples" className="min-w-52 rounded-lg" src={image} />
    </div>
  );
};

export default Style;
