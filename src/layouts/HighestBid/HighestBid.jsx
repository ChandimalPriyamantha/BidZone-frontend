import React from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './highestBid.css';
import { Link } from 'react-router-dom';

export default function HighestBid() {
    const selectedAuction= useParams();
    const [highestBid, setHighestBid] = useState({});

    const loadHighestBidData= async ()=>{
        try{
            const highestBid= await axios.get(`http://localhost:8080/api/MyBids/highestBid/${selectedAuction.auction_id}`);
            
            if(highestBid.data.length>0){
                setHighestBid(highestBid.data[0]);
            }
            else{
                setHighestBid([]);
            }

        }
        catch(error){
            toast.error(error.message);
        }
    }


    useEffect(() => {
        loadHighestBidData();
    }, []);



  return (
    <div>
        
        <div className="container main-box">
            <div className="row">
                <div className="heighest-bid-box">
                <div className="formBg">
                        {Object.keys(highestBid).length===0 ? (
                            <div className='alert'>Still do not have any bid for this auction</div>
                        ):
                        (
                            <table className='dataTable'>
                                <tbody>
                                    <tr>
                                        <td><label className="labelkey">Auction: </label></td>
                                        <td><label className='labelValue'>{selectedAuction.auction_name}</label></td>
                                    </tr>
                                    
                                    <tr>
                                        <td><label className="labelkey">Bidder: </label></td>
                                        <td><label className='labelValue'>{highestBid["user_name"]}</label></td>
                                    </tr>

                                    <tr>
                                        <td><label className="labelkey">Amount: </label></td>
                                        <td><label className='labelValue'>$ {highestBid["amount"]}</label></td>
                                    </tr>

                                    <tr>
                                        <td><label className="labelkey">Placed at: </label></td>
                                        <td><label className='labelValue'>{highestBid["placed_at"]}</label></td>
                                    </tr>

                                    <tr>
                                        <td><label className="labelkey">Description: </label></td>
                                        <td><label className='labelValue'>{highestBid["comment"]}</label></td>
                                    </tr>

                                    <tr>
                                        <td colSpan={2} style={{textAlign:"right",paddingRight:"30px"}}>
                                            <Link type='button' className='btn btn-primary btn-sm' style={{marginLeft:"13px"}} to={'/chat'}>Chat with Highest Bidder</Link>
                                        </td>
                                        
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
        
        <ToastContainer />
    </div>
  )
}
