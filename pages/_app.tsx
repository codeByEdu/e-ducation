import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import SideMenu from '../components/SideMenu'
import 'bootstrap/dist/css/bootstrap.css'
import { ModalProvider } from '@/contexts/ModalContext';
export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <ModalProvider>
      <div className='div-main'>
        <SideMenu />
        <Component {...pageProps} />
      </div>
    </ModalProvider>
  )
}
