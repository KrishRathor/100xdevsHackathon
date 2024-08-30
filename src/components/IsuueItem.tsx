import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedIssueState } from "../atoms/selectedIssue";
import { selectedRepoState } from "../atoms/selectedRepo";
import { api } from "../utils/api";

interface IIssueItem {
  title: string,
  number: number
}

export const IssueItem: React.FC<IIssueItem> = (props) => {

  const { title, number } = props;
  const router = useRouter();
  const { data: sessionData } = useSession();
  const selectedRepo = useRecoilValue(selectedRepoState);
  const setSelectedIssue = useSetRecoilState(selectedIssueState);
  const [isCreated, setIsCreated] = useState(false);
  const addbounty = api.github.addBounty.useMutation({
    onSuccess: data => console.log(data)
  })

  return (
    <div
      className="flex justify-between items-center p-4 mb-4 bg-[#0C0A09] shadow rounded-lg"
    >
      <span className="text-lg font-semibold">{title}</span>
      {
        (
          <button className="px-4 py-2 bg-[#F97316] text-white rounded hover:bg-[#EA580C] transition duration-200 ml-[70vw]"
            onClick={() => {
              setSelectedIssue({
                title: title,
                number: number
              })
              router.push('/pullrequest');
            }}
          >
            View Pull Requests
          </button>
        )
      }
      <button
        className="px-4 py-2 bg-[#F97316] text-white rounded hover:bg-[#EA580C] transition duration-200"
        onClick={() => {

          if (!sessionData?.user) return;

          addbounty.mutateAsync({
            ownerId: sessionData?.user.id,
            repo: selectedRepo,
            issue: number,
            amount: 20
          })
          setIsCreated(true)
        }}
      >
        { isCreated ? 'Bounty Created' : 'Create Bounty'}
      </button>
    </div>
  )
}

