import { Outlet, NavLink } from 'react-router'
import styles from './Layout.module.scss'
export const Layout = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <span className={styles.logo}>CADASTRO</span>

          <ul className={styles.navList}>
            <li>
              <NavLink
                to="/cadastro"
                className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
              >
                Cadastrar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/usuarios"
                className={({ isActive }) => (isActive ? styles.activeLink : undefined)}
              >
                Listagem
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  )
}
