import { Link } from "react-router-dom";
import BookModel from "../../models/AuctionModel";
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
      {authState?.isAuthenticated ? (
        <div>
          <Link
            type="button"
            className="btn main-color btn-lg text-white"
            to={`/checkout/${props.auction?.id}`} 
            onClick={handleOpenModal}
          >
            Place a Bid
          </Link>
          <hr />
                  <p className="mt-3">
                  This product will be delivered after the auction closing time.
                  </p>
        </div>
          
          
        ) : (
          <div>
                <Link to="/#" className="btn btn-success btn-lg">
                  Sign in
                </Link>
                <hr />
                <p className="mt-3">
                This product will be delivered after the auction closing time.
                </p>
                <p>Sign in to be able to leave a bid.</p>
          </div>
        
        )
      }

      {isModalOpen && (
          <div style={{
            position: 'fixed',
            zIndex: 1,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            overflow: 'auto',
            backgroundColor: 'rgba(0,0,0,0.4)',
            borderRadius: '20px',

          }}>
            <div style={{
              backgroundColor: '#fefefe',
              margin: '15% auto',
              padding: '20px',
              border: '1px solid #888',
              width: '500px',
              borderRadius: '20px',
            }}>
              <span style={{float: 'right', fontSize: '28px', cursor: 'pointer'}} onClick={handleCloseModal}>&times;</span>
              <h3 >Place a Bid</h3>
              <label className=" my-1 text-secondary"> Fill in the details below to place a bid!</label>
              <form>
                <div>
                  <label className=" form-label" htmlFor="bidAmount">Bid Amount</label>
                  <input
                    className="form-control"
                    type="number"
                    id="bidAmount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                  />
                  
                </div>
                <div className=" mt-3">
                  <label className=" form-label" htmlFor="bidComment">Comment</label>
                  <input
                    className="form-control"
                    type="text"
                    id="bidComment"
                    value={bidComment}
                    onChange={(e) => setBidComment(e.target.value)}
                  />
                </div>
                <div className=" pt-2 mt-2" >
                <button
                  className="btn btn-success btn-sm mx-2"
                  style={{width:"70px"}}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default form submission behavior
                    handleSubmit(); // Call your custom submit handler
                    handleCloseModal(); // Close the modal after submission
                  }}>
                  OK
                </button>

                  <button className=" btn btn-outline-danger btn-sm mx-1" style={{width:"70px"}} type="button" onClick={handleCloseModal}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
  )
};
