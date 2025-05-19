import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const loadProducts = async () => {
            const querySnapshot = await getDocs(collection(db, 'products'));
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProducts(data);
        };
        loadProducts();
    }, []);

    const handleAddToCart = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    return (
        <div className="relative max-w-7xl mx-auto p-4">
            {/* Уведомление */}
            {showToast && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-200 text-black text-sm px-4 py-2 rounded-full shadow-md flex items-center gap-2 animate-toast-wb">
                    <span className="text-green-600 text-lg">✓</span>
                    Товар добавлен в корзину
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart} // ⬅️ передаём функцию
                    />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
