import Header from '../../header/private'
import { Outlet } from 'react-router-dom'
import SideNav from '../../side-nav'
import './style.scss'
import { Container } from '@radix-ui/themes'

export default function DefaultLayout() {
  return (
    <>
      <Header />
        <Container size={'3'}>
          <div className="main">
            <SideNav />
            <div className="main__content">
              <Outlet />
            </div>
          </div>
        </Container>
    </>
  )
}
