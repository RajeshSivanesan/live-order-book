import { useEffect, useState } from 'react'
import orderBookLogo from './assets/orderbook.svg'
import './App.css'
import Header from './components/Header'
import OrderBook from './components/OrderBook'

function App() {
  const [count, setCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isFeedKilled, setIsFeedKilled] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsFeedKilled(true);
    }, 5000);
  }, []);

  // Window width detection
  useEffect(() => {
    window.onresize = () => {
      setWindowWidth(window.innerWidth);
    }
    setWindowWidth(() => window.innerWidth);
  }, []);

  return (
    <>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center' }}>
        <a href="https://trading.bitfinex.com/t?demo=true" target="_blank">
          <img src={orderBookLogo} className="logo orderbook" alt="Order Book logo" />
        </a>
        <h3>Bitfinex Order Book</h3>
      </div>
      <Header />
      <OrderBook windowWidth={windowWidth} isFeedKilled={isFeedKilled} />
    </>
  )
}

export default App
