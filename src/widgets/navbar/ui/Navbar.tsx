import styles from './Navbar.module.scss';
import { LangSwitcher } from '../../../shared/ui/lang-switcher/LangSwitcher';
import Logo from '../../../shared/assets/svg/phoenix-logo.svg';
import { Link } from 'react-router-dom';

export const Navbar = () => {
	return (
		<nav className={styles.Navbar}>
			<Logo className={styles.Logo}/>
			<Link to="/">
				<p>
					{/* eslint-disable-next-line max-len,i18next/no-literal-string */}
					<span className={styles.highlightTitle}>P</span>hoenix <span className={styles.highlightTitle}>T</span>racker
				</p>
			</Link>
			<LangSwitcher/>
		</nav>
	);
};