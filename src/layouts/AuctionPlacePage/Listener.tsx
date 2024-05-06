import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import AddAuctionRequest from "../../models/AddAuctionRequest";

export const Listener = () => {
  const { authState } = useOktaAuth();

  // add new auction
  const [closingTime, setClosingTime] = useState("");
  const [createdTime, setCreatedTime] = useState("");
  const [startingPrice, setStartingPrice] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Select a category");
  const [image, setImage] = useState<any>(null);
  //const [userName, setUserName] = useState<string>('');
  const userName: string = 'chandimal';
  // Display
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  function categoryField(value: string) {
    setCategory(value);
  }

  async function base64ConversionForImages(e:any){
    if(e.target.files[0]){
        getBase64(e.target.files[0]);
        setCreatedTime("2024-05-04");
        //setUserName("chandiaml");
    }
  }
    function getBase64(file: any){
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setImage(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error', error);
        }
    }

    async function submitNewAuction(){
        const date = new Date().toString();
        
       
        console.log(createdTime);
        const url = `http://localhost:8080/api/auction/addAuction`;
        if(authState?.isAuthenticated && closingTime !== '' 
        && createdTime !== '' && startingPrice >=0 && 
        name !== '' && description !== '' 
        && category !== 'Select a category' && userName !== ''){

       
        const auction: AddAuctionRequest = new AddAuctionRequest(closingTime,createdTime,
            startingPrice,name,description,category,userName);
            auction.img = image;
         const requestOptions = {
            method : "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body:JSON.stringify(auction)
         };

         const submitNewAuctionResponse = await fetch(url, requestOptions);
         if(!submitNewAuctionResponse.ok){
            throw new Error("Somthing went wrong!");
         }

         setClosingTime("");
         setCreatedTime("");
         setStartingPrice(0);
         setName("");
         setDescription("");
         setCategory("Select a category");
         setImage(null);
         //setUserName("");
         setDisplaySuccess(true);

        }else{
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }
  

  return (
    <div className="container mt-5 mb-5">
      {displaySuccess && (
        <div className="alert alert-success" role="alert">
          Auction added successfully
        </div>
      )}
      {displayWarning && (
        <div className="alert alert-danger" role="alert">
          All field must be filled out
        </div>
      )}
      <div className="card">
        <div className="card-header">Add a new auction</div>
        <div className="card-body">
          <form method="POST">
            <div className="row">
              <div className="col-md-3 mb-3">
                <label className="form-label">Product Name: </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Starting Price: </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  required
                  onChange={(e) => setStartingPrice(parseFloat(e.target.value))}
                  value={startingPrice}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Category: </label>
                <button
                  className="form-control btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {category}
                </button>
                <ul
                  id="addNewAuctionId"
                  className="dropdown-menu"
                  aria-labelledby="dropdowMenuButton1"
                >
                  <li>
                    <a
                      onClick={() => categoryField("Electronic")}
                      className="dropdown-item"
                    >
                      Electronic
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => categoryField("Fashion & Beauty")}
                      className="dropdown-item"
                    >
                      Fashion & Beauty
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => categoryField("Agriculture")}
                      className="dropdown-item"
                    >
                      Agriculture
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => categoryField("Home & Garden")}
                      className="dropdown-item"
                    >
                      Home & Garden
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">ClosingTime: </label>
                <input
                  type="date"
                  className="form-control"
                  name="title"
                  required
                  onChange={(e) => setClosingTime(e.target.value)}
                  value={closingTime}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mb-3">
                <label className="form-label">Description: </label>
                <textarea
                  
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={3}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Add Image: </label>
              <input type="file" onChange={e => base64ConversionForImages(e)} />
            </div>
            <div>
              <button type="button" className="btn btn-primary mt-3" onClick={submitNewAuction}>
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
