import { Link } from "react-router-dom";

export const ExploreTopAuctions = () => {
    
    return(
       <div className='p-5 mb-4 bg-dark header'>
         <div className='container-fluid py-5 text-white
              d-flex justify-content-center align-items-center'>
               <div>
                <h1 className='display-5 fw-bold'>Step right into the Universe Auction Cente</h1>
                <p className='col-md-8 fs-4'>What's on the biding  block today?</p>
                <Link type='buton' className='btn main-color btn-lg text-white' to='/search'>
                    Explore top products from the auction univers
                </Link>
               </div>
         </div>
       </div>
    );

}