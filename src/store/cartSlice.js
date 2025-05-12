import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [] // каждый item: { id, name, price, quantity, image }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = action.payload;
            const existing = state.items.find(p => p.id === item.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }
        },
        removeFromCart(state, action) {
            state.items = state.items.filter(p => p.id !== action.payload);
        },
        changeQuantity(state, action) {
            const { id, delta } = action.payload;
            const item = state.items.find(p => p.id === id);
            if (item) {
                item.quantity += delta;
                if (item.quantity <= 0) {
                    state.items = state.items.filter(p => p.id !== id);
                }
            }
        },
        clearCart(state) {
            state.items = [];
        }
    }
});

export const { addToCart, removeFromCart, changeQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
