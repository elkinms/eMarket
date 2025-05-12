import { useState } from 'react';
import { db, storage } from '../firebase.js';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddProductPage = () => {
    const [form, setForm] = useState({
        name: '',
        price: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setForm({ ...form, image: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.price || !form.image) {
            alert("Пожалуйста, заполните все поля");
            return;
        }

        try {
            const storageRef = ref(storage, `products/${form.image.name}`);
            await uploadBytes(storageRef, form.image);
            const imageUrl = await getDownloadURL(storageRef);

            await addDoc(collection(db, 'products'), {
                name: form.name,
                price: Number(form.price),
                image: imageUrl,
                createdAt: new Date()
            });

            alert('Товар добавлен!');
            setForm({ name: '', price: '', image: null });

        } catch (err) {
            console.error(err);
            alert('Ошибка при загрузке товара');
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Добавить товар</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="name"
                    placeholder="Название"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
                <input
                    name="price"
                    type="number"
                    placeholder="Цена"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
                <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                    Добавить товар
                </button>
            </form>
        </div>
    );
};

export default AddProductPage;
