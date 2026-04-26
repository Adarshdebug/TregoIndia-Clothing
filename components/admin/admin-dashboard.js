"use client";

import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { useState } from "react";

export function AdminDashboard({ initialProducts, initialOrders, initialStats }) {
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    category: "Streetwear",
    gender: "Unisex",
    price: 0,
    compareAtPrice: 0,
    stock: 0,
    sizes: "S,M,L,XL",
    images: ""
  });
  const [uploading, setUploading] = useState(false);

  async function handleCreate(event) {
    event.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      compareAtPrice: Number(form.compareAtPrice),
      stock: Number(form.stock),
      sizes: form.sizes.split(",").map((item) => item.trim()),
      images: form.images.split(",").map((item) => item.trim())
    };
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (res.ok) {
      setProducts((current) => [data.product, ...current]);
    } else {
      alert(data.message);
    }
  }

  async function updateStatus(orderId, status) {
    const res = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      setOrders((current) => current.map((order) => (order._id === orderId ? { ...order, status } : order)));
    }
  }

  async function removeProduct(id) {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((current) => current.filter((product) => product._id !== id));
    }
  }

  async function handleUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/uploads", { method: "POST", body });
    const data = await res.json();
    setUploading(false);

    if (res.ok) {
      setForm((current) => ({
        ...current,
        images: current.images ? `${current.images}, ${data.url}` : data.url
      }));
    } else {
      alert(data.message);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Revenue", value: `Rs. ${initialStats.revenue.toLocaleString("en-IN")}` },
          { label: "Orders", value: initialStats.orders.toString() },
          { label: "Products", value: initialStats.products.toString() },
          { label: "Low stock", value: initialStats.lowStock.toString() }
        ].map((card) => (
          <div key={card.label} className="touch-card p-5">
            <p className="text-sm text-white/45">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="touch-card p-5">
          <h2 className="text-2xl font-semibold">Sales analytics</h2>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={initialStats.chart}>
                <XAxis dataKey="name" stroke="#7b7b7b" />
                <Tooltip />
                <Bar dataKey="sales" fill="#ffffff" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <form onSubmit={handleCreate} className="touch-card space-y-3 p-5">
          <h2 className="text-2xl font-semibold">Add product</h2>
          {Object.keys(form).map((key) => (
            <input
              key={key}
              placeholder={key}
              value={form[key]}
              onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm"
            />
          ))}
          <label className="block rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-4 text-sm text-white/65">
            {uploading ? "Uploading..." : "Upload product image"}
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
          <button className="w-full rounded-full bg-white px-5 py-4 text-sm font-semibold text-black">Save product</button>
        </form>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="touch-card p-5">
          <h2 className="text-2xl font-semibold">Manage products</h2>
          <div className="mt-5 space-y-3">
            {products.map((product) => (
              <div key={product._id} className="flex items-center justify-between rounded-[24px] border border-white/10 bg-white/5 p-4">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-white/45">Stock: {product.stock}</p>
                </div>
                <button onClick={() => removeProduct(product._id)} className="text-sm text-white/50">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="touch-card p-5">
          <h2 className="text-2xl font-semibold">Manage orders</h2>
          <div className="mt-5 space-y-3">
            {orders.map((order) => (
              <div key={order._id} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{order.shippingAddress?.fullName || "Guest order"}</p>
                    <p className="text-sm text-white/45">Rs. {order.total.toLocaleString("en-IN")}</p>
                  </div>
                  <select
                    value={order.status}
                    onChange={(event) => updateStatus(order._id, event.target.value)}
                    className="rounded-xl border border-white/10 bg-black px-3 py-2 text-sm"
                  >
                    {["Pending", "Confirmed", "Packed", "Shipped", "Delivered"].map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
