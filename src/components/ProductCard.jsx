import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(
            addToCart({
                id: product.id,
                name: product.name,
                price: Number(product.price),
                image: product.image,
            })
        );
        onAddToCart?.(); // вызываем, если передано
    };

    return (
        <div className="border border-gray-300/60 rounded-xl p-4 shadow hover:shadow-md transition flex flex-col justify-between">
            <Link to={`/product/${product.id}`}>
                <div className="w-full aspect-[4/3] bg-white rounded-md overflow-hidden mb-4">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                    />
                </div>
            </Link>

            <Link to={`/product/${product.id}`} className="text-lg font-semibold hover:underline">
                {product.name}
            </Link>

            <p className="text-gray-700 mb-4">{product.price} ₽</p>

            <button
                onClick={handleClick}
                className="mt-auto flex items-center justify-center gap-2 text-sm py-2 px-3 rounded text-white bg-purple-600 hover:bg-purple-700 transition"
            >
                <ShoppingCart size={18} />
                В корзину
            </button>
        </div>
    );
};

export default ProductCard;
