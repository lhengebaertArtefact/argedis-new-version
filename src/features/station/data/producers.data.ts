import { Producer } from "../types";

export const producers: Producer[] = [
  {
    id: "producer-1",
    name: "Ferme du Moulin",
    description:
      "Producteur de légumes bio depuis 3 générations. Spécialisé dans les pommes de terre, carottes et courgettes cultivées sans pesticides sur 15 hectares.",
    stationId: "station-1",
    mapPosition: { x: 300, y: 200 },
    blobPosition: { x: 150, y: 100 },
  },
  {
    id: "producer-2",
    name: "Boulangerie Artisanale",
    description:
      "Pain traditionnel au levain et viennoiseries faites maison. Utilisation exclusive de farines locales moulues sur meule de pierre.",
    stationId: "station-1",
    mapPosition: { x: 500, y: 350 },
    blobPosition: { x: 750, y: 200 },
  },
  {
    id: "producer-3",
    name: "Fromage de la Vallée",
    description:
      "Fabrication artisanale de fromages fermiers. Nos vaches pâturent librement dans les prairies de Picardie pour un goût authentique.",
    stationId: "station-1",
    mapPosition: { x: 400, y: 450 },
    blobPosition: { x: 850, y: 400 },
  },
];
