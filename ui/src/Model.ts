export interface UserProfile {
  id: string;
  name?: string;
  email: string;
  image?: string;
  language: string;
  currencyCode: string;

  positions: Position[];
  wishlist: string[];
}

export type CardCondition = "VERY_GOOD" | "GOOD" | "BAD" | "SHITTY";

export interface Position {
  cardId: string;
  units: number;
  condition: CardCondition;
}

export interface Card {
  id: string;
  serialNumber: string;
  edition: string;
  image ?: string;
  screen ?: string;
  name: string;
  price: Money;
}

export interface Money {
  quantity: number;
  currencyCode: string;
}

export interface NewsItem {
  title : string;
  content : string;
  url :string;
  id : string;
}