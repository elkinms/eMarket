import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { clearCart } from '../store/cartSlice';

const CheckoutPage = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
    const cart = useSelector(state => state.cart.items);
    const filteredItems = cart.map(({ id, name, price, quantity }) => ({
        id,
        name,
        price,
        quantity
    }));
    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();

        await addDoc(collection(db, 'orders'), {
            userInfo: form,
            items: filteredItems,
            createdAt: serverTimestamp(),
            status: 'new'
        });

        dispatch(clearCart());
        alert('Заказ успешно оформлен!');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
            <h2 className="text-2xl font-bold">Оформление заказа</h2>
            <input
                type="text"
                placeholder="Имя"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full border p-2 rounded"
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full border p-2 rounded"
                required
            />
            <input
                type="tel"
                placeholder="Телефон"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full border p-2 rounded"
                required
            />
            <input
                type="text"
                placeholder="Адрес доставки"
                value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })}
                className="w-full border p-2 rounded"
                required
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                Подтвердить заказ
            </button>
        </form>
    );
};

export default CheckoutPage;
