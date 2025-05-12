import { collection, getDocs, query, orderBy, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";

const statuses = [
    { value: 'new', label: 'Новый' },
    { value: 'processing', label: 'В обработке' },
    { value: 'shipped', label: 'Отправлен' },
    { value: 'completed', label: 'Завершён' },
    { value: 'cancelled', label: 'Отменён' }
];

const AdminPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const ordersQuery = query(
                collection(db, "orders"),
                orderBy("createdAt", "desc")
            );
            const snapshot = await getDocs(ordersQuery);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setOrders(data);
        };

        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, { status: newStatus });

        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Заказы</h2>
            {orders
                .filter(order => order.status !== 'completed' && order.status !== 'cancelled') // скрываем завершенные и отмененные
                .map(order => (
                    <div key={order.id} className="border p-4 mb-4 rounded shadow">
                        <p><strong>Имя:</strong> {order.userInfo?.name}</p>
                        <p><strong>Email:</strong> {order.userInfo?.email}</p>
                        <p><strong>Телефон:</strong> {order.userInfo?.phone}</p>
                        <p><strong>Адрес:</strong> {order.userInfo?.address}</p>
                        <p><strong>Создан:</strong> {order.createdAt?.toDate().toLocaleString()}</p>

                        <div className="mt-2">
                            <label className="font-semibold mr-2">Статус:</label>
                            <select
                                value={order.status || 'new'}
                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                className="border p-1 rounded"
                            >
                                {statuses.map(status => (
                                    <option key={status.value} value={status.value}>
                                        {status.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <p className="font-semibold mt-4">Товары:</p>
                        <ul className="list-disc ml-6">
                            {order.items?.map((item, index) => (
                                <li key={index}>
                                    {item.name} × {item.quantity} — {item.price} ₽
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
        </div>
    );
};

export default AdminPage;
