import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets"
import { ReactNode, useMemo } from "react"
import "@solana/wallet-adapter-react-ui/styles.css"

interface WalletAdapterProps {
  children: ReactNode
}

export default function WalletAdapter(props: WalletAdapterProps) {
  const endpoint = useMemo(() => import.meta.env.RPC || "https://api.devnet.solana.com", [])

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new BackpackWalletAdapter()],
    []
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{props.children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}