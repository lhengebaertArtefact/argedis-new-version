"use client";

import { Producer } from "../../types";
import { products } from "../../data/products.data";

interface ProductPanelProps {
  producer: Producer;
  producers: Producer[];
  onProducerChange: (producer: Producer) => void;
}

export default function ProductPanel({
  producer,
  producers,
  onProducerChange,
}: ProductPanelProps) {
  const producerProducts = products.filter(
    (pro) => pro.producerId === producer.id
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <h3 className="font-semibold text-gray-800 mb-3">Nos produits :</h3>

        {producerProducts.slice(0, 3).map((product) => (
          <div
            key={product.id}
            className="p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <h4 className="font-medium text-gray-800 mb-1">{product.name}</h4>
            <p className="text-sm text-gray-600">{product.description}</p>
          </div>
        ))}

        {producerProducts.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            Aucun produit disponible
          </p>
        )}
      </div>
    </div>
  );
}
