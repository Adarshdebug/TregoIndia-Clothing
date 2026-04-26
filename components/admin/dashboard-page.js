"use client";

import { useEffect, useMemo, useState } from "react";

export function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/products", { cache: "no-store" }).then((res) => res.json()),
      fetch("/api/orders", { cache: "no-store" }).then((res) => res.json())
    ]).then(([productData, orderData]) => {
      setProducts(productData.products || []);
      setOrders(orderData.orders || []);
    });
  }, []);

  const metrics = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const totalStock = products.reduce((sum, product) => sum + (product.stock || 0), 0);

    return [
      { label: "Products", value: products.length },
      { label: "Orders", value: orders.length },
      { label: "Units in stock", value: totalStock },
      { label: "Revenue", value: `Rs. ${totalRevenue}` }
    ];
  }, [orders, products]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="mt-2 text-sm text-white/60">Fast overview of products, orders, and stock.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-lg border border-white/10 bg-white/5 p-5">
            <div className="text-sm text-white/60">{metric.label}</div>
            <div className="mt-3 text-3xl font-semibold">{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className="rounded-lg border border-white/10 bg-white/5 p-5">
          <h2 className="text-xl font-semibold">Recent products</h2>
          <div className="mt-4 space-y-3">
            {products.slice(0, 5).map((product) => (
              <div key={product._id} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 px-4 py-3">
                <div>
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-white/60">{product.category}</div>
                </div>
                <div className="text-sm text-white/70">Stock {product.stock}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-white/10 bg-white/5 p-5">
          <h2 className="text-xl font-semibold">Recent orders</h2>
          <div className="mt-4 space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div key={order._id} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 px-4 py-3">
                <div>
                  <div className="font-medium">#{order._id.slice(-6).toUpperCase()}</div>
                  <div className="text-sm text-white/60">{order.items?.length || 0} item(s)</div>
                </div>
                <div className="text-sm text-white/70">{order.status}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
