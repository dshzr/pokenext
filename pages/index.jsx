import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Card from "../components/Card";

export async function getStaticProps() {
  const maxPokemons = 240;
  const api = "https://pokeapi.co/api/v2/pokemon";

  const res = await fetch(`${api}/?limit=${maxPokemons}`);
 
  const dataPokemons = await res.json();

  //adiconar index de pokemon

  dataPokemons.results.forEach((item, index) => {
    item.id = index + 1;
  });

  return {
    props: {
      pokemons: dataPokemons.results,
    },
  };
}

export default function Home({ pokemons }) {
  return (
    <>
      <div className={styles.title_container}>
        <h1 className={styles.title}>
          Poke<span>Next</span>
        </h1>
        <Image
          src="/images/pokeball.png"
          width={50}
          height={50}
          alt="Pokedex"
        />
      </div>
      <div className={styles.pokemon_container}>
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
}
