const ProductCard = ({ product }) => {
    return (
        <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-700">{product.price} ₽</p>
            <a href={`/product/${product.id}`} className="block mt-2 text-blue-600 hover:underline">
                Подробнее
            </a>
        </div>
    );
};

export default ProductCard;
