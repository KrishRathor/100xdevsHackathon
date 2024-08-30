import { useWallet } from "@solana/wallet-adapter-react";
import { publicDecrypt } from "crypto";
import { create } from "domain";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { set } from "zod";
import { api } from "../utils/api";

export const SolanaWalletProvider: React.FC = () => {

  const { publicKey } = useWallet();

  const [githubUsername, setGithubUsername] = useState<string>('');
  const createUser = api.github.registerUser.useMutation({
    onSuccess: data => { console.log(data) }
  })

  useEffect(() => {
    console.log(publicKey?.toBase58());
  }, [publicKey])

  const register = () => {

    if (!publicKey) {
      toast('Connect your wallet first');
      return;
    }

    if (githubUsername === '') {
      toast('Enter your github username');
      return;
    }

    console.log(publicKey.toBase58(), githubUsername);

    createUser.mutateAsync({
      username: githubUsername,
      address: publicKey.toBase58()
    })

    setGithubUsername('');

    toast('registered successfully');

  }

  return (
    <div className="flex items-center flex-col" >
      <div className="max-w-md mx-auto p-4  text-black rounded-lg shadow-md">
        <label htmlFor="input" className="block text-white text-sm font-semibold mb-2">
          Enter your github username
        </label>
        <input
          type="text"
          id="input"
          value={githubUsername}
          onChange={e => setGithubUsername(e.target.value)}
          placeholder="Enter your github username"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-300"
        />
      </div>
      <button className="px-4 py-2 bg-[#F97316] text-white rounded hover:bg-[#EA580C] my-8 transition duration-200 "
        onClick={register}
      >
        Register
      </button>
    </div>
  )
}
