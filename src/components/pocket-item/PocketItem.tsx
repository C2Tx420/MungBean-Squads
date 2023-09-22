import { Dialog } from '@radix-ui/themes'
import './style.scss'
import { truncateWallet } from '../../lib/utils'

interface Props {
  data?: any
}

export default function PocketItem({ data }: Props) {
  console.log(data)
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="pocket-item">
          <div className="pocket-item__img">
            <img src={data.img} alt="" />
          </div>
          <div className="pocket-item__content">
            <p className='pocket-item__content-name'>{data.name}</p>
            <p className='pocket-item__content-addr'>{truncateWallet('Pocket Address')}</p>
            <p className='pocket-item__content-balance'>0/100 SOL</p>
          </div>
        </div>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Pocket address</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your profile.
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Root>
  )
}
