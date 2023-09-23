import { FunctionComponent } from 'react';

import styles from "./styles.module.scss";
import Button from "../Button";
import { useSelector } from 'react-redux';

interface FooterProps {
  killFeedCallback: () => void;
  isFeedKilled: boolean;
}

const Footer: FunctionComponent<FooterProps> = ({ killFeedCallback , isFeedKilled}) => {
  //@ts-ignore
  const { bids = {} } = useSelector<any>(state => state.orderBook);

  if (Object.keys(bids).length === 0) {
    return null;
  }
  
  return (
    <div className={styles.container}>
      <Button title={isFeedKilled ? 'Renew feed' : 'Kill Feed'} backgroundColor={'#b91d1d'} callback={killFeedCallback}/>
    </div>
  );
};

export default Footer;