import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import { RepoItem } from "./RepoItem";

export const Repos: React.FC = () => {
  const { data: sessionData } = useSession();

  const [reposList, setReposList] = useState<string[]>([]);

  const getRepos = api.github.getReposList.useMutation({
    onSuccess: data => {
      if (!data || !data.body) return;
      setReposList(data?.body);
    }
  })

  useEffect(() => {

    if (!sessionData?.user) return;

    getRepos.mutateAsync({
      owner: sessionData?.user.id
    })

  }, [sessionData])

  return (
    <div>
      {
        reposList.map((repo, index) => (
          <div key={index} >
            <RepoItem name={repo} />
          </div>
        ))
      }
    </div>
  )
}
