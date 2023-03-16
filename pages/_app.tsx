import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import SideMenu from '../components/SideMenu'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <div className='div-main'>
    <SideMenu />
        <Component {...pageProps} />
  </div>
  )
}
