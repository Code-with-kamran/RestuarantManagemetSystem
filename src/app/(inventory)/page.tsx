'use client'
import {  useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeContext } from '@/context/ThemeContext';



interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  lastUpdated: string;
}
 const InventoryPage = () => {

  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 1,
      name: 'Coffee Beans',
      category: 'Beverage',
      quantity: 25,
      price: 12.99,
      lastUpdated: new Date().toLocaleDateString()
    },
    {
      id: 2,
      name: 'Milk',
      category: 'Dairy',
      quantity: 10,
      price: 3.99,
      lastUpdated: new Date().toLocaleDateString()
    },
    // Add more sample inventory items
  ]);

  const [formData, setFormData] = useState<Omit<InventoryItem, 'id' | 'lastUpdated'>>({
    name: '',
    category: '',
    quantity: 0,
    price: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value
    });

    
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: InventoryItem = {
      ...formData,
      id: inventory.length + 1,
      lastUpdated: new Date().toLocaleDateString()
    };
    setInventory([...inventory, newItem]);
    
    setFormData({ name: '', category: '', quantity: 0, price: 0 });
    
  };
// const {addinventory} = useContext(ThemeContext)
  return (
    <div className="p-6">
      

      { !(true) &&(
        <form onSubmit={handleSubmit} className="bg-muted p-4 mb-6 rounded-lg border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Item Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-2 border border-border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full p-2 border border-border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-2 border border-border rounded"
                required
              />
            </div>
            {/* <input type="file" name="" id="" /> */}
          </div>
          <div className="flex justify-end space-x-2">
           
            <Button type="submit" className='text-black'>Save Item</Button>
          </div>
        </form>)
      }

      { (<div className="bg-background rounded-lg shadow-md border border-border overflow-hidden">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {inventory.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.quantity < 5 ? 'bg-red-100 text-red-800' : 
                    item.quantity < 10 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.quantity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)}
    </div>
  );
};
export default InventoryPage