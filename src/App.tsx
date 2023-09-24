import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
//@ts-ignore
import Header from './components/Header'
import styles from './App.module.scss';
import OrderBook from './components/OrderBook'
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

function App() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isFeedKilled, setIsFeedKilled] = useState(false);
  //@ts-ignore
  const { error = '' } = useSelector<any>(state => state.orderBook);

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

  if (error) {
    return <center className={styles.errorContainer}><h4>{`Application Failure - ${error}, please reload again!!!`}</h4></center>
  }

  return (
    <>
      <Header />
      <OrderBook windowWidth={windowWidth} isFeedKilled={isFeedKilled} />
      <Footer killFeedCallback={toggleFeed} isFeedKilled={isFeedKilled} />
      <Toaster />
    </>
  )
}

export default App
