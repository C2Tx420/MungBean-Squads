import { useEffect, useState } from "react";
import ContentBox from "../../components/content-box";
import './styles.scss';
import { useSquads } from "../../hook/useSquads";
import { useWallet } from "@solana/wallet-adapter-react";
import { historyTransactionConvert, timeout, truncateWallet } from "../../lib/utils";
import { CopyIcon } from "@radix-ui/react-icons";
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import HistoryTransaction from "../../components/history-transaction";
import { Button } from "@radix-ui/themes";
import TransferTools from "../../components/transfer-tools";
import { useShyft } from "../../hook/useShyft";

export default function Dashboard() {
  const { getMainVault } = useSquads();
  const { getBalance, getHistoryTransaction } = useShyft();
  const { publicKey } = useWallet();
  const [vaultAddress, setVaultAddress] = useState('');
  const [vaultValue, setVaultValue] = useState(0);
  const [historyData, setHistoryData] = useState([])

  useEffect(() => {
    (async () => {
      if (publicKey) {
        const address = await getMainVault(publicKey);
        setVaultAddress(address)
      }

    })()
  }, [publicKey])

  useEffect(() => {
    (async () => {
      if (vaultAddress) {
        const balance = await getBalance(vaultAddress);
        setVaultValue(balance);

        await timeout(1000);

        const history = await getHistoryTransaction(vaultAddress);

        historyTransactionConvert(history, vaultAddress);

        setHistoryData(await historyTransactionConvert(history, vaultAddress));
      }
    })()
  }, [vaultAddress])

  const data = [
    {
      uv: 2,
    },
    {
      uv: 4,
    },
    {
      uv: 1,
    },
    {
      uv: 0,
    },
    {
      uv: 7,
    },
    {
      uv: 1,
    },
    {
      uv: 5,
    },
  ];
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
              <TransferTools type="deposit" />
              <TransferTools type="withdraw" />
            </div>
          </div>

        </div>
        <div className="dashboard__content">
          <div className="dashboard__content-left">
            <div className="dashboard__content-left-recent">
              <h4>Recent transactions</h4>
              {historyData && historyData.map((data: any,idx: any)=>(
                <HistoryTransaction key={idx} data={data}/>
              ))}
            </div>
          </div>
          <div className="dashboard__content-right">
            <ResponsiveContainer width='100%' height='40%'>
              <AreaChart
                data={data}
                margin={{ top: 20 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <YAxis domain={["auto", "auto"]} orientation="left" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="dashboard__chart-tooltip">
                          <span>{payload[0].value} SOL</span>
                        </div>
                      )
                    }

                    return null
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#F97316"
                  fillOpacity={1}
                  strokeWidth={3}
                  fill="url(#colorUv)"
                  animateNewValues
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>




      </ContentBox>
    </div>
  )
}
