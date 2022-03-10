import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null
}

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppStatusAC(stateDraft, action: PayloadAction<{status: RequestStatusType}>) {
            stateDraft.status = action.payload.status;
        },
        setAppErrorAC(stateDraft, action: PayloadAction<{error: string | null}>) {
            stateDraft.error = action.payload.error;
        }
    }
})

export const appReducer = slice.reducer;
export const {setAppStatusAC, setAppErrorAC} = slice.actions;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

