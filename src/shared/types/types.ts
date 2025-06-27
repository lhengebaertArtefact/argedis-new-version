export interface Product {
  id: string;
  picture: {
    url: string;
  };
}

export interface ProducerType {
  id: string;
  title1: string;
  title2: string;
  y: number;
  x: number;
  picture: {
    url: string;
  };
  miniMap: {
    url: string;
  };
  description: {
    json: any;
  };
  productsCollection: {
    limit: number;
    items: Product[];
  };
  hasSpace: boolean;
}

export interface Station {
  id: string;
  sys?: {
    id: string;
  };
  backgroundRadient?: string;
  primaryColor?: string;
  secondaryColor?: string;
  lottieMap?: any;
  producersCollection?: {
    limit: number;
    items: ProducerType[];
  };
}

export interface StationData {
  fr: Station;
  en: Station;
}
