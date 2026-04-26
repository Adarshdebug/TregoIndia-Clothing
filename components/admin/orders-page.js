"use client";

import { useEffect, useState } from "react";

const statuses = ["Pending", "Confirmed", "Packed", "Shipped", "Delivered"];

export function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  async function loadOrders() {
    const response = await fetch("/api/orders", { cache: "no-store" });
    const data = await response.json();
    setOrders(data.orders || []);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function updateStatus(id, status) {
    const response = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.message || "Unable to update status.");
      return;
    }
    setMessage("Order updated.");
    loadOrders();
  }

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-5">
      <div className="mb-5">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <p className="mt-2 text-sm text-white/60">Track orders and keep statuses current.</p>
      </div>
      {message ? <p className="mb-4 text-sm text-white/70">{message}</p> : null}
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="rounded-lg border border-white/10 px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-semibold">Order #{order._id.slice(-6).toUpperCase()}</div>
                <div className="mt-1 text-sm text-white/60">
                  {order.items?.length || 0} item(s) • Rs. {order.total}
                </div>
              </div>
              <select
                value={order.status}
                onChange={(event) => updateStatus(order._id, event.target.value)}
                className="rounded-lg border border-white/10 bg-[var(--surface-alt)] px-3 py-2 text-[var(--text)]"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
