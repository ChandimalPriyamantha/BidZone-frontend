import React from "react";

import { Link } from "react-router-dom";
import AuctionModel from "../../../models/AuctionModel";

export const ReturnAuction   : React.FC<{ auction: AuctionModel }> = (props) => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        {props.auction.img ? (
          <img src={props.auction.img} width="151" height="233" alt="book" />
        ) : (
          <img
            src={require("./../../../Images/BooksImages/book-luv2code-1000.png")}
            width="151"
            height="233"
            alt="book"
          />
        )}

        <h6 className="mt-2">{props.auction.name}</h6>
        <p>{props.auction.userName}</p>
        <Link className="btn main-color text-white" to={`checkout/${props.auction.id}`}>
          Reserve
        </Link>
      </div>
    </div>
  );
};
