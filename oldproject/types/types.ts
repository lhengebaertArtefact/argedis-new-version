import { Dispatch, SetStateAction } from "react";

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
  backgroundRadient: string;
  primaryColor: string;
  secondaryColor: string;
  lottieMap: any;
  producersCollection: {
    limit: number;
    items: ProducerType[];
  };
}

export interface StationDataList {
  fr: Station[];
  en: Station[];
}

export interface StationData {
  fr: Station;
  en: Station;
}

export interface ProducerProps {
  producer: ProducerType;
  onNextSupplier: () => void;
  onPreviousSupplier: () => void;
  previousProducer: ProducerType;
  nextProducer: ProducerType;
  onError: () => void;
  imageError: boolean;
  currentLang: string;
  primaryColor: string;
  secondaryColor: string;
  length: number;
}

export interface PhotoProducerProps {
  producerPhoto?: string;
  classProducer?: string;
  colorBorder?: string;
  onError?: () => void;
}
