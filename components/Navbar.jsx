import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  const router = useRouter();

  

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <div className={styles.logo}>
          <Image
            src="/images/pokeball.png"
            width="30"
            height="30"
            alt="PokeNext"
          />
          <h1>PokeNext</h1>
        </div>
      </Link>
      <ul className={styles.link_items}>
        <li>
          <Link href="/">
            <a className={`${router.pathname == "/" ? styles.active : ""}`}>
              Home
            </a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a
              className={`${router.pathname == "/about" ? styles.active : ""}`}
            >
              Sobre
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
