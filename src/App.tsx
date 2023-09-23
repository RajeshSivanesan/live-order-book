import { useEffect, useState } from 'react'
import { Provider } from "react-redux";
//@ts-ignore
import SnackbarProvider from 'react-simple-snackbar'
import orderBookLogo from './assets/orderbook.svg'
import styles from './App.module.scss'
import Header from './components/Header'
import OrderBook from './components/OrderBook'
import store from './redux/store'
import Footer from './components/Footer';

function App() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isFeedKilled, setIsFeedKilled] = useState(false);

  // Window width detection
  useEffect(() => {
    window.onresize = () => {
      setWindowWidth(window.innerWidth);
    }
    setWindowWidth(() => window.innerWidth);
  }, []);

  const toggleFeed = (): void => {
    setIsFeedKilled(!isFeedKilled);
  }

  return (
    <Provider store={store}>
      <SnackbarProvider>
        <Header />
        <OrderBook windowWidth={windowWidth} isFeedKilled={isFeedKilled} />
        <Footer killFeedCallback={toggleFeed} isFeedKilled={isFeedKilled} />
      </SnackbarProvider>
    </Provider>
  )
}

export default App
