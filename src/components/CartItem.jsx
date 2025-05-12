const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
    return (
        <div className="flex items-center justify-between border-b py-4">
            <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name}   className="h-48 mx-auto object-contain rounded-md" />
                <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.price} ₽</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={onDecrease}>−</button>
                <span>{item.quantity}</span>
                <button onClick={onIncrease}>+</button>
                <button onClick={onRemove} className="ml-4 text-red-500">Удалить</button>
            </div>
        </div>
    );
};

export default CartItem;
