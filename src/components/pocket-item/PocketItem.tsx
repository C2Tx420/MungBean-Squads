import { Dialog } from '@radix-ui/themes'
import './style.scss'
import { truncateWallet } from '../../lib/utils'

interface Props {
  data?: any
}

export default function PocketItem({ data }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="pocket-item">
          <div className="pocket-item__img">
          </div>
          <div className="pocket-item__content">
            <p pocket-item__content-name>Investment</p>
            <p pocket-item__content-addr>{truncateWallet('Pocket Address')}</p>
            <p pocket-item__content-balance>0/100 SOL</p>
          </div>
        </div>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your profile.
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Root>
  )
}
