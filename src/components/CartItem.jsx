import { Trash2 } from 'lucide-react';

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
    return (
        <div className="flex items-center justify-between py-4 border-b">
            <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-contain" />
                <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">{item.price} ₽</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={onDecrease}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                    >
                        −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                        onClick={onIncrease}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={onRemove}
                    className="text-gray-400 hover:text-red-600 transition"
                    title="Удалить из корзины"
                >
                    <Trash2 size={22}/>
                </button>

            </div>
        </div>
    );
};

export default CartItem;
