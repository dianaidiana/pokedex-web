-   Hardcoded images should be included in the project instead of links to other
    people's servers. (Pokemon logo and the favicon)
-   Spinner and error should probably display inside the card, currently they are not pleasantly displayed.
-   The Pokemon image is styled as object-fit: cover, this is most likely not what you want. I believe contain is better.
-   The pokemon logo while a nice touch has no place inside the Pokemon component, it should be somewhere else.
-   Spinner animation doesn't loop nicely.
-   font-size: larger; <- using larger is very rare, I didn't even know it exists. It's probably not a recommended way to do this.
-   Pokemon component nameOrId should support using a number as well as string. (id is number)
-   implementation of getPokemonData is smelly, too many as number as string etc, instead defining an interface to match what you expect the server to respond with would be better.
