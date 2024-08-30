import { Header } from "../components/Header";
import { Repos } from "../components/Repos";

const Dashboard: React.FC = () => {

  return (
    <div className="bg-[#0D1117] h-[100vh] m-0 p-0 text-white" >
      <Header />
      <br />
      <p className="text-white text-xl" >Your Repos</p>
      <div className="overflow-y-auto h-[70vh]" >
        <Repos />
      </div>
    </div>
  )
}

export default Dashboard;
