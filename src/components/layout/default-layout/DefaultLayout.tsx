import Header from '../../header/private'
import { Outlet } from 'react-router-dom'
import SideNav from '../../side-nav'
import './style.scss'
import { Container } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { useSquads } from '../../../hook/useSquads'
import { useWallet } from '@solana/wallet-adapter-react'
import { useDispatch } from 'react-redux'
import { createToast } from '../../../store/reducers/toast-reducer'
import Loading from '../../loading'

export default function DefaultLayout() {
  const { getMultisig, createMultisig } = useSquads();
  const wallet = useWallet();
  const [hasMultisig, setHasMultisig] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (wallet.publicKey) {
        const multisig = await getMultisig();
        if (multisig) {
          setHasMultisig(true)
        } else {
          try {
            await createMultisig(wallet)
            setHasMultisig(true);
          } catch (e) {
            console.log(e)
            dispatch(createToast({ type: 'error', title: 'Failed', desc: 'Cant create multisig' }));
            wallet.disconnect();
          }
        }
      }
    })()
  }, [])
  return (
    <>
      <Header />
      <div className="main">
        <Container >
          {hasMultisig ?
            <div className="main__content-wrapper">
              <SideNav />
              <div className="main__content">
                <Outlet />
              </div>
            </div>
            :
            <Loading />
          }
        </Container>
      </div>
    </>
  )
}
