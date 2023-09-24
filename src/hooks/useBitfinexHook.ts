import { useEffect } from "react";
//@ts-ignore
import toast, { Toaster } from 'react-hot-toast';
//@ts-ignore
import * as _ from 'lodash';
import useWebSocket from "react-use-websocket";
import { useSelector, useDispatch } from "react-redux";
import { sagaActions } from "../redux/sagaActions";

const WSS_FEED_URL: string = 'wss://api-pub.bitfinex.com/ws/2';

export const useBitfinexHook = (isFeedKilled = false) => {
    //@ts-ignore
    const { mcnt, bids, asks } = useSelector<any>(state => {
        return state.orderBook
    });
    const dispatch = useDispatch();
    const process = (msg: any) => {
        // if the msg has event property defined
        // we can ignore that event !!!
        if (msg.event) return;

        // ignore heartbeat and checksum
        // I am aware of how things for hb and cs
        if (msg[1] === 'hb' || msg[1] === 'cs') {
            return
        }

        if (mcnt === 0) {
            _.each(msg[1], function (pp: any) {
                pp = { price: pp[0], cnt: pp[1], amount: pp[2], timeStamp: msg[3] }
                const side = pp.amount >= 0 ? 'bids' : 'asks'
                pp.amount = Math.abs(pp.amount);
                if (side === 'bids') {
                    dispatch({ type: sagaActions.ADD_BIDS, payload: pp })
                } else {
                    dispatch({ type: sagaActions.ADD_ASKS, payload: pp })
                }
            })
        } else {
            let newMsg = msg[1];

            let pp = { price: newMsg[0], cnt: newMsg[1], amount: +newMsg[2] }

            if (!pp.cnt) {
                if (pp.amount > 0) {
                    if (bids[pp.price]) {
                        dispatch({ type: sagaActions.DELETE_BIDS, payload: pp })
                    }
                } else if (pp.amount < 0) {
                    if (asks[pp.price]) {
                        dispatch({ type: sagaActions.DELETE_ASKS, payload: pp })
                    }
                }
            } else {
                let side = pp.amount >= 0 ? 'bids' : 'asks'
                pp.amount = Math.abs(pp.amount)
                if (side === 'bids') {
                    dispatch({ type: sagaActions.ADD_BIDS, payload: pp })
                } else {
                    dispatch({ type: sagaActions.ADD_ASKS, payload: pp })
                }
            }
        }

        dispatch({ type: sagaActions.UPDATE_MCNT_BY_ONE });
    }

    const processMessages = (event: any) => {
        const response = JSON.parse(event.data);

        if (event.event) return

        process(response);
    };

    const { sendJsonMessage, getWebSocket } = useWebSocket(WSS_FEED_URL, {
        onOpen: () => console.log('WebSocket connection opened.'),
        onClose: (event) => {
            if (event.wasClean) {
                toast.success(`Websocket disconnected`, {
                    duration: 4000,
                    position: 'top-center'
                });
            }
        },
        onError: () => {
            toast.error("Websocket connection failed, please retry again", {
                duration: 4000,
                position: 'top-center'
            });
            dispatch({ type: sagaActions.FAILED, payload: "Websocket connection failed" });
        },
        shouldReconnect: (event) => {
            if (!event.wasClean) {
                return false;
            }
            return true;
        },
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

            toast.success("Websocket connected", {
                duration: 4000,
                position: 'top-center'
            });
        }

        if (isFeedKilled) {
            getWebSocket()?.close();
        } else {
            connect();
        }
    }, [isFeedKilled, sendJsonMessage, getWebSocket]);
}