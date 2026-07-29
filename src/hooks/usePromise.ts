import { useEffect, useState } from "react";

export type PromiseState<T> =
    | PendingPromiseState
    | ResolvedPromiseState<T>
    | RejectedPromiseState;

export interface PendingPromiseState {
    state: "pending";
}

export interface ResolvedPromiseState<T> {
    state: "resolved";
    value: T;
}

export interface RejectedPromiseState {
    state: "rejected";
    error: unknown;
}

export function usePromise<T>(promiseFunc: () => Promise<T>) {
    const [promiseState, setPromiseState] = useState<PromiseState<T>>({
        state: "pending",
    });

    const [refreshToken, setRefreshToken] = useState(Symbol());

    useEffect(() => {
        let cancelled = false;
        (async function () {
            setPromiseState({ state: "pending" });
            try {
                const value = await promiseFunc();
                if (!cancelled) {
                    setPromiseState({ state: "resolved", value });
                }
            } catch (error) {
                if (!cancelled) {
                    setPromiseState({
                        state: "rejected",
                        error,
                    });
                }
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [promiseFunc, refreshToken]);

    return {
        promiseState,
        refresh: () => setRefreshToken(Symbol()),
    };
}
