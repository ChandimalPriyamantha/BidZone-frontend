import React from 'react'
import './myAuctions.css'
import { useOktaAuth } from '@okta/okta-react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function MyAuctions() {
    const { authState } = useOktaAuth();                                                //authState to store the authentication state of the user
    const [myAuctions, setMyAuctions] = useState([]);                                    //myAuctions to store the auctions of the user

    var myUserName = authState?.idToken?.claims.preferred_username;                     //myUserName to store the username of the user

    const loadMyAuctions = async () => {
        myUserName = authState?.idToken?.claims.preferred_username;             //myUserName to store the username of the user

        try{
            const myAuctions = await axios.get(`http://localhost:8080/api/MyAuctions/getMyAuctions/${myUserName}`);     //auctions to store the auctions from the database
            await myAuctions.data.map(()=>{                                                                                  //mapping the data to get the required fields
                setMyAuctions(myAuctions.data);                                                                                  //setting the myBids with the data
            });

        }
        catch(e){
            toast.error("Error in loading auctions");            //toast.error to display error message
        }
        

    }

    useEffect(() => {
        loadMyAuctions();
    }, [myUserName]);
  return (
    <div className="container main-box">
        {
            console.log(myAuctions)
        }
        <div className="row">
        <div className="col-sm-6 table-box">
                    {myAuctions.length === 0 ? (
                        <div className="alert alert-warning" role="alert">
                            No Auctions found
                        </div>
                    
                    ):(
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr >
                                <th scope="col"></th>
                                <th scope="col">Item</th>
                                <th scope="col">Category</th>
                                <th scope="col">Price</th>
                                <th scope="col">Closing time</th>
                                
                                </tr>
                            </thead>
                            <tbody className="table-body">
                                {
                                    myAuctions.map((auction,index)=>(
                                        
                                        
                                            <tr key={index} >
                                                <th scope="row">{index+1}</th>
                                                <td>{auction[4]}</td>
                                                <td>{auction[6]}</td>
                                                <td>{auction[3]}</td>
                                                <td>{auction[2]}</td>

                                                
                                            </tr>
                                        

                                    ))
                                }
                                
                            </tbody>
                        </table>
                    )}
                    
                </div>



        </div>
        <ToastContainer />
    </div>
  )
}
