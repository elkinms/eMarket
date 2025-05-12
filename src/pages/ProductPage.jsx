import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch();

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

    if (!product) return <p className="text-center mt-8">Загрузка...</p>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <div className="flex flex-col items-center">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full max-w-sm h-80 object-contain rounded-lg shadow-md"
                />
                <h2 className="text-3xl font-bold mt-6 text-center">{product.name}</h2>
                <p className="text-gray-600 mt-4 text-center">{product.description}</p>
                <p className="text-2xl font-semibold mt-4">{product.price} ₽</p>
                <button
                    onClick={() => {
                        dispatch(addToCart({
                            id: product.id,
                            name: product.name,
                            price: Number(product.price),
                            image: product.image
                        }));
                    }}
                    className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
                >
                    Добавить в корзину
                </button>
            </div>
        </div>
    );
};

export default ProductPage;
