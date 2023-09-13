import { Button } from "@radix-ui/themes";
import { useSquads } from "../../hook/useSquads";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export default function Home() {
  const { createMultisig, getMultisig } = useSquads();
  const wallet = useWallet();
  const {connection} = useConnection()

  // useEffect(()=>{
  //   publicKey && getMultisig(connection, publicKey)
  // },[])

  return (
    <div>
      <Button onClick={()=>wallet.publicKey && createMultisig(wallet)}>create</Button>
      <Button onClick={()=>wallet.publicKey && getMultisig(connection,wallet.publicKey)}>get</Button>
      Home
    </div>
  )
}
