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
  percentVulnerable: number;
  percentMaking: number;
  makingStd: number;
  downStd: number;
};

export const DEFAULT_RANDOM_CONTRACT_OPTIONS: RandomContractOptions = {
  percentDoubled: 10,
  percentRedoubled: 1,
  percentVulnerable: 50,
  percentMaking: 80,
  makingStd: 3.5,
  downStd: 3.5,
};

function randomDoubling(
  options: Pick<RandomContractOptions, 'percentDoubled' | 'percentRedoubled'>,
): Doubling | undefined {
  const { percentRedoubled, percentDoubled } = options;
  const randomPercent = random.int(1, 100);
  if (randomPercent <= percentRedoubled) {
    return 'XX';
  } else if (randomPercent <= percentRedoubled + percentDoubled) {
    return 'X';
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function randomActualTricks(
  contractTricks: number,
  options: Pick<
    RandomContractOptions,
    'makingStd' | 'downStd' | 'percentMaking'
  >,
) {
  const { makingStd, downStd, percentMaking } = options;
  const isMaking = random.int(1, 100) <= percentMaking;
  const std = isMaking ? makingStd : downStd;
  const base = Math.max(Math.abs(random.normal(0, std)()), isMaking ? 0 : 1);
  const actual = contractTricks + (isMaking ? 1 : -1) * base;
  return clamp(Math.round(actual), 0, 13);
}

export function randomContract(
  options = DEFAULT_RANDOM_CONTRACT_OPTIONS,
): Contract {
  const contractTricks = random.int(7, 13);
  return {
    suit: CONTRACT_SUITS[random.int(0, CONTRACT_SUITS.length - 1)],
    contractTricks,
    actualTricks: randomActualTricks(contractTricks, options),
    doubling: randomDoubling(options),
    vulnerable: random.int(1, 100) < options.percentVulnerable,
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
