import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';
import { changeQuantity, removeFromCart } from '../store/cartSlice'; // <== добавь импорт

const CartPage = () => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Корзина</h2>
            {cart.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <>
                    {cart.map(item => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onIncrease={() => dispatch(changeQuantity({ id: item.id, delta: 1 }))}
                            onDecrease={() => dispatch(changeQuantity({ id: item.id, delta: -1 }))}
                            onRemove={() => dispatch(removeFromCart(item.id))}
                        />
                    ))}
                    <div className="mt-4 text-right text-xl font-bold">
                        Итого: {total} ₽
                    </div>
                    <div className="mt-4 text-right">
                        <button
                            onClick={() => navigate('/checkout')}
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Оформить заказ
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
