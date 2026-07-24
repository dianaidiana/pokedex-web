import { useCallback, useEffect, useState } from "react";

type PromiseState<T> =
    | { state: "pending" }
    | ResolvedPromiseState<T>
    | RejectedPromiseState;

interface ResolvedPromiseState<T> {
    state: "resolved";
    value: T;
}

interface RejectedPromiseState {
    state: "rejected";
    error: unknown;
}

export function usePromise<T>(promiseFunc: () => Promise<T>) {
    const [promiseState, setState] = useState<PromiseState<T>>({
        state: "pending",
    });

    const refresh = useCallback(
        async function () {
            setState({ state: "pending" });
            try {
                const value = await promiseFunc();
                setState({ state: "resolved", value });
            } catch (e) {
                setState({ state: "rejected", error: e });
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
