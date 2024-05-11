import React from 'react'
import './myAuctions.css'
import { useOktaAuth } from '@okta/okta-react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default function MyAuctions() {
    const { authState } = useOktaAuth();                                                //authState to store the authentication state of the user
    const [myAuctions, setMyAuctions] = useState([]);                                    //myAuctions to store the auctions of the user
    const [selectedAuction, setSelectedAuction] = useState([]);                          //selectedAuction to store the selected auction

    const auction = {                                                                   //auction to store the auction details
        id:selectedAuction[0],

        closingTime:selectedAuction[1],

        createdTime:selectedAuction[2],

        startingPrice:selectedAuction[3],

        name:selectedAuction[4],

        description:selectedAuction[5],

        category:selectedAuction[6],

        img:selectedAuction[7],

        userName:selectedAuction[8],

        hestBid:selectedAuction[9]


    }

    var myUserName = authState?.idToken?.claims.preferred_username;                     //myUserName to store the username of the user

    const loadMyAuctions = async () => {
        myUserName = authState?.idToken?.claims.preferred_username;             //myUserName to store the username of the user

        try{
            const myAuctions = await axios.get(`http://localhost:8080/api/MyAuctions/getMyAuctions/${myUserName}`);     //API to get auctions related to myUserName 
            await myAuctions.data.map(()=>{                                                                                  //mapping the data to get the required fields
                setMyAuctions(myAuctions.data);                                                                                  //setting the auctions to myAuctions
            });

        }
        catch(e){
            toast.error("Error in loading auctions");            //toast.error to display error message
        }
        

    }



    const loadSelectedAuction = async (index) => {                                        //loadSelectedAuction to load the selected auction
        setSelectedAuction(myAuctions[index]);                                            //setting the selected auction to the selectedAuction   
    }


    const updateAuction = async () => {                                                  //updateAuction to update the auction
        
        try{

            const update= await axios.put(`http://localhost:8080/api/MyAuctions/updateAuction`,auction);        //API to update the auction
                toast.success("Auction updated successfully",{autoClose:2000});                                 //toast.success to display success message
                                      
        }
        catch(e){
            toast.error("Error updating Auction");                                                              //toast.error to display error message
        }

        
          

        
    }


    const deleteAuction = async () => {                                                  //function to delete the auction
        try{
            const relatedBids= await axios.get(`http://localhost:8080/api/MyBids/getBidOnItem/${selectedAuction[0]}`);     //API to get the bids related to the auction
            console.log(relatedBids.data)
            if (relatedBids.data.length>0){                                                                     //checking if there are any bids related to the auction
                toast.error("Cannot delete auction because there are bids for this auction",{autoClose:2000});                  //toast.error to display error message
            }
            else{                                                                                                       //if there are no bids related to the auction
                 try{
                    await axios.delete(`http://localhost:8080/api/MyAuctions/deleteAuction`,{data:auction});                            //API to delete the bid
                    toast.success("Auction deleted successfully",{autoClose:2000});                                     //toast.success to display success message
                    setSelectedAuction([]);
                }
                catch(e){
                     toast.error("Error deleting Auction");
                }
                
            }
        }
        catch(e){
            toast.error("Error in loading related bids");
        }

        const timeout = setTimeout(() => {                                                                          //timeout to reload the auctions
            setMyAuctions([]);
            loadMyAuctions();
          }, 2000);

        
        
    }



    useEffect(() => {                                                                   //useEffect to load the auctions
        loadMyAuctions();                                                               //loading the auctions
    }, [myUserName,selectedAuction]);




  return (
    <div className="container main-box">
        <div className="row">
            <div className="col-sm-6 table-box">
                {myAuctions.length === 0 ? (
                    <div className="alert " role="alert">
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
                                    
                                    
                                        <tr key={index} onClick={()=>{loadSelectedAuction(index)}}>
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



            <div className="col-sm-6 selected-auction-box">
                <div className="formBg">
                    
                    {
                        selectedAuction.length === 0 ? (
                            <div className="alert  " role="alert">
                                No Auctions selected
                            </div>
                        ):(
                            <form onSubmit={updateAuction}>
                            <table className='dataTable'>
                                <tbody>
                                    <tr>
                                        <td><label className="labelkey">Item: </label></td>
                                        <td> <label className='labelValue'>{selectedAuction[4]}</label> </td>
                                        {
                                            selectedAuction[7]=="" || selectedAuction[7]==null? (
                                                <th rowSpan={3}><center><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png" alt="auction image" className="img-thumbnail image"/></center></th>
                                            ):(
                                                <th rowSpan={3}><center><img src={selectedAuction[7]} alt="auction image" className="img-thumbnail image"/></center></th>
                                            )
                                        }
                                        

                                    </tr>
                                    <tr>
                                        <td><label className="labelkey">Category: </label></td>
                                        <td> <label className='labelValue'>{selectedAuction[6]}</label> </td>
                                        
                                    </tr>
                                    <tr>
                                        <td><label className="labelkey">Created at: </label></td>
                                        <td> <label className='labelValue'>{selectedAuction[2]}</label> </td>
                                    </tr>
                                    <tr>
                                        <td><label className="labelkey">Starting price: </label></td>
                                        <td colSpan={2}> <label className='labelValue'>{selectedAuction[3]}</label> </td>
                                    </tr>
                                    <tr>
                                        <td><label className="labelkey">End at: </label></td>
                                        <td colSpan={2}> 
                                        
                                        <input type="date" 
                                        value={selectedAuction[1]}
                                        required
                                        className="labelValue textfield"
                                        onChange={(e)=>{
                                            e.preventDefault()
                                            setSelectedAuction([selectedAuction[0],e.target.value,selectedAuction[2],selectedAuction[3],selectedAuction[4],selectedAuction[5],selectedAuction[6],selectedAuction[7],selectedAuction[8],selectedAuction[9] ])    
                                        }}
                                        ></input>

                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label className="labelkey">Description: </label></td>
                                        <td colSpan={2}> 
                                            <textarea required rows={4} className='labelValue textfield' value={selectedAuction[5]} 
                                                onChange={(e)=>{
                                                    e.preventDefault()
                                                    setSelectedAuction([selectedAuction[0],selectedAuction[1],selectedAuction[2],selectedAuction[3],selectedAuction[4],e.target.value,selectedAuction[6],selectedAuction[7],selectedAuction[8],selectedAuction[9]])
                                                
                                                }}
                                            >
                                            </textarea>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td colSpan={3}>
                                            &nbsp;&nbsp;&nbsp;&nbsp;<button type="submit" className="btn btn-success btn-sm" >Update</button> &nbsp;&nbsp;
                                            <button type="button" className="btn btn-danger btn-sm" onClick={deleteAuction} >Delete</button> 
                                    
                                        </td>
                                    </tr>
                                    
                                    
                                </tbody>
                            </table>
                            </form>
                        )
                    }
                    
                </div>
                
            </div>



        </div>
        <ToastContainer />
    </div>
  )
}
