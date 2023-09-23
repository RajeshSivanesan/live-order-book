import { FunctionComponent } from 'react';

import classes from "./styles.module.scss";

const Header: FunctionComponent<{}> = () => {
  return (
    <div className={classes.container}>
      <h3>Order Book BTC/USD</h3>
    </div>
  );
};

export default Header;