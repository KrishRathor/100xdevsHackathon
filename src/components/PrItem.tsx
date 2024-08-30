import React from "react";

interface IPrItem {
  username: string,
  publicAdress: string,
  url: string
}

export const PrItem: React.FC<IPrItem> = (props) => {

  const { username, url } = props;

  return (
    <div
      className="flex justify-between items-center p-4 mb-4 bg-[#0C0A09] shadow rounded-lg"
    >
      <span className="text-lg font-semibold">{username}</span>
      <a
        className="px-4 py-2 bg-[#F97316] text-white rounded hover:bg-[#EA580C] transition duration-200"
        href={url}
      >
        View on github
      </a>
      <button
        className="px-4 py-2 bg-[#F97316] text-white rounded hover:bg-[#EA580C] transition duration-200"
      >
        Approve Bounty
      </button>
    </div>
  )
}
