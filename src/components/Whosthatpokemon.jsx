import React, { useEffect } from "react";
import { useState } from "react";

function getrandomnumber() {
    return Math.floor(Math.random() * 900) + 1;
}

function setSilouette() {
    return {
        filter: "grayscale(100%) brightness(0%)",
        width: "200px",
        height: "200px",
        dragEvent: "none",
        WebkitUserDrag: "none",
    }
}

function revealPokemon() {
    return {
        filter: "grayscale(0%) brightness(100%)",
        width: "200px",
        height: "200px",
        dragEvent: "none",
        WebkitUserDrag: "none",
    }
}

function Whosthatpokemon() {
//   pick a number between 1 and 900
    const [randomnumber, setrandomnumber] = useState(getrandomnumber());
    const [guess, setguess] = useState("");
    const [pokemonname, setpokemonname] = useState("");



    // return the image of the pokemon
    function getpokemonimage(randomnumber) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomnumber}.png`;
    }
    
    // access the API to get the name of the pokemon name
    // fetch the API

      // return the name of the pokemon
    async function getpokemonname(randomnumber) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomnumber}`);
        const data = await response.json();
        // console.log(data);
        setpokemonname(data.name);
    }
    
    // get the name of the pokemon
    useEffect(() => {
        getpokemonname(randomnumber);
        console.log(pokemonname);

    }, [randomnumber]);

    const [pokemonstyle, setpokemonstyle] = useState(setSilouette()
    );


    // compare the name of the pokemon to the guess

    function handleguess(e) {
        setguess(e.target.value);
        if (e.target.value === pokemonname) {
            // if the guess is correct, unsilouette the pokemon
            setpokemonstyle(
                revealPokemon()
            )
            // wait 1 second
            setTimeout(() => {
             // pick a new random number
                setpokemonstyle(setSilouette());
                setrandomnumber(getrandomnumber());
                setguess("");
            }, 1000);
        }
    }


    // take the image of the pokemon and add a silouette to it (css)



    return (
        <>
        <div>
            <h1 className="maintitle">Who's that Pokemon?</h1>

            <p className="instructions">Guess the name of the silhouetted pokemon</p>

            <div className="pokemonguess">
            <img src={getpokemonimage(randomnumber)} style={pokemonstyle} alt="pokemon" />

            <input type="text" value={guess} onChange={handleguess} />
            </div>
            {/* <p>Random number: {randomnumber}</p>
            <p>Pokemon name: {pokemonname}</p> */}
        </div>
        </>
    );
    }

export default Whosthatpokemon;