import Featured from "@/components/Featured";
import Nav from "@/components/navbar";
import Offer from "@/components/offer";
import Slider from "@/components/Slider";
import Image from "next/image";

export default function Home() {
  return (
   <div className="">
   <Slider />
   <Featured />
   <Offer />
   </div>
  );
}
