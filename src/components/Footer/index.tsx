import React, { FunctionComponent } from 'react';

import styles from "./styles.module.scss";
import Button from "../Button";

interface FooterProps {
  killFeedCallback: () => void;
  isFeedKilled: boolean;
}

const Footer: FunctionComponent<FooterProps> = ({ killFeedCallback , isFeedKilled}) => {
  return (
    <div className={styles.container}>
      <Button title={isFeedKilled ? 'Renew feed' : 'Kill Feed'} backgroundColor={'#b91d1d'} callback={killFeedCallback}/>
    </div>
  );
};

export default Footer;