import { setMaxListeners } from "events";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { selectedIssueState } from "../atoms/selectedIssue";
import { selectedRepoState } from "../atoms/selectedRepo";
import { Header } from "../components/Header";
import { PrItem } from "../components/PrItem";
import { api } from "../utils/api";

interface Solver {
  id: string;
  createdAt: string;
  updatedAt: string;
  publicAdress: string;
  githubUsername: string;
}

interface IPR {
  solver: Solver;
  prNumber: string;
}

const PullRequest: React.FC = () => {

  const selectedIssue = useRecoilValue(selectedIssueState);
  const selectedRepo = useRecoilValue(selectedRepoState);
  const { data: sessionData } = useSession();
  const [pr, setPr] = useState<IPR[]>([]);

  const getPR = api.github.getPr.useMutation({
    onSuccess: data => {
      if (!data) return;
      //@ts-ignore
      setPr(data.body);
      console.log(data);
    }
  })

  useEffect(() => {

    if (!sessionData || !sessionData.user) return;

    getPR.mutateAsync({
      repo: selectedRepo,
      issue: selectedIssue.number.toString()
    })

  }, [sessionData])

  return (
    <div className="bg-[#0D1117] h-[100vh] m-0 p-0 text-white" >
      <Header />
      <p className="text-white text-xl m-4" > {selectedRepo} </p>

      {
        pr.map((p, index) => (
          <div key={index} >
            <PrItem
              username={p.solver.githubUsername}
              publicAdress={p.solver.publicAdress}
              url={`https://github.com/${sessionData?.user.name}/${selectedRepo}/pull/${p.prNumber}`}
            />
          </div>
        ))
      }

    </div>)
}

export default PullRequest;
