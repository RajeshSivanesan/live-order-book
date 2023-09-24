import React, { FunctionComponent } from 'react';

import styles from "./styles.module.scss";
import { MOBILE_WIDTH } from "../../../constants";

interface PriceLevelRowProps {
    total: string;
    size: string;
    price: string;
    amount: string;
    reversedFieldsOrder?: boolean;
    windowWidth: number;
}

const PriceLevelRow: FunctionComponent<PriceLevelRowProps> = ({
    total,
    size,
    price,
    amount,
    reversedFieldsOrder = false,
    windowWidth
}) => {
    return (
        <div className={`${styles.container}`} data-testid='price-level-row'>
            {reversedFieldsOrder || windowWidth < MOBILE_WIDTH ?
                <>
                    <span className='price'>{price}</span>
                    <span>{total}</span>
                    <span>{amount}</span>
                    <span>{size}</span>
                </> :
                <>
                    <span>{size}</span>
                    <span>{amount}</span>
                    <span>{total}</span>
                    <span className='price'>{price}</span>
                </>}
        </div>
    );
};

export default React.memo(PriceLevelRow);