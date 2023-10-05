import { DotsHorizontalIcon, DotsVerticalIcon, MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons'
import { truncateWallet } from '../../lib/utils'
import './style.scss'

export default function TransactionItem({data}: any) {
  console.log(data)
  return (
    <div className="transaction">
        <p className='transaction__date'>{data.date}</p>
            {data.transactionList.map(((item:any, idx: number)=>(
                <div className="transaction__item" key={idx}>
                    <p className="transaction__item-time">{item.time}</p>
                    <p className="transaction__item-from">{item.from}</p>
                    <p className="transaction__item-value">{item.value} SOL</p>
                    <p className="transaction__item-sign">1/2</p>
                    <p className="transaction__item-address">{truncateWallet(item.to)}</p>
                    <p className="transaction__item-status">{item.status}</p>
                    <DotsHorizontalIcon className="transaction__item-view"/>
                </div>
            )))}
    </div>
  )
}
