import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [items, setItems] = useState(() => {
        const savedItems = localStorage.getItem('shoppingList');
        return savedItems ? JSON.parse(savedItems) : [];
    });
    const [newItem, setNewItem] = useState({ name: '', quantity: 1, price: '', category: '' });

    useEffect(() => {
        localStorage.setItem('shoppingList', JSON.stringify(items));
    }, [items]);

    const addItem = () => {
        setItems([...items, { ...newItem, id: Date.now(), purchased: false }]);
        setNewItem({ name: '', quantity: 1, price: '', category: '' });
    };

    const removeItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const togglePurchased = (id) => {
        setItems(items.map(item => item.id === id ? { ...item, purchased: !item.purchased } : item));
    };

    // const updateItem = (id, updatedItem) => {
    //     setItems(items.map(item => item.id === id ? updatedItem : item));
    // };

    const totalCost = items.reduce((total, item) => total + (item.price ? item.price * item.quantity : 0), 0);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-8">
            <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg min-h-full">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Shopping List</h1>
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Item name"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        className="border p-2 mr-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="number"
                        placeholder="Quantity"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                        className="border p-2 mr-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                        className="border p-2 mr-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={newItem.category}
                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                        className="border p-2 mr-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button onClick={addItem} className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">Add Item</button>
                </div>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">Items</h2>
                    <ul>
                        {items.filter(item => !item.purchased).map(item => (
                            <li key={item.id} className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded-lg shadow-sm">
                                <span>{item.name} - {item.quantity} {item.price && `- $${item.price}`}</span>
                                <div>
                                    <button onClick={() => togglePurchased(item.id)} className="bg-green-500 text-white p-2 mr-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300">Purchased</button>
                                    <button onClick={() => removeItem(item.id)} className="bg-red-500 text-white p-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300">Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-700">Purchased Items</h2>
                    <ul>
                        {items.filter(item => item.purchased).map(item => (
                            <li key={item.id} className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded-lg shadow-sm">
                                <span>{item.name} - {item.quantity} {item.price && `- $${item.price}`}</span>
                                <div>
                                    <button onClick={() => togglePurchased(item.id)} className="bg-yellow-500 text-white p-2 mr-2 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300">Unmark</button>
                                    <button onClick={() => removeItem(item.id)} className="bg-red-500 text-white p-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300">Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="text-2xl font-bold text-gray-800">
                    Total Cost: ${totalCost}
                </div>
            </div>
        </div>
    );
}

export default App;