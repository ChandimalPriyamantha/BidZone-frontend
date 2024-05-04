import { Link } from "react-router-dom";
import BookModel from "../../models/AuctionModel";
import AuctionModel from "../../models/AuctionModel";
import { useOktaAuth } from "@okta/okta-react";

export const BidPlaceAndReviewBox: React.FC<{
  auction: AuctionModel | undefined;
  mobile: boolean;
  
}> = (props) => {
  const { authState } = useOktaAuth();
  return (
    <div
      className={
        props.mobile ? "card d-flex mt-5" : "card col-3 container d-flex mb-5"
      }
    >
        <div className='card-body container'>
            <div className="mt-3">
              <p>
                <b>0/5</b>
                books checked out
              </p>
            </div>
            <hr/>
           {props.auction && props.auction.startingPrice && props.auction.startingPrice > 0 ?
           <h4 className='text-success'>
            Available
           </h4>
           :
           <h4 className='text-danger'>
                Wait List
           </h4>
           }
           <div className='row'>
              <p className='col-6 lead'>
             <b>
                {props.auction?.closingTime}
             </b>
             copies
              </p>
              <p className='col-6 lead'>
             <b>
                {props.auction?.startingPrice}
             </b>
             available
              </p>
           </div>
        </div>
        {authState?.isAuthenticated ? (
          <Link
            type="button"
            className="btn main-color btn-lg text-white"
            to={`/checkout/${props.auction?.id}`} 
          >
            Place a Bid
          </Link>
        ) : (
          <Link className="btn main-color btn-lg text-white" to="/login">
            Sign in
          </Link>
        )
          }
        <hr/>
        <p className='mt-3'>
          This number can change until placing order has been complete.
        </p>
        <p>
            Sign in to be able to leave a review.
        </p>
    </div>
  );
};
