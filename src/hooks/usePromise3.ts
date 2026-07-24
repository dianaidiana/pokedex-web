import { useCallback, useEffect, useState } from "react";

export type PromiseState<T> =
    | { state: "pending" }
    | ResolvedPromiseState<T>
    | RejectedPromiseState;

export interface ResolvedPromiseState<T> {
    state: "resolved";
    value: T;
}

export interface RejectedPromiseState {
    state: "rejected";
    error: unknown;
}

export function usePromise<T>(promiseFunc: () => Promise<T>): PromiseState<T> {
    const [promiseState, setPromiseState] = useState<PromiseState<T>>({
        state: "pending",
    });

    const refresh = useCallback(
        async function () {
            setPromiseState({ state: "pending" });
            try {
                const value = await promiseFunc();
                setPromiseState({ state: "resolved", value });
            } catch (error) {
                setPromiseState({
                    state: "rejected",
                    error,
                });
            }
        },
        [promiseFunc]
    );

    useEffect(() => {
        refresh();
    }, [refresh]);

    return promiseState;
}
