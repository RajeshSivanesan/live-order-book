import { useEffect } from "react";
import CRC from 'crc-32';
//@ts-ignore
import * as _ from 'lodash';
import useWebSocket from "react-use-websocket";

const WSS_FEED_URL: string = 'wss://api-pub.bitfinex.com/ws/2';
let seq: number
interface dynamicObj {
    [key: string]: any
}
let BOOK: dynamicObj = { mcnt: 0, bids: {}, asks: {}, psnap: {} }

export const useBitfinexHook = (isFeedKilled = false) => {
    const process = (msg: any) => {
    if (msg.event) return;

    if (msg[1] === 'hb') {
        seq = +msg[2]
        return
        } else if (msg[1] === 'cs') {
        seq = +msg[3]

        const checksum = msg[2]
        const csdata = []
        const bids_keys = BOOK.psnap['bids']
        const asks_keys = BOOK.psnap['asks']

        for (let i = 0; i < 25; i++) {
            if (bids_keys[i]) {
                const price = bids_keys[i]
                const pp = BOOK.bids[price]
                csdata.push(pp.price, pp.amount)
            }
            if (asks_keys[i]) {
                const price = asks_keys[i]
                const pp = BOOK.asks[price]
                csdata.push(pp.price, -pp.amount)
            }
        }

        const cs_str = csdata.join(':')
        const cs_calc = CRC.str(cs_str)

        //@ts-ignore
        if (cs_calc !== checksum) {
            console.error('CHECKSUM_FAILED')
            // process.exit(-1)
            throw new Error("CHECKSUM_FAILED");
        }
        return
        }

        if (BOOK.mcnt === 0) {
            _.each(msg[1], function (pp: any) {
                pp = { price: pp[0], cnt: pp[1], amount: pp[2], timeStamp: msg[3] }
                const side = pp.amount >= 0 ? 'bids' : 'asks'
                pp.amount = Math.abs(pp.amount)
                BOOK[side][pp.price] = pp
            })
        } else {
        let timestamp = msg[3];
        let newMsg = msg[1];
        if (msg[2]) {
            const cseq = +msg[2]
            newMsg = msg[1]

            if (!seq) {
            seq = cseq - 1
            }

            if (cseq - seq !== 1) {
            console.error('OUT OF SEQUENCE', seq, cseq)
            // process.exit()
            }

            seq = cseq
        }

        let pp = { price: newMsg[0], cnt: newMsg[1], amount: +newMsg[2], timeStamp: timestamp }

        if (!pp.cnt) {
            if (pp.amount > 0) {
            if (BOOK['bids'][pp.price]) {
                delete BOOK['bids'][pp.price]
            }
            } else if (pp.amount < 0) {
            if (BOOK['asks'][pp.price]) {
                delete BOOK['asks'][pp.price]
            }
            }
        } else {
            let side = pp.amount >= 0 ? 'bids' : 'asks'
            pp.amount = Math.abs(pp.amount)
            BOOK[side][pp.price] = pp
        }
        }
        _.each(['bids', 'asks'], function(side: any) {
        let sbook = BOOK[side]
        let bentries = Object.keys(sbook)
    
        bentries.sort(function(a: any, b: any) {
            if (+sbook[a].price === +sbook[b].price) {
            return a - b
            }
            if (side === 'bids') {
                return +sbook[a].price >= +sbook[b].price ? 1 : -1
            } else {
                return +sbook[a].price <= +sbook[b].price ? -1 : 1
            }
        })
    
            BOOK.psnap[side] = bentries
        })

        BOOK.mcnt++
    }

    const processMessages = (event: any) => {
        const response = JSON.parse(event.data);

        if (event.event) return
        
        process(response);
    };

    const { sendJsonMessage, getWebSocket } = useWebSocket(WSS_FEED_URL, {
        onOpen: () => console.log('WebSocket connection opened.'),
        onClose: () => console.log('WebSocket connection closed.'),
        shouldReconnect: (closeEvent) => false,
        onMessage: (event: WebSocketEventMap['message']) => processMessages(event)
    });

    useEffect(() => {
        function connect() {
            const unSubscribeMessage = {
                event: 'unsubscribe',
                channel: 'book',
                symbol: "tBTCUSD"
            };
            sendJsonMessage(unSubscribeMessage);

            const subscribeMessage = {
                event: 'subscribe',
                channel: 'book',
                symbol: "tBTCUSD"
            };
            sendJsonMessage(subscribeMessage);
        }

        if (isFeedKilled) {
            getWebSocket()?.close();
        } else {
            connect();
        }
    }, [isFeedKilled, sendJsonMessage, getWebSocket]);

    return { BOOK };
}