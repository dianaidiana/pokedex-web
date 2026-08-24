import { useCallback } from "react";
import {
    getPokemonList,
    getPokemonListData,
    PokemonData,
} from "../../poke-api";
import { Pokemon } from "../Pokemon/Pokemon";
import style from "./PokemonList.module.css";
import { usePromise } from "../../hooks/usePromise";
import { Spinner } from "../Spinner/Spinner";

interface PokemonListProps {
    amount: number;
    page: number;
    onTotalCountChange?: (count: number) => void;
}

export function PokemonList({
    amount,
    page,
    onTotalCountChange,
}: PokemonListProps) {
    const fetchPokemonList = useCallback(async () => {
        const offset = amount * (page - 1);
        const response = await getPokemonList(offset, amount);
        onTotalCountChange?.(response.count);
        const names = response.results.map((result) => result.name);
        return await getPokemonListData(names);
    }, [amount, page, onTotalCountChange]);

    const { promiseState } =
        usePromise<PromiseSettledResult<PokemonData>[]>(fetchPokemonList);

    return (
        <div className={style.container}>
            {promiseState.state === "pending" ? (
                <div className={style.statusWrapper}>
                    <Spinner />
                </div>
            ) : promiseState.state === "rejected" ? (
                <div className={style.errorState}>
                    Something went wrong loading this page.
                </div>
            ) : (
                promiseState.value.map((result, i) => (
                    <div key={amount * (page - 1) + i}>
                        <Pokemon result={result} />
                    </div>
                ))
            )}
        </div>
    );
}
