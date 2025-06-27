export interface Producer {
  id: string;
  name: string;
  description: string;
  stationId: string;
  mapPosition: { x: number; y: number };
  blobPosition: { x: number; y: number };
  products?: Product[];
  picture?: {
    url: string;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  producerId: string;
  picture?: {
    url: string;
  };
}
