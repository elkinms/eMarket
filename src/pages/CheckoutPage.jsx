const CheckoutPage = () => {
    return (
        <div className="max-w-xl mx-auto mt-8 p-4">
            <h2 className="text-2xl font-bold text-center mb-6">Оформление заказа</h2>

            <form className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Имя"
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                    type="tel"
                    placeholder="Телефон"
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                    type="text"
                    placeholder="Адрес доставки"
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <button
                    type="submit"
                    className="mt-4 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
                >
                    Подтвердить заказ
                </button>
            </form>
        </div>
    );
};

export default CheckoutPage;
