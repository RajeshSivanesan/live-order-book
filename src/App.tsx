import { useEffect, useState } from 'react'
import { Provider } from "react-redux";
import orderBookLogo from './assets/orderbook.svg'
import './App.css'
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
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center' }}>
        <a href="https://trading.bitfinex.com/t?demo=true" target="_blank">
          <img src={orderBookLogo} className="logo orderbook" alt="Order Book logo" />
        </a>
        <h3>Bitfinex Order Book</h3>
      </div>
      <Header />
      <OrderBook windowWidth={windowWidth} isFeedKilled={isFeedKilled} />
      <Footer killFeedCallback={toggleFeed} isFeedKilled={isFeedKilled} />
    </Provider>
  )
}

export default App
