import { useRouter } from "next/router";
import React from "react";
import { useSetRecoilState } from "recoil";
import { selectedRepoState } from "../atoms/selectedRepo";

interface IRepoItem {
  name: string
}

export const RepoItem: React.FC<IRepoItem> = (props) => {

  const { name } = props;
  const router = useRouter();
  const setSelectedRepo = useSetRecoilState(selectedRepoState);

  return (
    <div
      className="flex justify-between items-center p-4 mb-4 bg-[#0C0A09] shadow rounded-lg"
    >
      <span className="text-lg font-semibold">{name}</span>
      <button
        className="px-4 py-2 bg-[#F97316] text-white rounded hover:bg-[#EA580C] transition duration-200"
        onClick={() => {
          setSelectedRepo(name);
          router.push('/issues');
        }}
      >
        View Issues
      </button>
    </div>
  )
}
