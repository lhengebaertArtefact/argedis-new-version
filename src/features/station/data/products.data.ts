import { Product } from "../types";

export const products: Product[] = [
  // Produits de la Ferme du Moulin
  {
    id: "product-1",
    name: "Pommes de terre Amandine",
    description: "Kg - Chair ferme, parfaites pour les gratins",
    producerId: "producer-1",
  },
  {
    id: "product-2",
    name: "Carottes nouvelles",
    description: "Botte - Croquantes et sucrées",
    producerId: "producer-1",
  },
  {
    id: "product-3",
    name: "Courgettes bio",
    description: "Kg - Fraîchement récoltées",
    producerId: "producer-1",
  },

  // Produits de la Boulangerie Artisanale
  {
    id: "product-4",
    name: "Pain de campagne",
    description: "Au levain naturel - 800g",
    producerId: "producer-2",
  },
  {
    id: "product-5",
    name: "Croissants pur beurre",
    description: "Lot de 6 - Faits maison",
    producerId: "producer-2",
  },
  {
    id: "product-6",
    name: "Brioche artisanale",
    description: "400g - Recette traditionnelle",
    producerId: "producer-2",
  },

  // Produits du Fromage de la Vallée
  {
    id: "product-7",
    name: "Maroilles fermier",
    description: "200g - Affiné 6 semaines",
    producerId: "producer-3",
  },
  {
    id: "product-8",
    name: "Brie de Picardie",
    description: "250g - Crémeux à souhait",
    producerId: "producer-3",
  },
  {
    id: "product-9",
    name: "Yaourt fermier",
    description: "Pot de 125g - Nature ou vanille",
    producerId: "producer-3",
  },
];
