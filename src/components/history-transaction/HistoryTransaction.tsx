import './style.scss'

export default function HistoryTransaction({data}: any) {
    // const data = {
    //     date: 'September 15, 2023',
    //     transactionList: [
    //         {
    //             time: '1:56 PM',
    //             type: 'Deposit',
    //             value: 0.1
    //         },
    //         {
    //             time: '1:56 PM',
    //             type: 'Deposit',
    //             value: 0.1
    //         },
    //         {
    //             time: '1:56 PM',
    //             type: 'Deposit',
    //             value: 0.1
    //         }
    //     ],
    // }
    // console.log(data)
  return (
    <div className="history-transaction">
        <p className='history-transaction__date'>{data.date}</p>
            {data.transactionList.map(((item:any, idx: number)=>(
                <div className="history-transaction__item" key={idx}>
                    <p className="history-transaction__item-type">{item.type}</p>
                    <p className="history-transaction__item-time">{item.time}</p>
                    <p className="history-transaction__item-value">{item.value} SOL</p>
                </div>
            )))}
    </div>
  )
}
