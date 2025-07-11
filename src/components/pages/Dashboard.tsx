'use client'
import { BarChart3, ShoppingCart, Users, Clock } from 'lucide-react';
import { menuItems } from '@/lib/constants';

export const Dashboard = () => {
  return (
    <div className="p-6 w-1/1">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6  bg-background">
        {/* Sales Card */}
        <div className="bg-background rounded-lg shadow-md p-6 border border-border ">
          <div className="flex items-center justify-between ">
            <div>
              <p className="text-sm text-muted-foreground">Today&apos;s Sales</p>
              <p className="text-2xl font-bold text-foreground">$2,847</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">+15% from yesterday</p>
        </div>
        
        {/* Orders Card */}
        <div className="bg-background rounded-lg shadow-md p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold text-foreground">147</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-blue-600 mt-2">+8% from yesterday</p>
        </div>
        
        {/* Tables Card */}
        <div className="bg-background rounded-lg shadow-md p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Tables</p>
              <p className="text-2xl font-bold text-foreground">12/16</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-orange-600 mt-2">75% occupied</p>
        </div>
        
        {/* Staff Card */}
        <div className="bg-background rounded-lg shadow-md p-6 border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Staff Online</p>
              <p className="text-2xl font-bold text-foreground">8/12</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-purple-600 mt-2">2 on break</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-background rounded-lg shadow-md p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((order) => (
              <div key={order} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">Order #{1000 + order}</p>
                  <p className="text-sm text-muted-foreground">Table {order + 2}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${(Math.random() * 50 + 10).toFixed(2)}</p>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    Completed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Popular Items */}
        <div className="bg-background rounded-lg shadow-md p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Popular Items</h3>
          <div className="space-y-4">
            {menuItems.slice(0, 4).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{item.image}</span>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">${item.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{Math.floor(Math.random() * 20 + 5)} sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};