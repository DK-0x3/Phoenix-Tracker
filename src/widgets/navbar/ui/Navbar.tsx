import styles from './Navbar.module.scss';
import { LangSwitcher } from '../../../shared/ui/lang-switcher/LangSwitcher';
import { ReactComponent as Logo } from '../../../shared/assets/svg/phoenix-logo.svg';

export const Navbar = () => {
	return (
		<nav className={styles.Navbar}>
			<Logo/>
			<LangSwitcher/>
		</nav>
	);
};