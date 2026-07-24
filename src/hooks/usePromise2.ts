import { useCallback, useEffect, useState } from "react";

export type PromiseState = ResolvedState | PendingState | RejectedState;

export interface ResolvedState {
    state: "resolved";
    value: unknown;
}

export interface PendingState {
    state: "pending";
}

export interface RejectedState {
    state: "rejected";
    error: unknown;
}

export function usePromise<T>(promiseFunction: () => Promise<T>): PromiseState {
    const [promiseState, setPromiseState] = useState<PromiseState>({
        state: "pending",
    });

    const func = useCallback(async () => promiseFunction(), [promiseFunction]);

    useEffect(() => {
        try {
            const value = func();
            setPromiseState({ state: "resolved", value });
        } catch (error) {
            setPromiseState({ state: "rejected", error });
        }
    }, [func]);

    return promiseState;
}
