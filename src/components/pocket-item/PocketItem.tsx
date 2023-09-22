import { Button, Dialog, Flex, Switch, Text } from '@radix-ui/themes'
import './style.scss'
import { truncateWallet } from '../../lib/utils'
import { useState } from 'react'
import { useLocalStorage } from '../../hook/useLocalStorage'
import TransferTools from '../transfer-tools'
import walletAdapter from '../wallet-adapter'
import { useWallet } from '@solana/wallet-adapter-react'

interface Props {
  data?: any
}

export default function PocketItem({ data }: Props) {
  const { set, get } = useLocalStorage();
  const wallet = useWallet();
  const [publicStatus, setPublicStatus] = useState<boolean>(data.public);
  const handleUpdate = () => {
    const vaultListStorage: any = get('vaults');
    set('vaults', JSON.stringify({ ...JSON.parse(vaultListStorage), [data.address]: { ...data, public: publicStatus } }));
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="pocket-item">
          <div className="pocket-item__img">
            <img src={data.img} alt="" />
          </div>
          <div className="pocket-item__content">
            <p className='pocket-item__content-name'>{data.name}</p>
            <p className='pocket-item__content-addr'>{truncateWallet(data.address)}</p>
            <p className='pocket-item__content-balance'>0/{data.target} <span>SOL</span></p>
          </div>
        </div>
      </Dialog.Trigger>

      <Dialog.Content className='pocket-item__detail' style={{ maxWidth: 450 }}>
        <Dialog.Title className='pocket-item__detail-title'>{data.name} <span>{data.address}</span></Dialog.Title>
        <Dialog.Description size="2" mb="4">
          <Flex gap={"4"} direction={"column"}>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Description:
              </Text>
              <p className="pocket-item__detail-desc">
                {data.desc}
              </p>
            </label>
            <label>
              <Text as="div" size="2" mb="2" weight="bold">
                Public:
              </Text>
              <Switch radius='full' checked={publicStatus} onClick={() => setPublicStatus((prev: boolean) => !prev)} />
            </label>
            <Flex className='pocket-item__detail-btn-wrapper' justify={"between"} gap={"2"}>
              {wallet.publicKey &&
                <>
                  <TransferTools type='deposit' vaultAddress={data.address} walletAddress={wallet.publicKey.toString()} />
                  <TransferTools type='withdraw' vaultAddress={data.address} walletAddress={wallet.publicKey.toString()} />
                </>
              }
            </Flex>
            <Button onClick={handleUpdate}>Update</Button>
          </Flex>
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Root>
  )
}
