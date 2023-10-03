import { useEffect, useState } from "react";
import AddVault from "../../components/add-vault";
import ContentBox from "../../components/content-box";
import PocketItem from "../../components/pocket-item";
import './styles.scss';
import { useSquads } from "../../hook/useSquads";
import { useLocalStorage } from "../../hook/useLocalStorage";
import walletAdapter from "../../components/wallet-adapter";
import { useWallet } from "@solana/wallet-adapter-react";


export default function Pockets() {
  const { getMultisig } = useSquads();
  const [vaultList, setVaultList] = useState<any>([]);
  const [multisigData, setMultisigData] = useState<any>();
  const { get } = useLocalStorage();
  const { publicKey } = useWallet();
  useEffect(() => {
    (async () => {
      await fetchData();
    })()

  }, [])

  const filterData = async (vaultStorage: any) => {
    const vaults: any = [];
    await vaultStorage.map((vault: any) => {
      if (vault.createKey === publicKey?.toString()) {
        vaults.push(vault)
      }
    })
    setVaultList(vaults);
  }

  const fetchData = async () => {
    const multisig: any = await getMultisig()
    const vaultListStorage: any = get('vaults');
    setMultisigData(multisig)
    filterData(JSON.parse(vaultListStorage));
  }
  return (
    <div className="pockets">
      <ContentBox>
        <div className="pockets__heading">
          <h2 className="pocket__heading-Title">Vaults</h2>
          <AddVault fetchData={fetchData} />
        </div>
      </ContentBox>
      <ContentBox>
        <div className="pockets__list">
          {vaultList.map((vault: any, idx: number) => (
            <PocketItem data={vault} key={idx} />
          ))}
        </div>
      </ContentBox>
    </div>
  )
}
