export interface Producer {
  id: string;
  name: string;
  description: string | { json: any };
  stationId: string;
  mapPosition: { x: number; y: number };
  blobPosition: { x: number; y: number };
  products?: Product[];
  picture?: {
    url: string;
  };
  miniMap?: {
    url: string;
  };
  hasSpace?: boolean;
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
