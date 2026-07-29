import { Pokemon } from "../Pokemon/Pokemon";
import style from "./PokemonList.module.css";

interface PokemonListProps {
    amount: number;
    page: number;
}

export function PokemonList({ amount, page }: PokemonListProps) {
    const ids = [];
    for (let i = 1; i <= amount; i++) {
        ids.push(amount * (page - 1) + i);
    }

    return (
        <div className={style.container}>
            {ids.map((id) => (
                <div className={style.pokeCard} key={id}>
                    <Pokemon nameOrId={id} />
                </div>
            ))}
        </div>
    );
}
