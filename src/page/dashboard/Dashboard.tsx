import { useEffect, useState } from "react";
import ContentBox from "../../components/content-box";
import './styles.scss';
import { useSquads } from "../../hook/useSquads";
import { useWallet } from "@solana/wallet-adapter-react";
import { historyTransactionConvert, timeout, truncateWallet } from "../../lib/utils";
import { CopyIcon } from "@radix-ui/react-icons";
import HistoryTransaction from "../../components/history-transaction";
import TransferTools from "../../components/transfer-tools";
import { useShyft } from "../../hook/useShyft";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { getMainVault } = useSquads();
  const { getBalance, getHistoryTransaction } = useShyft();
  const { publicKey } = useWallet();
  const [vaultAddress, setVaultAddress] = useState('');
  const [vaultValue, setVaultValue] = useState(0);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    (async () => {
      await fetchData();
    })()
  }, [publicKey, vaultAddress])
  const fetchData = async () => {
    if (publicKey) {
      const address = await getMainVault(publicKey);
      setVaultAddress(address);

      if (vaultAddress) {
        const balance = await getBalance(vaultAddress);
        setVaultValue(balance);

        await timeout(1000);

        const history = await getHistoryTransaction(vaultAddress);

        historyTransactionConvert(history, vaultAddress);

        setHistoryData(await historyTransactionConvert(history, vaultAddress));
      }

    }
  }

  return (
    <div className="dashboard">
      <ContentBox>
        <div className="dashboard__heading">
          <h2>Dashboard</h2>
          <div className="dashboard__heading-addr">
            <p className="dashboard__heading-addr-label">Address: </p>
            <p className="dashboard__heading-addr-value">{truncateWallet(vaultAddress)}</p>
            <CopyIcon className="dashboard__heading-addr-copy" />
          </div>
        </div>

        <div className="dashboard__vault">
          <h4>Balance</h4>
          <div className="dashboard__vault-wrapper">
            <div className="dashboard__vault-balance">
              <img src="/sol.png" alt="" />
              <p>{vaultValue} <span>SOL</span></p>
            </div>
            <div className="dashboard__vault-tools">
              {publicKey &&
                <>
                  <TransferTools fetchData={fetchData} vaultAddress={vaultAddress} walletAddress={publicKey.toString()} type="deposit" />
                  <TransferTools fetchData={fetchData} type="withdraw" vaultAddress={vaultAddress} walletAddress={publicKey.toString()} />
                </>
              }
            </div>
          </div>

        </div>
      </ContentBox>
      <ContentBox className={'dashboard__recent-wrapper'}>
        <div className="dashboard__recent">
          <div className="dashboard__recent-heading">
            <h4>Recent transactions</h4>
            <Link to="/history-transaction">View all</Link>
          </div>
          {historyData && historyData.map((data: any, idx: any) => (
            <HistoryTransaction key={idx} data={data} />
          ))}
        </div>
      </ContentBox>
    </div>
  )
}
