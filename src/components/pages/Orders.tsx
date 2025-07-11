'use client'
import { ThemeContext } from '@/context/ThemeContext';
import { useContext, useState } from 'react';

interface Order {
  id: number;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: string;
  timestamp: string;
  status: string;
}

export const OrdersComponent = () => {
//   const [orders, setOrders] = useState<Order[]>([
//     {
//       id: 1,
//       items: [
//         { id: 1, name: 'French Vanilla Fantasy', price: 12.83, quantity: 2 },
//         { id: 2, name: 'Almond Amore', price: 11.25, quantity: 1 }
//       ],
//       total: '36.91',
//       timestamp: new Date().toLocaleString(),
//       status: 'Completed'
//     },
//     // Add more sample orders as needed
//   ]);
const {orders, setOrders} = useContext(ThemeContext)
  return (
    <div className="p-6">
      <div className="bg-background rounded-lg shadow-md p-6 border border-border">
        <h3 className="text-xl font-semibold mb-6">Recent Orders</h3>
        
        {orders.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No orders yet</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.timestamp}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">${order.total}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      order.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};