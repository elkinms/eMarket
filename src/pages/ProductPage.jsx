import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { ShoppingCart } from 'lucide-react';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const dispatch = useDispatch();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const loadProduct = async () => {
            const docRef = doc(db, 'products', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProduct({ id: docSnap.id, ...docSnap.data() });
            }
        };
        loadProduct();
    }, [id]);

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.image
        }));
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    if (!product) return <p className="text-center mt-8">Загрузка...</p>;

    return (
        <div className="relative max-w-6xl mx-auto p-4 pb-24">
            {/* Уведомление */}
            {showToast && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-200 text-black text-sm px-4 py-2 rounded-full shadow-md flex items-center gap-2 animate-toast-wb">
                    <span className="text-lg">✓</span>
                    Товар добавлен в корзину
                </div>
            )}

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                <div className="w-full max-w-sm aspect-[4/3] bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                    />
                </div>

                <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold mt-4 lg:mt-0">{product.name}</h2>
                    <p className="text-gray-600 mt-2">{product.description}</p>
                    <p className="text-xl sm:text-2xl font-semibold mt-4">{product.price} ₽</p>

                    {/* Кнопка на десктопе */}
                    {!isMobile && (
                        <button
                            onClick={handleAddToCart}
                            className="mt-6 flex items-center justify-center gap-2 text-sm py-2 px-4 rounded text-white bg-purple-600 hover:bg-purple-700 transition"
                        >
                            <ShoppingCart size={18} />
                            В корзину
                        </button>
                    )}
                </div>
            </div>

            {/* Кнопка фиксирована внизу на мобильных */}
            {isMobile && (
                <button
                    onClick={handleAddToCart}
                    className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm flex items-center justify-center gap-2 text-sm py-3 px-4 rounded text-white bg-purple-600 hover:bg-purple-700 shadow-lg transition z-50"
                >
                    <ShoppingCart size={18} />
                    В корзину
                </button>
            )}
        </div>
    );
};

export default ProductPage;
