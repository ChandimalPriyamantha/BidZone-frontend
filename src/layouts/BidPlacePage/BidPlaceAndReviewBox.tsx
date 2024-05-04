import { Link } from "react-router-dom";
import BookModel from "../../models/AuctionModel";
import AuctionModel from "../../models/AuctionModel";

export const BidPlaceAndReviewBox: React.FC<{
  auction: AuctionModel | undefined;
  mobile: boolean;
}> = (props) => {
  return (
    <div
      className={
        props.mobile ? "card d-flex mt-5" : "card col-3 container d-flex mb-5"
      }
    >
      <div className="card-body container">
        <div className="mt-3">
          <h2>Auction Details</h2>
        </div>
        <hr />

        <div className="row">
          <p className="col-6 lead">
            <b>Closing Time: {props.auction?.closingTime}</b>
          </p>
          <p className="col-6 lead">
            <b>Starting Price: ${props.auction?.startingPrice}</b>
          </p>
        </div>
      </div>
      <Link to="/#" className="btn btn-success btn-lg">
        Sign in
      </Link>
      <hr />
      <p className="mt-3">
      This product will be delivered after the auction closing time.
      </p>
      <p>Sign in to be able to leave a bid.</p>
    </div>
  );
};
