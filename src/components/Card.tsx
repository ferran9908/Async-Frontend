import React, { FC } from "react";

interface Props {}

const Card: FC<Props> = ({ children }) => {
  return (
    <div className="h-1/3 w-1/3 bg-tropical-blue p-4 shadow-xl rounded-xl text-center">
      {children}
    </div>
  );
};

interface Props {}

export default Card;
