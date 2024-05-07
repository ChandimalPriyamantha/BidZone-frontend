import React from "react";
import "./myBids.css";
import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyBids() {
  //MyBids component to display the bids placed by the user
  const { authState } = useOktaAuth(); //authState to get the user details
  const [myBids, setMyBids] = useState([]); //myBids to store the bids placed by the user
  const history = useHistory(); //history to navigate to different pages

  const [selectedBid, setSelectedBid] = useState([]); //selectedBid to store the bid selected by the user

  const bid = {
    //bid object to store the selected bid details
    id: selectedBid[2],
    amount: selectedBid[3],
    comment: selectedBid[4],
    placed_at: selectedBid[5],
    auction_id: selectedBid[6],
    user_name: selectedBid[7],
  };

  var myUserName = authState?.idToken?.claims.preferred_username; //myUserName to store the username of the user

  const authentication = async () => {
    //authentication function to check if the user is authenticated

    if (!authState?.isAuthenticated) {
      history.push("/login"); //if the user is not authenticated, redirect to login page
    } else {
      myUserName = authState?.idToken?.claims.preferred_username;
    }
  };

  const loadMyBids = async () => {
    //loadMyBids function to get the bids placed by the user
    //await authentication();
    myUserName = authState?.idToken?.claims.preferred_username; //myUserName to store the username of the user

    const myBidList = await axios.get(
      `http://localhost:8080/api/MyBids/getMyBids/${myUserName}`
    ); //API to get the bids placed by the user

    await myBidList.data.map(() => {
      //mapping the data to get the required fields
      setMyBids(myBidList.data); //setting the myBids with the data
    });
  };

  const loadSelectedBid = async (index) => {
    //loadSelectedBid function to get the selected bid details
    setSelectedBid(myBids[index]); //setting the selectedBid with the bid details
  };

  const updateBid = async () => {
    //updateBid function to update the bid details

    try {
      const update = await axios.put(
        `http://localhost:8080/api/MyBids/updateBid`,
        bid
      ); //API to update the bid details
      toast.success("Bid updated successfully", { autoClose: 2000 }); //toast message to show the success message
    } catch (e) {
      toast.error("Error updating bid");
    }

    loadMyBids(); //loadMyBids function to get the updated bids
  };

  const deleteBid = async () => {
    //deleteBid function to delete the bid

    try {
      await axios.delete(`http://localhost:8080/api/MyBids/deleteBid`, {
        data: bid,
      }); //API to delete the bid
      toast.success("Bid deleted successfully", { autoClose: 2000 }); //toast message to show the success message
      setSelectedBid([]); //setting the selectedBid to empty
    } catch (e) {
      toast.error("Error deleting bid"); //toast message to show the error message
    }

    loadMyBids(); //loadMyBids function to get the updated bids
  };

  useEffect(() => {
    //useEffect to load the bids placed by the user

    setMyBids([]); //setting the myBids to empty
    loadMyBids(); //loadMyBids function to get the bids placed by the user
  }, [myUserName]); //dependency array to re-run the useEffect when myUserName changes

  return (
    <div className="container main-box">
      <div className="row">
        <div className="col-sm-6 table-box">
          {myBids.length === 0 ? (
            <div className="alert alert-warning" role="alert">
              No Bids found
            </div>
          ) : (
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Auctioneer</th>
                  <th scope="col">Auction</th>
                  <th scope="col">Bade at</th>
                  <th scope="col">Bade amount</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {myBids.map((bid, index) => (
                  <tr
                    key={index}
                    onClick={() => {
                      loadSelectedBid(index);
                    }}
                  >
                    <th scope="row">{index + 1}</th>
                    <td>{bid[0]}</td>
                    <td>{bid[1]}</td>
                    <td>{bid[5]}</td>
                    <td>{bid[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="col-sm-6 selected-bid-box">
          <div className="formBg">
            {selectedBid.length === 0 ? (
              <div className="alert  alert" role="alert">
                No Bids selected
              </div>
            ) : (
              <table className="dataTable">
                <tbody>
                  <tr>
                    <td>
                      <label className="labelkey">Auctioneer: </label>
                    </td>
                    <td>
                      {" "}
                      <label className="labelValue">
                        {selectedBid[0]}
                      </label>{" "}
                    </td>
                    {selectedBid[8] == "" || selectedBid[8] == null ? (
                      <th rowSpan={3}>
                        <center>
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"
                            alt="auction image"
                            className="img-thumbnail image"
                          />
                        </center>
                      </th>
                    ) : (
                      <th rowSpan={3}>
                        <center>
                          <img
                            src={selectedBid[8]} 
                            alt="auction image"
                            className="img-thumbnail image"
                          />
                          {console.log(selectedBid[8])}
                        </center>
                      </th>
                    )}
                  </tr>
                  <tr>
                    <td>
                      <label className="labelkey">Auction: </label>
                    </td>
                    <td>
                      {" "}
                      <label className="labelValue">
                        {selectedBid[1]}
                      </label>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="labelkey">Bade at: </label>
                    </td>
                    <td>
                      {" "}
                      <label className="labelValue">
                        {selectedBid[5]}
                      </label>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="labelkey">Bade amount: </label>
                    </td>
                    <td colSpan={2}>
                      <label className="labelValue">{selectedBid[3]}</label>
                      {/* <input type="number" className='labelValue textfield' value={selectedBid[3]} 
                                        onChange={(e)=>{
                                            e.preventDefault()
                                            setSelectedBid([selectedBid[0],selectedBid[1],selectedBid[2],e.target.value,selectedBid[4],selectedBid[5],selectedBid[6],selectedBid[7]])

                                        }}></input>  */}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="labelkey">Comment: </label>
                    </td>
                    <td colSpan={2}>
                      <textarea
                        rows={4}
                        className="labelValue textfield"
                        value={selectedBid[4]}
                        onChange={(e) => {
                          e.preventDefault();
                          setSelectedBid([
                            selectedBid[0],
                            selectedBid[1],
                            selectedBid[2],
                            selectedBid[3],
                            e.target.value,
                            selectedBid[5],
                            selectedBid[6],
                            selectedBid[7],
                          ]);
                        }}
                      ></textarea>
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={3}>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <button
                        className="btn btn-success btn-sm"
                        onClick={updateBid}
                      >
                        Update
                      </button>{" "}
                      &nbsp;&nbsp;
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={deleteBid}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}
