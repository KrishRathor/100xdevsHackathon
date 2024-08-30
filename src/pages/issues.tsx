import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { selectedRepoState } from "../atoms/selectedRepo";
import { Header } from "../components/Header";
import { IssueItem } from "../components/IsuueItem";
import { api } from "../utils/api";

interface IIssue {
  title: string,
  number: number
}

const Issues: React.FC = () => {

  const selectedRepo = useRecoilValue(selectedRepoState);
  const { data: sessionData } = useSession();
  const [issues, setIssues] = useState<IIssue[]>([]);

  const getIssues = api.github.listIssuesInRepo.useMutation({
    onSuccess: data => {
      if (!data || !data.body) return;
      setIssues(data?.body);
    }
  })

  useEffect(() => {

    if (!sessionData?.user) return;

    getIssues.mutateAsync({
      owner: sessionData.user.id,
      repo: selectedRepo
    })
  }, [sessionData])

  return (
    <div className="bg-[#0D1117] h-[100vh] m-0 p-0 text-white" >
      <Header />
      <p className="text-white text-xl m-4" > {selectedRepo} </p>

      {
        issues.map((issue, index) => (
          <div key={index} >
            <IssueItem title={issue.title} number={issue.number} />
          </div>
        ))
      }

    </div>
  )
}

export default Issues;
