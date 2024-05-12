import { Carousel } from "./HomPage/components/Carousel";
import { ExploreTopAuctions } from "./HomPage/components/ExploreTopAuctions";
import { Heros } from "./HomPage/components/Heros";
import { AuctionsServices} from "./HomPage/components/AuctionsServices";

export const HomePage = () => {
  return (
    <>
      <ExploreTopAuctions />
      <Carousel />
      {/* <Heros /> */}
      <AuctionsServices />
    </>
  );
};
