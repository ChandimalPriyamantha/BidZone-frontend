import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ViewAllBids(props) {
    const [bids, setBids] = useState([]);
    let auction_id = props.value; 
    

    useEffect(() => {
        fetchBids();
    }, [props.refreshBids]);

    const fetchBids = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/Bid/getBidOnItem/${auction_id}`);
            setBids(response.data.content);
            console.log(auction_id);
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <div className=' container shadow '>
        <div className='h3 m-3'>
            All Bids
        </div>
        <div>
            <table className=' table'>
                <thead>
                    <tr>
                        
                        <th>Placed By</th>
                        <th>Placed At</th>
                        <th>Comment</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bids.map((bid) => (
                            <tr key={bid.id}>
                                <td className=' text-primary'>{bid.user_name}</td>
                                <td>{bid.placed_at}</td>
                                <td>{bid.comment}</td>
                                <td className=' text-success'>{bid.amount}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        
    </div>
  )
}
