import { NextResponse } from "next/server";

export function ok(data, status = 200) {
  return NextResponse.json(data, { status });
}

export function fail(message, status = 400) {
  return NextResponse.json({ message }, { status });
}

export function serializeProduct(product) {
  return {
    ...product.toObject(),
    _id: product._id.toString()
  };
}
