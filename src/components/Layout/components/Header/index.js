import MiddleHeader from './MiddleHeader';
import NavBar from './NavBar';
import './Header.module.scss';

function Header() {
    return (
        <header>
            <MiddleHeader />
            <NavBar />
        </header>
    );
}

export default Header;
