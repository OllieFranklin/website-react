import random from 'random';
import {
  BOOK_TRICKS,
  Contract,
  CONTRACT_SUITS,
  ContractSuit,
  Doubling,
} from './constants';

export type RandomContractOptions = {
  percentDoubled: number;
  percentRedoubled: number;
  makingStd: number;
  percentVulnerable: number;
};

export const DEFAULT_RANDOM_CONTRACT_OPTIONS: RandomContractOptions = {
  percentDoubled: 10,
  percentRedoubled: 1,
  makingStd: 1,
  percentVulnerable: 50,
};

function randomDoubling(
  options: Pick<RandomContractOptions, 'percentDoubled' | 'percentRedoubled'>,
): Doubling | undefined {
  const randomPercent = Math.random() * 100;
  if (randomPercent < options.percentRedoubled) {
    return 'XX';
  } else if (randomPercent < options.percentDoubled) {
    return 'X';
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function randomContract(
  options = DEFAULT_RANDOM_CONTRACT_OPTIONS,
): Contract {
  const contractTricks = random.int(7, 13);
  const actualNormal = random.normal(contractTricks, options.makingStd);
  const actualTricks = clamp(Math.round(actualNormal()), 0, 13);
  return {
    suit: CONTRACT_SUITS[random.int(0, CONTRACT_SUITS.length - 1)],
    contractTricks,
    actualTricks,
    doubling: randomDoubling(options),
    vulnerable: Math.random() * 100 < options.percentVulnerable,
  };
}

export function suitToString(suit: ContractSuit): string {
  switch (suit) {
    case 'C':
      return '♣';
    case 'D':
      return '♦';
    case 'H':
      return '♥';
    case 'S':
      return '♠';
    case 'NT':
      return 'NT';
  }
}

export function resultString(contract: Contract): string {
  const difference = contract.actualTricks - contract.contractTricks;
  if (difference === 0) {
    return '=';
  }
  return `${difference < 0 ? '-' : '+'}${Math.abs(difference)}`;
}

export function contractToString(contract: Contract): string {
  const tricks = contract.contractTricks - BOOK_TRICKS;
  const result = resultString(contract);
  return `${tricks}${suitToString(contract.suit)}${
    contract.doubling ?? ''
  } ${result}`;
}
