import { useWallet } from "@solana/wallet-adapter-react"


export default function JpSwap() {
    const { wallet } = useWallet();

        (window as any).Jupiter.init({
          endpoint: import.meta.env.RPC,
          passThroughWallet: wallet,
          defaultExplorer: "Solscan",
          displayMode: 'integrated',
          integratedTargetId: "integrated-terminal",
        })
    return (
        <div id="integrated-terminal">
            {/* {initJupiter()} */}
        </div>
    )
}
