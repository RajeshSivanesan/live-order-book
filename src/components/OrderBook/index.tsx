import React, { FunctionComponent, useEffect } from 'react';
import { useBitfinexHook } from '../../hooks/useBitfinexHook';
import styles from './styles.module.scss';
import Loader from '../Loader';
import { MOBILE_WIDTH } from '../../constants';
import TitleRow from './TitleRow';
import { formatNumber } from '../../helpers';
import PriceLevelRow from './PriceLevelRow';
import DepthVisualizer from '../DepthVisualizer';

export enum OrderType {
  BIDS,
  ASKS
}

interface OrderBookProps {
    windowWidth: number;
    isFeedKilled: boolean;
}

const formatPrice = (arg: number): string => {
    return arg.toLocaleString("en", { useGrouping: true, minimumFractionDigits: 2 })
};

const buildPriceLevels = (levels: any, orderType: OrderType = OrderType.BIDS, windowWidth: any): React.ReactNode => {
    let previousValue = 0;
    let iteratingLevels = [];
    if (orderType === OrderType.BIDS) {
        iteratingLevels = Object.keys(levels).sort((a: any, b: any) => b - a);
    } else {
        iteratingLevels = Object.keys(levels);
    }
    return (
        iteratingLevels.map((level, idx) => {
            const obj = levels[level];
            const calculatedTotal: string = formatNumber(obj.amount);
            const depth = previousValue + obj.amount;
            const total: string = formatNumber(depth);
            const size: string = formatNumber(obj.cnt);
            const price: string = formatPrice(obj.price);
            previousValue = depth;

            return (
                <div key={idx + depth}>
                    <DepthVisualizer key={depth} windowWidth={windowWidth} depth={depth} orderType={orderType} />
                    <PriceLevelRow key={size + total}
                        total={total}
                        size={size}
                        price={price}
                        amount={calculatedTotal}
                        reversedFieldsOrder={orderType === OrderType.ASKS}
                        windowWidth={windowWidth} />
                </div>
            );
        })
    );
};

const OrderBook = ({ isFeedKilled, windowWidth }: OrderBookProps) => {
    const { BOOK } = useBitfinexHook(isFeedKilled);

    const { bids, asks } = BOOK;

    return (
        <div className={styles.container}>
        {Object.keys(bids).length && Object.keys(asks).length ?
        <>
          <div className={styles.tableContainer}>
            <TitleRow windowWidth={windowWidth} reversedFieldsOrder={false} />
            <div>{buildPriceLevels(bids, OrderType.BIDS, windowWidth)}</div>
          </div>
          {/* <Spread bids={bids} asks={asks} /> */}
          <div className={styles.tableContainer}>
            <TitleRow windowWidth={windowWidth} reversedFieldsOrder={true} />
            <div>
              {buildPriceLevels(asks, OrderType.ASKS, windowWidth)}
            </div>
          </div>
        </> :
        <Loader />}
        </div>
    )
}

export default OrderBook;