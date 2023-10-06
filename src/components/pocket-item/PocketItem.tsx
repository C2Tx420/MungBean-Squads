import { Button, Dialog, Flex, Switch, Text } from '@radix-ui/themes'
import './style.scss'
import { truncateWallet } from '../../lib/utils'
import { useEffect, useState } from 'react'
import { useLocalStorage } from '../../hook/useLocalStorage'
import TransferTools from '../transfer-tools'
import walletAdapter from '../wallet-adapter'
import { useWallet } from '@solana/wallet-adapter-react'
import { useShyft } from '../../hook/useShyft'
import { useSquads } from '../../hook/useSquads'
import { PublicKey } from '@solana/web3.js'

interface Props {
  data?: any
}

export default function PocketItem({ data }: Props) {
  const { set, get } = useLocalStorage();
  const { getBalance } = useShyft();
  const { getVaultAddress } = useSquads();
  const wallet = useWallet();
  const [publicStatus, setPublicStatus] = useState<boolean>(data.public);
  const [vaultAddress, setVaultAddress] = useState<any>('')
  const handleUpdate = () => {
    const vaultListStorage: any = get('vaults');
    const updatedVaultList = JSON.parse(vaultListStorage).map((vault: any) => {
      if (vault.address === data.address) {
        return { ...vault, public: publicStatus }
      }
    })
    set('vaults', JSON.stringify(updatedVaultList));
  }

  const [balance, setBalance] = useState(0);

  const desc = { __html: data.desc };

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    if (wallet.publicKey) {
      const _vaultAddress = await getVaultAddress(wallet.publicKey, data.vaultIndex);
      const balance = await getBalance(_vaultAddress)
      setBalance(balance);
      setVaultAddress(_vaultAddress);
    }
  }

  const handleSendPrize = () => {

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
            <p className='pocket-item__content-addr'>{truncateWallet(vaultAddress)}</p>
          </div>
        </div>
      </Dialog.Trigger>

      <Dialog.Content className='pocket-item__detail' style={{ maxWidth: 450 }}>
        <Dialog.Title className='pocket-item__detail-title'>{data.name} <span>{vaultAddress}</span></Dialog.Title>
        <Flex gap={"4"} direction={"column"}>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Description:
            </Text>
            <div className="pocket-item__detail-desc" dangerouslySetInnerHTML={desc}>
            </div>
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Public:
            </Text>
            <Switch radius='full' checked={publicStatus} onClick={() => setPublicStatus((prev: boolean) => !prev)} />
          </label>
          <Flex className='pocket-item__detail-btn-wrapper' justify={"between"} gap={"2"}>
            {wallet.publicKey &&
              <>
                <TransferTools fetchData={fetchData} vaultIndex={data.vaultIndex} type='deposit' vaultAddress={vaultAddress} walletAddress={wallet.publicKey.toString()} />
                <TransferTools fetchData={fetchData} vaultIndex={data.vaultIndex} type='withdraw' vaultAddress={vaultAddress} walletAddress={wallet.publicKey.toString()} />
              </>
            }
          </Flex>
          <Dialog.Close>
            <Button size={"3"} onClick={handleUpdate}>Update</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
