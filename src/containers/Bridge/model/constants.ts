type MajorSuit = 'H' | 'S';
type MinorSuit = 'C' | 'D';
type NoTrump = 'NT';
export type ContractSuit = MajorSuit | MinorSuit | NoTrump;
export type Doubling = 'X' | 'XX';

export const CONTRACT_SUITS: ContractSuit[] = ['C', 'D', 'H', 'S', 'NT'];
export const NUM_RANKS = 13;
export const BOOK_TRICKS = 6;

export function isRed(suit: ContractSuit): suit is 'D' | 'H' {
  return suit === 'D' || suit === 'H';
}

export type Contract = {
  vulnerable: boolean;
  contractTricks: number;
  actualTricks: number;
  suit: ContractSuit;
  doubling?: Doubling;
};

export type BaseTrickScore = {
  firstTrickScore?: number;
  otherTricksScore?: number;
  numOtherTricks?: number;
  multiplier?: number;
};

export type OvertrickScore = {
  trickScore?: number;
  numOvertricks?: number;
};

export type BonusScore = {
  bonusScore: number;
  description: string;
};

export type UndertrickScore = {
  undertrick1Score: number;
  undertrick2And3Score: number;
  undertrick4PlusScore: number;
  numUndertricks: number;
};

export type ScoreComponents = {
  baseTricks?: BaseTrickScore;
  overtricks?: OvertrickScore;
  bonus?: BonusScore;
  undertricks?: UndertrickScore;
  insultScore?: number;
};
