import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { db } from '../firebase'; // Firebase
import { collection, getDocs } from 'firebase/firestore';

const HomePage = () => {
    const [products, setProducts] = useState([]);

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

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default HomePage;
