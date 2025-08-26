'use client';

import React, { useState, useMemo, useEffect } from 'react';

// --- SVG Icons ---
const HomeIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const ShoppingCartIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.16"></path></svg>;
const UserIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const SearchIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const PlusCircleIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;
const MinusCircleIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>;
const ChevronLeftIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="15 18 9 12 15 6"></polyline></svg>;
const SpecialDrinkIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>;
const CoffeeIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 2v2" /><path d="M14 2v2" /><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" /><path d="M6 2v2" /></svg>;
const TeaIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z" /><path d="M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0" /></svg>;
const SmoothieIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8" /><path d="M5 8h14" /><path d="M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0" /><path d="m12 8 1-6h2" /></svg>;

const GoDrinkLogo = () => (
    <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8"/>
            <path d="M5 8h14"/>
            <path d="m12 8 1-6h2"/>
        </svg>
        <span className="text-2xl font-bold tracking-wider">GoGrab</span>
    </div>
);

const categories = [
    { name: 'Coffee', thaiName: 'เช่ารายวัน', icon: CoffeeIcon, color: 'bg-pink-100' },
    { name: 'Tea', thaiName: 'เช่ารายสัปดาห์', icon: TeaIcon, color: 'bg-sky-100' },
    { name: 'Smoothies', thaiName: 'เช่ารายเดือน', icon: SmoothieIcon, color: 'bg-green-100' },
    { name: 'Special', thaiName: 'รถตู้', icon: SpecialDrinkIcon, color: 'bg-yellow-100' },
];

// --- Components ---

// ===== [START] NEW TOAST COMPONENT =====
const Toast = ({ message }) => {
    // This component will only render if there is a message.
    if (!message) {
        return null;
    }

    return (
        <div className="fixed bottom-24 md:bottom-10 right-1/2 translate-x-1/2 md:right-10 md:translate-x-0 bg-gray-800 text-white py-3 px-6 rounded-full shadow-lg z-50 animate-bounce">
            <span>✅ {message}</span>
        </div>
    );
};
// ===== [END] NEW TOAST COMPONENT =====

//const Header = () => (<header className="sticky top-0 z-20 bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-4 flex justify-between items-center shadow-lg"><GoDrinkLogo /><div className="flex items-center space-x-4"><SearchIcon className="h-6 w-6 cursor-pointer hover:opacity-80 transition-opacity" /><UserIcon className="h-6 w-6 cursor-pointer hover:opacity-80 transition-opacity" /></div></header>);
const Header = ({ onLogoClick }) => (
    <header className="sticky top-0 z-20 bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-4 flex justify-between items-center shadow-lg">
        <button onClick={onLogoClick} className="cursor-pointer transition-transform duration-200 hover:scale-105">
            <GoDrinkLogo />
        </button>
        <div className="flex items-center space-x-4">
            <SearchIcon className="h-6 w-6 cursor-pointer hover:opacity-80 transition-opacity" />
            <UserIcon className="h-6 w-6 cursor-pointer hover:opacity-80 transition-opacity" />
        </div>
    </header>
);
const WelcomeBanner = () => (<div className="p-6 sm:p-8 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl mb-8 shadow-lg"><h2 className="text-3xl font-bold mb-2">ยินดีต้อนรับ!</h2><p className="text-lg opacity-90">สั่งเครื่องดื่มแก้วโปรดของคุณได้ง่ายๆ ที่นี่</p></div>);
const CategoryNav = ({ onSelectCategory }) => (<div className="mb-8"><h3 className="text-2xl font-bold text-gray-800 mb-4">หมวดหมู่</h3><div className="grid grid-cols-2 sm:grid-cols-4 gap-4">{categories.map((cat) => (<div key={cat.name} onClick={() => onSelectCategory(cat.name)} className={`${cat.color} p-4 rounded-xl text-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer`}><cat.icon className="h-8 w-8 mx-auto mb-2 text-purple-600" /><span className="font-semibold text-gray-700">{cat.thaiName}</span></div>))}</div></div>);
const ProductCard = ({ product, onAddToCart }) => (<div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group flex flex-col"><img src={product.image} alt={product.name} className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/e2e8f0/64748b?text=Image+Not+Found'; }} /><div className="p-4 flex flex-col flex-grow"><h4 className="text-lg font-bold text-gray-800">{product.name}</h4><p className="text-sm text-gray-500 mb-3">{product.thaiName}</p><p className="text-gray-600 text-sm flex-grow">{product.description}</p><div className="mt-4 flex justify-between items-center"><span className="text-xl font-extrabold text-purple-600">฿{product.price}</span><button onClick={() => onAddToCart(product)} className="bg-purple-500 text-white rounded-full p-2 group-hover:bg-purple-600 group-hover:scale-110 transition-all duration-200"><PlusCircleIcon className="w-6 h-6" /></button></div></div></div>);
//const BottomNav = ({ activeView, setActiveView }) => { const navItems = [{ name: 'Home', thaiName: 'หน้าหลัก', icon: HomeIcon, view: 'home' }, { name: 'Menu', thaiName: 'เมนู', icon: CoffeeIcon, view: 'menu' }, { name: 'Cart', thaiName: 'ตะกร้า', icon: ShoppingCartIcon, view: 'cart' }, { name: 'Profile', thaiName: 'โปรไฟล์', icon: UserIcon, view: 'profile' },]; return (<nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-sm shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:hidden z-20"><div className="flex justify-around items-center h-16">{navItems.map(item => (<button key={item.name} onClick={() => setActiveView(item.view)} className={`flex flex-col items-center justify-center space-y-1 transition-colors ${activeView === item.view ? 'text-purple-600' : 'text-gray-500'}`}><item.icon className="w-6 h-6" /><span className="text-xs font-medium">{item.thaiName}</span></button>))}</div></nav>); };
const BottomNav = ({ activeView, setActiveView, onHomeClick }) => {
    const navItems = [
        { name: 'Home', thaiName: 'หน้าหลัก', icon: HomeIcon, view: 'home' },
        { name: 'Menu', thaiName: 'เช่า', icon: CoffeeIcon, view: 'menu' },
        { name: 'Cart', thaiName: 'ตะกร้า', icon: ShoppingCartIcon, view: 'cart' },
        { name: 'Profile', thaiName: 'โปรไฟล์', icon: UserIcon, view: 'profile' },
    ];
    return (
        <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-sm shadow-[0_-2px_10px_rgba(0,0,0,0.05)] md:hidden z-20">
            <div className="flex justify-around items-center h-16">
                {navItems.map(item => {
                    // This logic ensures the correct handler is called for each button.
                    const clickHandler = () => {
                        if (item.view === 'home') {
                            onHomeClick();
                        } else {
                            setActiveView(item.view);
                        }
                    };
                    
                    return (
                        <button key={item.name} onClick={clickHandler} className={`flex flex-col items-center justify-center space-y-1 transition-colors ${activeView === item.view ? 'text-blue-600' : 'text-gray-500'}`}>
                            <item.icon className="w-6 h-6" />
                            <span className="text-xs font-medium">{item.thaiName}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};
const CartView = ({ cart, onUpdateCart, onBack }) => {
    const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
    const handleQuantityChange = (product, change) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            const newQuantity = existingItem.quantity + change;
            if (newQuantity > 0) { onUpdateCart(product, newQuantity); }
            else { onUpdateCart(product, 0); }
        }
    };
    return (<div className="p-4 bg-gray-50 min-h-screen">
        <div className="flex items-center mb-6"><button onClick={onBack} className="p-2 mr-2 rounded-full hover:bg-gray-200">
            <ChevronLeftIcon className="w-6 h-6 text-gray-700" /></button>
            <h2 className="text-3xl font-bold text-gray-800">ตะกร้าของคุณ</h2></div>{cart.length === 0 ? 
            (<div className="text-center py-20"><ShoppingCartIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" /><p className="text-gray-500 text-lg">ตะกร้าของคุณว่างเปล่า</p><button onClick={onBack} className="mt-6 bg-purple-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-purple-600 transition-colors">เลือกซื้อสินค้าต่อ</button></div>) : (<div className="space-y-4">{cart.map(item => (<div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center"><img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover mr-4" /><div className="flex-grow"><h3 className="font-bold text-gray-800">{item.name}</h3><p className="text-purple-600 font-semibold">฿{item.price}</p></div><div className="flex items-center space-x-3"><button onClick={() => handleQuantityChange(item, -1)} className="text-purple-500 rounded-full hover:bg-purple-100 p-1"><MinusCircleIcon className="w-6 h-6" /></button><span className="font-bold text-lg w-8 text-center">{item.quantity}</span><button onClick={() => handleQuantityChange(item, 1)} className="text-purple-500 rounded-full hover:bg-purple-100 p-1"><PlusCircleIcon className="w-6 h-6" /></button></div></div>))}{<div className="mt-8 pt-6 border-t-2 border-gray-200 border-dashed"><h3 className="text-xl font-bold mb-4">สรุปรายการสั่งซื้อ</h3><div className="space-y-2 text-gray-700"><div className="flex justify-between"><span>ราคาสินค้า</span><span>฿{total.toFixed(2)}</span></div><div className="flex justify-between">
        {/* <span>ค่าจัดส่ง</span><span>ฟรี</span> */}
        </div><div className="flex justify-between font-bold text-xl text-gray-800 pt-2 border-t mt-2">
        <span>ยอดรวมทั้งหมด</span><span>฿{total.toFixed(2)}</span></div></div><button className="w-full mt-6 bg-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-purple-700 transition-colors text-lg">ชำระเงิน</button></div>}</div>)}</div>);
};

// --- Main App Component ---
export default function ClientPage({ initialProducts }) {
    const [activeView, setActiveView] = useState('home');
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    // ===== [START] NEW STATE FOR TOAST =====
    const [toastMessage, setToastMessage] = useState('');
    // ===== [END] NEW STATE FOR TOAST =====

    const products = initialProducts;
    // ===== [START] NEW FUNCTION TO HANDLE GOING HOME =====
    const handleGoHome = () => {
        setActiveView('home');
        setSelectedCategory(null); // Also reset the category filter
    };
    // ===== [END] NEW FUNCTION TO HANDLE GOING HOME =====
    // ===== [START] UPDATED FUNCTION =====
    const handleAddToCart = (productToAdd) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === productToAdd.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...productToAdd, quantity: 1 }];
        });

        // Show toast notification
        setToastMessage(`เพิ่ม "${productToAdd.thaiName}" ลงตะกร้าแล้ว`);
        // Hide toast after 3 seconds
        setTimeout(() => {
            setToastMessage('');
        }, 3000);
    };
    // ===== [END] UPDATED FUNCTION =====

    const handleUpdateCart = (productToUpdate, newQuantity) => { if (newQuantity <= 0) { setCart(prevCart => prevCart.filter(item => item.id !== productToUpdate.id)); } else { setCart(prevCart => prevCart.map(item => item.id === productToUpdate.id ? { ...item, quantity: newQuantity } : item)); } };
    const filteredProducts = useMemo(() => { if (!products) return []; if (!selectedCategory) return products; return products.filter(p => p.category === selectedCategory); }, [selectedCategory, products]);
    const handleSelectCategory = (categoryName) => { setSelectedCategory(categoryName); setActiveView('menu'); }

    // const renderView = () => {
    //     switch (activeView) {
    //         case 'cart': return <CartView cart={cart} onUpdateCart={handleUpdateCart} onBack={handleGoHome} />;
    //         case 'menu':
    //         case 'home':
    //         default: return (<div className="p-4 sm:p-6"><WelcomeBanner /><CategoryNav onSelectCategory={handleSelectCategory} /><div><div className="flex justify-between items-center mb-4"><h3 className="text-2xl font-bold text-gray-800">{selectedCategory ? `${selectedCategory} Drinks` : 'เมนูแนะนำ'}</h3>{selectedCategory && (<button onClick={() => setSelectedCategory(null)} className="text-sm font-semibold text-purple-600 hover:underline">แสดงทั้งหมด</button>)}</div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">{filteredProducts.map(product => (<ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />))}</div></div></div>);
    //     }
    // };

    const renderView = () => {
        switch (activeView) {
            case 'cart': 
                return <CartView cart={cart} onUpdateCart={handleUpdateCart} onBack={handleGoHome} />;
            
            case 'menu':
            case 'home':
            default:
                const productsToShow = selectedCategory ? filteredProducts : (products ? products.slice(0, 3) : []);

                return (
                    <div className="p-4 sm:p-6">
                        <WelcomeBanner />
                        <CategoryNav onSelectCategory={handleSelectCategory} />
                        <div>
                            <div className="flex justify-between items-center mb-4">
                               <h3 className="text-2xl font-bold text-gray-800">{selectedCategory ? `${selectedCategory} Drinks` : 'เมนูแนะนำ'}</h3>
                               {selectedCategory && (
                                   <button onClick={() => setSelectedCategory(null)} className="text-sm font-semibold text-blue-600 hover:underline">แสดงทั้งหมด</button>
                               )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {productsToShow.map(product => (
                                    <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                                ))}
                            </div>
                        </div>
                    </div>
                );
        }
    };


    return (
        <div className="bg-gray-50 min-h-screen font-sans pb-20 md:pb-0">
            <Header onLogoClick={handleGoHome} />
            <main>
                {renderView()}
            </main>
            <BottomNav 
                activeView={activeView} 
                setActiveView={setActiveView} 
                onHomeClick={handleGoHome}
            />
            {/* ===== [START] ADDED TOAST COMPONENT TO LAYOUT ===== */}
            <Toast message={toastMessage} />
            {/* ===== [END] ADDED TOAST COMPONENT TO LAYOUT ===== */}
        </div>
    );
}
