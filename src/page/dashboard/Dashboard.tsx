import { useEffect, useState } from "react";
import ContentBox from "../../components/content-box";
import './styles.scss';
import { useSquads } from "../../hook/useSquads";
import { useWallet } from "@solana/wallet-adapter-react";
import { truncateWallet } from "../../lib/utils";
import { CopyIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import { useDispatch } from "react-redux";
import { createToast } from "../../store/reducers/toast-reducer";

export default function Dashboard() {
  const {getMainVault} = useSquads();
  const {publicKey} = useWallet();
  const [vaultAddress,setVaultAddress] = useState('');
  const dispatch = useDispatch();

  useEffect(()=>{
    (async ()=>{
      if(publicKey) {
        const address = await getMainVault(publicKey);
        setVaultAddress(address)
      }

    })()
  },[publicKey])
  return (
    <div className="dashboard">
      <h3>Dashboard</h3>
      <ContentBox>
        <div className="dashboard__addr">
          <p className="dashboard__addr-label">Address:</p>
          <p className="dashboard__addr-value">{truncateWallet(vaultAddress)}</p>
          <CopyIcon className="dashboard__addr-copy"/>
        </div>
        <Button onClick={()=>dispatch(createToast({title:'aaa',desc:'cccc', type: 'success'}))}>toast</Button>
      </ContentBox>
    </div>
  )
}
