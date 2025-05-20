import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../public/emarket_logo.png'; // если ты его используешь

const Header = () => {
    const cartItems = useSelector(state => state.cart.items);
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="flex flex-wrap items-center justify-between gap-4 p-4 shadow-md bg-white">
            {/* Логотип + название */}
            <div className="flex items-center gap-2">
                <img src="/emarket_logo.png" alt="Logo" className="h-8 w-8" />
                <span className="text-2xl font-bold text-purple-700 whitespace-nowrap">eMarket</span>
            </div>

            {/* Навигация */}
            <nav className="flex flex-wrap items-center gap-6 text-lg font-medium">
                <Link to="/" className="hover:underline">Каталог</Link>
                <Link to="/cart" className="hover:underline">Корзина ({totalCount})</Link>
            </nav>
        </header>
    );
};

export default Header;
