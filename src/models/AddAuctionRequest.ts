class AddAuctionRequest {
  closingTime: string;
  createdTime?: string;
  startingPrice?: number;
  name?: string;
  description?: string;
  category?: string;
  img?: string;
  userName?: string;

  constructor(
    closingTime: string,
    createdTime: string,
    startingPrice: number,
    name: string,
    description: string,
    category: string,
    img: string,
    userName?: string
  ) {
    this.closingTime = closingTime;
    this.createdTime = createdTime;
    this.startingPrice = startingPrice;
    this.name = name;
    this.description = description;
    this.category = category;
    this.img = img;
    this.userName = userName;
  }
}

export default AddAuctionRequest;
