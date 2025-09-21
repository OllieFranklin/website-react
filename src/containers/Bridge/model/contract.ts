import random from 'random';
import {
  BOOK_TRICKS,
  Contract,
  CONTRACT_SUITS,
  ContractSuit,
  Doubling,
} from './constants';

function randDoubling(): Doubling | undefined {
  const randomNumber = Math.random();
  if (randomNumber < 0.01) {
    return 'XX';
  } else if (randomNumber < 0.1) {
    return 'X';
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function randomContract(): Contract {
  const contractTricks = random.int(7, 13);
  const actualNormal = random.normal(contractTricks, 1.0);
  const actualTricks = clamp(Math.round(actualNormal()), 0, 13);
  return {
    suit: CONTRACT_SUITS[random.int(0, CONTRACT_SUITS.length - 1)],
    contractTricks,
    actualTricks,
    doubling: randDoubling(),
    vulnerable: Math.random() < 0.5,
  };
}

function suitToString(suit: ContractSuit): string {
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

export function contractToString(contract: Contract): string {
  const tricks = contract.contractTricks - BOOK_TRICKS;
  const difference = contract.actualTricks - contract.contractTricks;
  const diffStr =
    difference === 0
      ? '='
      : `${difference < 0 ? '-' : '+'}${Math.abs(difference)}`;
  return `${tricks}${suitToString(contract.suit)}${
    contract.doubling ?? ''
  } ${diffStr}`;
}
