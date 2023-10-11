import { useEffect } from "react";
import ContentBox from "../../components/content-box";
import { useSquads } from "../../hook/useSquads";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import TransactionItem from "../../components/transaction-item";
import './style.scss';

export default function Transaction() {
  const { getProposalInfo, getTransactionInfo, getMainVault } = useSquads();
  const { publicKey } = useWallet()

  useEffect(() => {
    (async () => {
      if (publicKey) {
        const data = await getTransactionInfo(publicKey, 1);
        console.log(data)
      }
    })()
  }, [])

  const mockTransactions = [
    {
      "date": "2023-10-04",
      "transactionList": [
        {
          "time": "00:20 PM",
          "status": "Pending",
          "from": 'Salary',
          "value": 0.2,
          "to": 'FMGXLmBHASXJYw4DB1Ds2CqKtUH39F8hgMxK8Jrayvun'
        }
      ]
    },
    {
      "date": "2023-09-22",
      "transactionList": [
        {
          "time": "01:40 PM",
          "status": "Pending",
          "from": 'Marketing',
          "value": 0.1,
          "to": 'DNFDSXCZASXJYw4DB1Ds2CqKtUH39F8hgMxK8Jrbdxcz'
        },
      ]
    }
  ];
  return (
    <div className="transaction">
      <ContentBox>
        <div className="transaction__heading">
          <h2>Transaction</h2>
        </div>
        <div className="transaction__content">
          {mockTransactions && mockTransactions.map((data: any, idx: any) => (
            <TransactionItem key={idx} data={data} />
          ))}
        </div>
      </ContentBox>
    </div>
  )
}
