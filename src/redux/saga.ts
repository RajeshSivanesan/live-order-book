import { call, takeEvery, put } from "redux-saga/effects";
import { AddBidsAsksPayload, addAsks, addBids, deleteAsks, deleteBids, updateMcntByOne } from "./store";
import { sagaActions } from "./sagaActions";
import { PayloadAction } from "@reduxjs/toolkit";

export function* sagaAddBids({ payload }: PayloadAction<AddBidsAsksPayload>) {
  try {
    yield put(addBids(payload));
  } catch (e) {
    // yield put({ type: "TODO_FETCH_FAILED" });
    console.log(e);
  }
}

export function* sagaAddAsks({ payload }: PayloadAction<AddBidsAsksPayload>) {
  try {
    yield put(addAsks(payload));
  } catch (e) {
    // yield put({ type: "TODO_FETCH_FAILED" });
    console.log(e);
  }
}

export function* sagaDeleteBids({ payload }: any) {
  try {
    yield put(deleteBids(payload));
  } catch (e) {
    // yield put({ type: "TODO_FETCH_FAILED" });
    console.log(e);
  }
}

export function* sagaDeleteAsks({ payload }: any) {
  try {
    yield put(deleteAsks(payload));
  } catch (e) {
    // yield put({ type: "TODO_FETCH_FAILED" });
    console.log(e);
  }
}

export function* sagaUpdateMcntByOne() {
  try {
    yield put(updateMcntByOne());
  } catch (e) {
    // yield put({ type: "TODO_FETCH_FAILED" });
    console.log(e);
  }
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.ADD_BIDS, sagaAddBids);
  yield takeEvery(sagaActions.ADD_ASKS, sagaAddAsks);
  yield takeEvery(sagaActions.DELETE_BIDS, sagaDeleteBids);
  yield takeEvery(sagaActions.DELETE_ASKS, sagaDeleteAsks);
  yield takeEvery(sagaActions.UPDATE_MCNT_BY_ONE, sagaUpdateMcntByOne)
}
