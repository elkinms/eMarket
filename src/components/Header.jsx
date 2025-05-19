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
                    <h1 className="text-4xl font-bold text-purple-700">eMarket</h1>
            </Link>
        </div>
    <nav className="flex items-center space-x-6">
                <Link to="/" className="text-2xl font-bold text-400">Каталог</Link>
                <Link to="/cart" className="text-2xl font-bold text-400">Корзина ({totalCount})</Link>
            </nav>
        </header>
    );
};

export default Header;
