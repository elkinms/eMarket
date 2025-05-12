import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Загружаем сохранённое состояние корзины
const loadFromLocalStorage = () => {
    try {
        const data = localStorage.getItem('cart');
        if (data === null) return undefined;
        return {
            cart: JSON.parse(data)
        };
    } catch (e) {
        console.warn('Ошибка загрузки из localStorage:', e);
        return undefined;
    }
};

// Сохраняем состояние корзины
const saveToLocalStorage = (state) => {
    try {
        const serialized = JSON.stringify(state.cart);
        localStorage.setItem('cart', serialized);
    } catch (e) {
        console.warn('Ошибка сохранения в localStorage:', e);
    }
};

const store = configureStore({
    reducer: {
        cart: cartReducer
    },
    preloadedState: loadFromLocalStorage(), // 🟡 <- добавлено
});

// Подписка на изменения store — сохраняем в localStorage
store.subscribe(() => {
    saveToLocalStorage(store.getState());
});

export default store;
