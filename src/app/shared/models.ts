export interface Kangaroo {
  kanga1Start?: number;
  kanga1Speed?: number;
  kanga2Start?: number;
  kanga2Speed?: number;
}

export interface Test {
  id?: number;
  date: Date;
  field: number[];
  result: string;
  jumps: number;
}
