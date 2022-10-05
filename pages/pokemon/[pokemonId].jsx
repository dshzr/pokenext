import styles from "../../styles/Pokemon.module.css";
import axios from "axios";
import Image from "next/image";

export const getStaticPaths = async () => {
  const maxPokemons = 240;
  const api = `https://pokeapi.co/api/v2/pokemon/`;

  const res = await fetch(`${api}/?limit=${maxPokemons}`);

  const data = await res.json();

  const paths = data.results.map((pokemon, index) => {
    return {
      params: { pokemonId: (index + 1).toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.pokemonId;

  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    headers: {
      Accept: "application/json, text/plain, */*",
      "User-Agent": "*",
    },
  });

  const data = await res.data;

  const pkData = {
    name: data.name,
    id: data.id,
    types: data.types,
    height: data.height,
    weight: data.weight,
  };

  return {
    props: { pokemon: pkData },
  };
};

export default function Pokemon({ pokemon }) {
  return (
    <div className={styles.pokemon_container}>
      <h1 className={styles.title}>{pokemon.name}</h1>
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
        width="200"
        height="200"
        alt={pokemon.name}
      />
      <div>
        <h3>Número: </h3>
        <p className={styles.id}>#{pokemon.id}</p>
      </div>
      <div>
        <h3>Tipo:</h3>
        <div className={styles.types_container}>
          {pokemon.types.map((item, index) => (
            <span
              key={index}
              className={`${styles.type} ${styles["type_" + item.type.name]}`}
            >
              {item.type.name}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.data_container}>
        <div className={styles.data_height}>
          <h4>Altura:</h4>
          <p>{pokemon.height * 10} cm</p>
        </div>
        <div className={styles.data_weight}>
          <h4>Peso:</h4>
          <p>{pokemon.weight / 10} kg</p>
        </div>
      </div>
    </div>
  );
}
