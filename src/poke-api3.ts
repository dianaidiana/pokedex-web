const API_ROOT = "https://pokeapi.co/api/v2/pokemon/";

export class ApiError extends Error {
    status: number;
    constructor(response: Response) {
        super(`Error Status: ${response.status}`);
        this.status = response.status;
    }
}

export async function apiFetch(
    method: "GET" | "PUT" | "DELETE" | "PATCH",
    url: string,
    options?: { headers: { [key: string]: string }; body: unknown }
) {
    const headers: Record<string, string> = options?.headers ?? {};

    const reqInit: RequestInit = {
        method,
        headers: headers,
    };

    if (options?.body != undefined) {
        reqInit.body = JSON.stringify(options.body);
        headers["Content-Type"] = "application/JSON";
    }

    const response: Response = await fetch(API_ROOT + url, reqInit);

    if (response.status >= 400) {
        throw new ApiError(response);
    }

    const bodyPayload = await response.json();

    await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 1000 + 1000)
    );

    return bodyPayload;
}

export interface PokemonData {
    id: string;
    name: string;
    types: string[];
    weight: number;
    height: number;
    imageUrl: string;
}

export async function getPokemonData(
    nameOrId: string | number
): Promise<PokemonData> {
    const url = nameOrId.toString();

    const bodyPayload = await apiFetch("GET", url);

    const pokeData: PokemonData = {
        id: bodyPayload.id,
        name: bodyPayload.name,
        types: bodyPayload.types.map(
            (a: { type: { name: string } }) => a.type.name
        ),
        weight: bodyPayload.weight,
        height: bodyPayload.height,
        imageUrl: bodyPayload.sprites.other["official-artwork"].front_default,
    };

    return pokeData;
}
