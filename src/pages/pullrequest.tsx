import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { selectedIssueState } from "../atoms/selectedIssue";
import { selectedRepoState } from "../atoms/selectedRepo";
import { api } from "../utils/api";

const PullRequest: React.FC = () => {

  const selectedIssue = useRecoilValue(selectedIssueState);
  const selectedRepo = useRecoilValue(selectedRepoState);
  const { data: sessionData } = useSession();

  const getPR = api.github.listPRinIssues.useMutation({
    onSuccess: data => console.log(data)
  })

  useEffect(() => {

    if (!sessionData || !sessionData.user) return;

    getPR.mutateAsync({
      repo: selectedRepo,
      owner: sessionData.user.id
    })

  }, [sessionData])

  useEffect(() => {
    console.log(selectedRepo);
  }, [selectedRepo])

  return (
    <div>
    </div>
  )
}

export default PullRequest;
