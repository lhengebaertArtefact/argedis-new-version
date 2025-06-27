"use client";

import { Producer } from "../../types";
import { useTranslation } from "react-i18next";

interface ProductPanelProps {
  producer: Producer;
}

export default function ProductPanel({ producer }: ProductPanelProps) {
  const { t } = useTranslation();

  const products = [
    { id: "1", name: "Produit 1", description: "Description du produit 1" },
    { id: "2", name: "Produit 2", description: "Description du produit 2" },
    { id: "3", name: "Produit 3", description: "Description du produit 3" },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <h3 className="font-semibold text-gray-800 mb-3">
          {t("producers.products")}
        </h3>

        {products.map((product) => (
          <div
            key={product.id}
            className="p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <h4 className="font-medium text-gray-800 mb-1">{product.name}</h4>
            <p className="text-sm text-gray-600">{product.description}</p>
          </div>
        ))}

        {products.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            {t("producers.noProducts")}
          </p>
        )}
      </div>
    </div>
  );
}
