import { Link } from "react-router-dom";
import AuctionModel from "../../models/AuctionModel";
import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";

export const BidPlaceAndReviewBox: React.FC<{
  auction: AuctionModel | undefined;
  mobile: boolean;
  
}> = (props) => {
  const { authState } = useOktaAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [bidComment, setBidComment] = useState('');

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  console.log(authState?.idToken?.claims.preferred_username);
  
  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/Bid/placeBid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: bidAmount, comment: bidComment , auction_id: props.auction?.id , user_name:authState?.idToken?.claims.preferred_username , placed_at: new Date()}),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Handle success (e.g., show a success message, close the modal, etc.)
      handleCloseModal();
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
      // Handle error (e.g., show an error message)
    }
  };
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


        <div className="row">
          <p className="col-6 lead text-danger">
            <b>Closing Time: {props.auction?.closingTime}</b>
          </p>
          <p className="col-6 lead text-primary">
            <b>Starting Price: ${props.auction?.startingPrice}</b>
          </p>
        </div>
      </div>
      {authState?.isAuthenticated ? (
        <div>
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
    </div>
  )
};
