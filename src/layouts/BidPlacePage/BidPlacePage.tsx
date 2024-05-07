import { useEffect, useState } from "react";
import { SpinerLoading } from "../Utils/SpinerLoading";
import { StartReview } from "../Utils/StarsReviews";
import { BidPlaceAndReviewBox } from "./BidPlaceAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { LatestReviews } from "./LatestReviews";
import { useOktaAuth } from "@okta/okta-react";
import AuctionModel from "../../models/AuctionModel";
import ViewAllBids from "./ViewAllBids";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




export const BidPlacePage = () => {

  const { authState } = useOktaAuth();

  const [auction, setAuction] = useState<AuctionModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  // review state
  const [review, setReview] = useState<ReviewModel[]>([])
  const [totalStar, setTotalStar] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);
  // Loans Count State
  const [currentLoansCount, setCurrentLoansCount] = useState(0);


  // In BidPlacePage
const [refreshBids, setRefreshBids] = useState(false);

const setReloadBids = () => {
  setRefreshBids(!refreshBids);
};


  const auctionId = window.location.pathname.split("/")[2];

  console.log(auctionId);

  useEffect(() => {
    const fetchBook = async () => {
      const baseUrl: string = `http://localhost:8080/api/auctions/${auctionId}`;
     
      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseJson = await response.json();
     
      const refreshBid = () => {
        setRefreshBids(!refreshBids);
      };

      const loadedAuction: AuctionModel = {
        id: responseJson.id,
        closingTime: responseJson.closingTime,
        createdTime: responseJson.createdTime,
        startingPrice: responseJson.startingPrice,
        name: responseJson.name,
        description: responseJson.description,
        category: responseJson.category,
        img: responseJson.img,
        userName: responseJson.userName,
      };

      setAuction(loadedAuction);
      setIsLoading(false);
    };
    fetchBook().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  useEffect(() => {
    const fetchBookReviews = async () =>{
      const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${auctionId}`;
      const responseReviews = await fetch(reviewUrl);

      if(!responseReviews.ok){
        throw new Error("Somthing wrong..!");
      }

      const responseJsonReviews =  await responseReviews.json();
      const responseData = responseJsonReviews._embedded.reviews;

      const loadedReviews: ReviewModel[] = [];

      let weightedStarReviews: number = 0;

      for(const key in responseData){
        loadedReviews.push({
          id: responseData[key].id,
          userEmail: responseData[key].userEmail,
          date: responseData[key].date,
          rating: responseData[key].rating,
          book_id: responseData[key].booId,
          reviewDescription: responseData[key].reviewDescription,

        });

        weightedStarReviews = weightedStarReviews + responseData[key].rating;
      }

      if (loadedReviews) {
        const round  = (Math.round(weightedStarReviews/loadedReviews.length) * 2/2).toFixed(1);
        setTotalStar(Number(round));
      }

      setReview(loadedReviews);
      setIsLoadingReview(false);
    };

    fetchBookReviews().catch((error: any)=>{
      setIsLoadingReview(false);
      setHttpError(error.message);

    })
  },[])

  

  if (isLoading || isLoadingReview) {
    return <SpinerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }
  return (
    <div>
              <ToastContainer/>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            {auction?.img ? (
              <img src={auction?.img} width="226" height="349" alt="Book"></img>
            ) : (
              <img
                src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
                width="226"
                height="349"
                alt="Book"
              ></img>
            )}
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{auction?.name}</h2>
              <h5 className="text-primary">{auction?.userName}</h5>
              <p className="lead">{auction?.description}</p>
                {/* <StartReview rating={totalStar} size={32}/> */}
            </div>
          </div>
          
          {/* <BidPlaceAndReviewBox auction={auction} mobile={false} onBidPlaced={setReloadBids} />
           */}
           <BidPlaceAndReviewBox auction={auction} mobile={false} onBidPlaced={setReloadBids} refreshBids={refreshBids} />

        </div>
      
          

          
            {/* <div>
              <ViewAllBids value={auctionId} refreshBid={refreshBids} />
            </div> */}

        <hr/>
        {/* <LatestReviews reviews={review} bookId={auction?.id} mobile={true}/> */}
      </div>
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-center">
          {auction?.img ? (
            <img src={auction?.img} width="226" height="349" alt="Book"></img>
          ) : (
            <img
              src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
              width="226"
              height="349"
              alt="Book"
            ></img>
          )}
        </div>
        <div className='mt-4'>
            <div className='ml-2'>
               <h2>{auction?.name}</h2>
               <h5 className='text-primary'>{auction?.userName}</h5>
               <p className='lead'>{auction?.description}</p>
               <StartReview rating={totalStar} size={32}/>
            </div>
        </div>
        {/* <BidPlaceAndReviewBox auction={auction} mobile={false} onBidPlaced={setReloadBids} />
         */}
         <BidPlaceAndReviewBox auction={auction} mobile={false} onBidPlaced={setReloadBids} refreshBids={refreshBids} />


        <hr/>
        {/* <LatestReviews reviews={review} bookId={auction?.id} mobile={true}/> */}
      </div>
    </div>
  );
};
