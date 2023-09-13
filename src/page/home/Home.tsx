import { Button } from "@radix-ui/themes";
import { useSquads } from "../../hook/useSquads";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import PublicHeader from "../../components/header/public/PublicHeader";

export default function Home() {
  const { createMultisig, getMultisig, getMainVault } = useSquads();
  const wallet = useWallet();
  const { connection } = useConnection()

  // useEffect(()=>{
  //   publicKey && getMultisig(connection, publicKey)
  // },[])

  return (
    <>
      <PublicHeader />
      <div>
        <Button onClick={() => wallet.publicKey && createMultisig(wallet)}>create</Button>
        <Button onClick={() => wallet.publicKey && getMainVault(wallet.publicKey)}>get main vault</Button>
        <Button onClick={() => wallet.publicKey && getMultisig(connection, wallet.publicKey)}>get</Button>
        Home
      </div>
    </>
  )
}
