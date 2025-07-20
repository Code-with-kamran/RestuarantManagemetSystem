'use client'
import { BarChart3, ShoppingCart, Users, Clock } from 'lucide-react';
import { menuItems } from '@/lib/constant'; // Assuming this provides popular items data

export const Dashboard = () => {
  return (
    <div className="p-6 w-1/1 h-[calc(100vh-100px)] overflow-auto custom-scrollbar bg-[var(--color-background)]">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {/* Sales Card */}
        <div className="bg-[var(--color-card-background)] rounded-lg shadow-md p-6 border border-[var(--color-border)] ">
          <div className="flex items-center justify-between ">
            <div>
              <p className="text-sm text-[var(--color-muted-foreground)]">Today&apos;s Sales</p>
              <p className="text-2xl font-bold text-[var(--color-foreground)]">$2,847</p>
            </div>
            <div className="w-12 h-12 bg-[var(--color-card-green-bg)] rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-[var(--color-card-green-text)]" />
            </div>
          </div>
          <p className="text-sm text-[var(--color-card-green-text)] mt-2">+15% from yesterday</p>
        </div>

        {/* Orders Card */}
        <div className="bg-[var(--color-card-background)] rounded-lg shadow-md p-6 border border-[var(--color-border)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--color-muted-foreground)]">Total Orders</p>
              <p className="text-2xl font-bold text-[var(--color-foreground)]">147</p>
            </div>
            <div className="w-12 h-12 bg-[var(--color-card-blue-bg)] rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-[var(--color-card-blue-text)]" />
            </div>
          </div>
          <p className="text-sm text-[var(--color-card-blue-text)] mt-2">+8% from yesterday</p>
        </div>

        {/* Tables Card */}
        <div className="bg-[var(--color-card-background)] rounded-lg shadow-md p-6 border border-[var(--color-border)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--color-muted-foreground)]">Active Tables</p>
              <p className="text-2xl font-bold text-[var(--color-foreground)]">12/16</p>
            </div>
            <div className="w-12 h-12 bg-[var(--color-card-orange-bg)] rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-[var(--color-card-orange-text)]" />
            </div>
          </div>
          <p className="text-sm text-[var(--color-card-orange-text)] mt-2">75% occupied</p>
        </div>

        {/* Staff Card */}
        <div className="bg-[var(--color-card-background)] rounded-lg shadow-md p-6 border border-[var(--color-border)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--color-muted-foreground)]">Staff Online</p>
              <p className="text-2xl font-bold text-[var(--color-foreground)]">8/12</p>
            </div>
            <div className="w-12 h-12 bg-[var(--color-card-purple-bg)] rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-[var(--color-card-purple-text)]" />
            </div>
          </div>
          <p className="text-sm text-[var(--color-card-purple-text)] mt-2">2 on break</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6"> {/* Added mt-6 for spacing */}
        {/* Recent Orders */}
        <div className="bg-[var(--color-card-background)] rounded-lg shadow-md p-6 border border-[var(--color-border)]">
          <h3 className="text-lg font-semibold mb-4 text-[var(--color-foreground)]">Recent Orders</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((order) => (
              <div key={order} className="flex items-center justify-between p-4 bg-[var(--color-muted)] rounded-lg">
                <div>
                  <p className="font-medium text-[var(--color-foreground)]">Order #{1000 + order}</p>
                  <p className="text-sm text-[var(--color-muted-foreground)]">Table {order + 2}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[var(--color-foreground)]">${(Math.random() * 50 + 10).toFixed(2)}</p>
                  <span className="px-2 py-1 text-xs bg-[var(--color-badge-green-bg)] text-[var(--color-badge-green-text)] rounded-full">
                    Completed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Items */}
        <div className="bg-[var(--color-card-background)] rounded-lg shadow-md p-6 border border-[var(--color-border)]">
          <h3 className="text-lg font-semibold mb-4 text-[var(--color-foreground)]">Popular Items</h3>
          <div className="space-y-4">
            {menuItems.slice(0, 4).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-[var(--color-muted)] rounded-lg">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{item.image}</span> {/* Assuming item.image is an emoji or icon string */}
                  <div>
                    <p className="font-medium text-[var(--color-foreground)]">{item.name}</p>
                    <p className="text-sm text-[var(--color-muted-foreground)]">${item.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[var(--color-foreground)]">{Math.floor(Math.random() * 20 + 5)} sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};