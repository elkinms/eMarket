import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../public/emarket_logo.png'; // путь к логотипу (проверь правильный путь!)

const Header = () => {
    const cartItems = useSelector(state => state.cart.items);
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="flex items-center justify-between p-6 shadow-md">
            <div className="flex items-center">
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="Logo" className="h-20 w-20 mr-6"/>
                    <h1 className="text-6xl">eMarket</h1>
            </Link>
        </div>
    <nav className="flex items-center space-x-6">
                <Link to="/" className="text-4xl">Каталог</Link>
                <Link to="/cart" className="text-4xl">Корзина ({totalCount})</Link>
            </nav>
        </header>
    );
};

export default Header;
