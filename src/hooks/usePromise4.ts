import { useCallback, useEffect, useRef, useState } from "react";

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
            console.log("cancelled promise");
            cancelled = true;
        };
    }, [promiseFunc, refreshToken]);

    //Why do we return an object instead of directly the promiseState?
    return {
        promiseState,
        refresh: () => setRefreshToken(Symbol()),
    };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function usePromiseUseRefFix<T>(promiseFunc: () => Promise<T>) {
    const [promiseState, setPromiseState] = useState<PromiseState<T>>({
        state: "pending",
    });

    //let [latestPromiseRef] = useState({ current: promiseFunc });
    const latestPromiseRef = useRef(promiseFunc);

    latestPromiseRef.current = promiseFunc;

    const refresh = useCallback(
        async function () {
            setPromiseState({ state: "pending" });
            try {
                const value = await promiseFunc();
                if (promiseFunc == latestPromiseRef.current) {
                    setPromiseState({ state: "resolved", value });
                }
            } catch (error) {
                if (promiseFunc == latestPromiseRef.current) {
                    setPromiseState({
                        state: "rejected",
                        error,
                    });
                }
            }
        },
        [promiseFunc]
    );

    useEffect(() => {
        refresh();
    }, [refresh]);

    return {
        promiseState,
    };
}
