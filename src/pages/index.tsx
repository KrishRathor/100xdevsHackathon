import { type NextPage } from "next";
import { Header } from "../components/Header";
import { HeroSection } from "../components/Hero";

const Home: NextPage = () => {
  return (
    <div className="bg-[#0D1117] h-[100vh] m-0 p-0 text-white" >
      <Header />
      <div className="my-4" >
        <HeroSection />
      </div>
    </div>
  );
};

export default Home;
