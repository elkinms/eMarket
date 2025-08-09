import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage.jsx';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage.jsx';
import AdminPage from './pages/AdminPage'; // TODO
import AddProductPage from './pages/AddProductPage'; // TODO To add a product.

const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header />

                <main className="flex-grow container mx-auto p-4">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/product/:id" element={<ProductPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/admin" element={<AdminPage />} /> {/* новый маршрут */}
                        <Route path="/admin/add-product" element={<AddProductPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
