import {
  BaseTrickScore,
  BonusScore,
  BOOK_TRICKS,
  Contract,
  ContractSuit,
  Doubling,
  OvertrickScore,
  ScoreComponents,
  UndertrickScore,
} from './constants';

const GRAND_TRICKS = 13;
const SLAM_TRICKS = 12;
const GAME_BONUS_MIN_SCORE = 100;

const TRICK_SCORE_MAP: { [K in ContractSuit]: BaseTrickScore } = {
  C: { firstTrickScore: 20, otherTricksScore: 20 },
  D: { firstTrickScore: 20, otherTricksScore: 20 },
  H: { firstTrickScore: 30, otherTricksScore: 30 },
  S: { firstTrickScore: 30, otherTricksScore: 30 },
  NT: { firstTrickScore: 40, otherTricksScore: 30 },
};
const INSULT_MAP: { [K in Doubling]: number } = {
  X: 50,
  XX: 100,
};
const DOUBLING_MULTIPLIER_MAP: { [K in Doubling]: number } = {
  X: 2,
  XX: 4,
};

type UndertrickValues = { first: number; secondThird: number; fourth: number };
const UNDERTRICK_MAP: {
  [K in `${boolean}_${Doubling | undefined}`]: UndertrickValues;
} = {
  false_undefined: { first: -50, secondThird: -50, fourth: -50 },
  true_undefined: { first: -100, secondThird: -100, fourth: -100 },
  false_X: { first: -100, secondThird: -200, fourth: -300 },
  true_X: { first: -200, secondThird: -300, fourth: -300 },
  false_XX: { first: -200, secondThird: -400, fourth: -600 },
  true_XX: { first: -400, secondThird: -600, fourth: -600 },
};

/**
 * Assumes that the contract has been made
 */
function getBaseTrickScore({
  suit,
  contractTricks,
  doubling,
}: Contract): BaseTrickScore {
  return {
    ...TRICK_SCORE_MAP[suit],
    numOtherTricks: contractTricks - BOOK_TRICKS - 1,
    multiplier: doubling ? DOUBLING_MULTIPLIER_MAP[doubling] : undefined,
  };
}

function getOvertrickScore({
  suit,
  contractTricks,
  doubling,
  vulnerable,
  actualTricks,
}: Contract): OvertrickScore | undefined {
  const numOvertricks = actualTricks - contractTricks;
  if (numOvertricks <= 0) {
    return;
  }
  if (doubling === 'X') {
    return { numOvertricks, trickScore: vulnerable ? 200 : 100 };
  } else if (doubling === 'XX') {
    return { numOvertricks, trickScore: vulnerable ? 400 : 200 };
  }
  return { numOvertricks, trickScore: TRICK_SCORE_MAP[suit].otherTricksScore };
}

/**
 * Assumes that the contract has been made
 */
function getBonusScore(
  { contractTricks, vulnerable }: Contract,
  baseTrickScore?: BaseTrickScore,
): BonusScore | undefined {
  if (contractTricks === GRAND_TRICKS) {
    return {
      bonusScore: vulnerable ? 2000 : 1300,
      description: 'Grand slam',
    };
  } else if (contractTricks === SLAM_TRICKS) {
    return {
      bonusScore: vulnerable ? 1250 : 800,
      description: 'Small slam',
    };
  } else if (getBaseTrickTotal(baseTrickScore) >= GAME_BONUS_MIN_SCORE) {
    return { bonusScore: vulnerable ? 500 : 300, description: 'Game' };
  } else if (contractTricks > BOOK_TRICKS) {
    return { bonusScore: 50, description: 'Part-score' };
  }
}

export function getBaseTrickTotal(baseTricks?: BaseTrickScore): number {
  let total = 0;
  total += baseTricks?.firstTrickScore ?? 0;
  total +=
    (baseTricks?.numOtherTricks ?? 0) * (baseTricks?.otherTricksScore ?? 0);
  total *= baseTricks?.multiplier ?? 1;
  return total;
}

export function getUndertrickTotal(undertricks?: UndertrickScore): number {
  let total = 0;
  if (!undertricks) {
    return total;
  }
  const { numUndertricks } = undertricks;
  if (numUndertricks > 0) {
    total += undertricks.undertrick1Score;
  }
  if (numUndertricks > 1) {
    total += (numUndertricks > 2 ? 2 : 1) * undertricks.undertrick2And3Score;
  }
  if (numUndertricks > 3) {
    total += (numUndertricks - 3) * undertricks.undertrick4PlusScore;
  }
  return total;
}

export function getTotal(scoreComponents: ScoreComponents): number {
  let total = 0;

  total += getBaseTrickTotal(scoreComponents.baseTricks);

  const { overtricks } = scoreComponents;
  total += (overtricks?.trickScore ?? 0) * (overtricks?.numOvertricks ?? 0);

  total += scoreComponents.bonus?.bonusScore ?? 0;
  total += scoreComponents.insultScore ?? 0;
  total += getUndertrickTotal(scoreComponents.undertricks);

  return total;
}

function scoreMakingContract(contract: Contract): ScoreComponents {
  const baseTricks = getBaseTrickScore(contract);
  return {
    baseTricks,
    overtricks: getOvertrickScore(contract),
    bonus: getBonusScore(contract, baseTricks),
    insultScore: contract.doubling ? INSULT_MAP[contract.doubling] : undefined,
  };
}

function getUndertrickScore(contract: Contract): UndertrickScore {
  const { first, secondThird, fourth } =
    UNDERTRICK_MAP[`${contract.vulnerable}_${contract.doubling}`];
  return {
    undertrick1Score: first,
    undertrick2And3Score: secondThird,
    undertrick4PlusScore: fourth,
    numUndertricks: contract.contractTricks - contract.actualTricks,
  };
}

function scoreDownContract(contract: Contract): ScoreComponents {
  return {
    undertricks: getUndertrickScore(contract),
  };
}

export function scoreContract(contract: Contract): ScoreComponents {
  if (contract.actualTricks >= contract.contractTricks) {
    return scoreMakingContract(contract);
  } else {
    return scoreDownContract(contract);
  }
}
