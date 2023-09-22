import React, { FunctionComponent } from 'react';
import styles from "./styles.module.scss";
import { MOBILE_WIDTH } from "../../../constants";

interface TitleRowProps {
  reversedFieldsOrder?: boolean;
  windowWidth: number;
}

const TitleRow: FunctionComponent<TitleRowProps> = ({reversedFieldsOrder = false, windowWidth}) => {
  return (
    <div className={styles.container} data-testid='title-row'>
      {reversedFieldsOrder || windowWidth < MOBILE_WIDTH ?
        <>
          <span>PRICE</span>
          <span>TOTAL</span>
          <span>AMOUNT</span>
          <span>SIZE</span>
        </> :
        <>
          <span>SIZE</span>
          <span>AMOUNT</span>
          <span>TOTAL</span>
          <span>PRICE</span>
        </>}
    </div>
  );
};

export default TitleRow;