import Image from "next/image";
import styles from "../styles/About.module.css";
export default function About() {
  return (
    <div className={styles.container}>
      <h1>Sobre o projeto</h1>
      <p>Projeto de Pokemons criado com NextJS! utilizando a API da PokeAPI.</p>
      <Image
        src="/images/charizard.png"
        width={300}
        height={300}
        alt="Charizard"
      />
    </div>
  );
}
