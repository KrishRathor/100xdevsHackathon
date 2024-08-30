import { useWallet } from "@solana/wallet-adapter-react";
import { api } from "../utils/api";

const Demo: React.FC = () => {

  const d = api.github.addBounty.useMutation({
    onSuccess: data => console.log(data)
  })

  const e = api.github.getReposList.useMutation({
    onSuccess: data => console.log(data)
  })

  const f = api.github.listIssuesInRepo.useMutation({
    onSuccess: data => console.log(data)
  })

  const handlesubmit = async () => {
    d.mutateAsync({
      repo: 'Zeplit',
      ownerId: 'cm0dzrf3f00081421d2v3ss0g',
      issue: 1,
      amount: 20
    })
  }

  const handlesubmit2 = async () => {
    e.mutateAsync({
      owner: 'cm0dzrf3f00081421d2v3ss0g'
    })
  }

  const handlesubmit3 = async () => {
    f.mutateAsync({
      owner: 'cm0dzrf3f00081421d2v3ss0g',
      repo: 'Zeplit'
    })
  }

  return (
    <div>
      hi there
      <button onClick={handlesubmit3} >submit</button>
    </div>
  )
}

export default Demo;
