import './style.scss'

export default function HistoryTransaction({data}: any) {

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
