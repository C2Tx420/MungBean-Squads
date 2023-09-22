import { useEffect, useState } from "react";
import AddVault from "../../components/add-vault";
import ContentBox from "../../components/content-box";
import PocketItem from "../../components/pocket-item";
import './styles.scss';
import { useSquads } from "../../hook/useSquads";
import { useLocalStorage } from "../../hook/useLocalStorage";


export default function Pockets() {
  const { getMultisig } = useSquads();
  const [vaultList, setVaultList] = useState<any>([]);
  const [multisigData, setMultisigData] = useState<any>();
  const { get } = useLocalStorage();
  useEffect(() => {
    (async () => {
      await fetchData();
    })()

  }, [])

  const filterData = async (multisigData: any, vaultStorage: any) => {
    const vaults: any = [];
    const memberList = multisigData.members
    await memberList.map((member: any) => {
      if (vaultStorage[member.key.toString()]) {
        vaults.push(vaultStorage[member.key.toString()]);
      }
    })
    setVaultList(vaults);
  }

  const fetchData = async () => {
    const multisig: any = await getMultisig()
    const vaultListStorage: any = get('vaults');
    setMultisigData(multisig)
    filterData(multisig,JSON.parse(vaultListStorage));
  }
  return (
    <div className="pockets">
      <div className="pockets__heading">
        <h2 className="pocket__heading-Title">Pockets</h2>
        <AddVault />
      </div>
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
