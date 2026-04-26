"use client";

import { useEffect, useMemo, useState } from "react";

const emptyForm = {
  _id: "",
  name: "",
  slug: "",
  description: "",
  category: "Oversized",
  gender: "Unisex",
  price: "0",
  compareAtPrice: "0",
  stock: "0",
  sizes: "S,M,L,XL",
  tags: "new",
  image: "",
  featured: true,
  trending: false
};

export function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  async function loadProducts() {
    const response = await fetch("/api/products", { cache: "no-store" });
    const data = await response.json();
    setProducts(data.products || []);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const isEditing = useMemo(() => Boolean(form._id), [form._id]);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      category: form.category,
      gender: form.gender,
      price: Number(form.price),
      compareAtPrice: Number(form.compareAtPrice),
      stock: Number(form.stock),
      sizes: form.sizes.split(",").map((item) => item.trim()).filter(Boolean),
      tags: form.tags.split(",").map((item) => item.trim()).filter(Boolean),
      images: form.image ? [form.image] : [],
      featured: form.featured,
      trending: form.trending
    };

    const response = await fetch(isEditing ? `/api/products/${form._id}` : "/api/products", {
      method: isEditing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || "Unable to save product.");
      return;
    }

    setMessage(isEditing ? "Product updated." : "Product created.");
    setForm(emptyForm);
    loadProducts();
  }

  async function handleDelete(id) {
    const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.message || "Unable to delete product.");
      return;
    }
    loadProducts();
  }

  async function handleFileUpload(event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setUploading(true);
    setMessage("");

    const payload = new FormData();
    payload.append("file", file);

    const response = await fetch("/api/uploads", {
      method: "POST",
      body: payload
    });
    const data = await response.json();
    setUploading(false);

    if (!response.ok) {
      setMessage(data.message || "Upload failed.");
      return;
    }

    setForm((current) => ({ ...current, image: data.url }));
  }

  function startEdit(product) {
    setForm({
      _id: product._id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      category: product.category,
      gender: product.gender,
      price: String(product.price),
      compareAtPrice: String(product.compareAtPrice || 0),
      stock: String(product.stock),
      sizes: (product.sizes || []).join(","),
      tags: (product.tags || []).join(","),
      image: product.images?.[0] || "",
      featured: Boolean(product.featured),
      trending: Boolean(product.trending)
    });
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <form onSubmit={handleSubmit} className="rounded-lg border border-white/10 bg-white/5 p-5">
        <div className="mb-5">
          <h1 className="text-2xl font-semibold">{isEditing ? "Edit product" : "Add product"}</h1>
          <p className="mt-2 text-sm text-white/60">Manage catalog, stock, and product media.</p>
        </div>
        <AdminField label="Name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} />
        <AdminField label="Slug" value={form.slug} onChange={(value) => setForm((current) => ({ ...current, slug: value }))} />
        <AdminField
          label="Description"
          multiline
          value={form.description}
          onChange={(value) => setForm((current) => ({ ...current, description: value }))}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminSelect label="Category" value={form.category} onChange={(value) => setForm((current) => ({ ...current, category: value }))} options={["Oversized", "Streetwear", "Men", "Women"]} />
          <AdminSelect label="Gender" value={form.gender} onChange={(value) => setForm((current) => ({ ...current, gender: value }))} options={["Unisex", "Men", "Women"]} />
          <AdminField label="Price" value={form.price} onChange={(value) => setForm((current) => ({ ...current, price: value }))} />
          <AdminField label="Compare price" value={form.compareAtPrice} onChange={(value) => setForm((current) => ({ ...current, compareAtPrice: value }))} />
          <AdminField label="Stock" value={form.stock} onChange={(value) => setForm((current) => ({ ...current, stock: value }))} />
        </div>
        <AdminField label="Sizes (comma separated)" value={form.sizes} onChange={(value) => setForm((current) => ({ ...current, sizes: value }))} />
        <AdminField label="Tags (comma separated)" value={form.tags} onChange={(value) => setForm((current) => ({ ...current, tags: value }))} />
        <AdminField label="Image URL" value={form.image} onChange={(value) => setForm((current) => ({ ...current, image: value }))} />
        <label className="mb-3 block text-sm text-white/70">
          Upload image
          <input type="file" accept="image/*" onChange={handleFileUpload} className="mt-2 block w-full text-sm" />
        </label>
        <div className="mb-4 flex gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) => setForm((current) => ({ ...current, featured: event.target.checked }))}
            />
            Featured
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.trending}
              onChange={(event) => setForm((current) => ({ ...current, trending: event.target.checked }))}
            />
            Trending
          </label>
        </div>
        {message ? <p className="mb-4 text-sm text-white/70">{message}</p> : null}
        <button type="submit" className="button-primary w-full">
          {uploading ? "Uploading..." : isEditing ? "Update product" : "Create product"}
        </button>
      </form>

      <div className="rounded-lg border border-white/10 bg-white/5 p-5">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold">Catalog</h2>
          <button type="button" onClick={() => setForm(emptyForm)} className="button-secondary !bg-transparent !text-white">
            New product
          </button>
        </div>
        <div className="space-y-3">
          {products.map((product) => (
            <div key={product._id} className="rounded-lg border border-white/10 px-4 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-semibold">{product.name}</div>
                  <div className="mt-1 text-sm text-white/60">
                    {product.category} • Stock {product.stock}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => startEdit(product)} className="button-secondary !min-h-[40px] !bg-transparent !px-4 !text-white">
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(product._id)} className="button-secondary !min-h-[40px] !bg-transparent !px-4 !text-white">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminField({ label, value, onChange, multiline = false }) {
  const shared = {
    value,
    onChange: (event) => onChange(event.target.value),
    className: "mt-2 w-full rounded-lg border border-white/10 bg-[var(--surface-alt)] px-3 py-3 text-[var(--text)]"
  };

  return (
    <label className="mb-4 block text-sm text-white/70">
      {label}
      {multiline ? <textarea {...shared} rows={4} /> : <input {...shared} />}
    </label>
  );
}

function AdminSelect({ label, value, onChange, options }) {
  return (
    <label className="mb-4 block text-sm text-white/70">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-white/10 bg-[var(--surface-alt)] px-3 py-3 text-[var(--text)]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
