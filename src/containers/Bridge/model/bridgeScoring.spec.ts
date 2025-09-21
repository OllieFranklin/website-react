import { expect, test } from '@jest/globals';
import { getTotal, scoreContract } from './bridgeScoring';
import {
  BOOK_TRICKS,
  Contract,
  CONTRACT_SUITS,
  ContractSuit,
  NUM_RANKS,
} from './constants';
import { contractToString } from './contract';

type ExpectedScores = {
  /**
   * Expected score when non-vulnerable
   */
  n: number;
  /**
   * Expected score when vulnerable
   */
  v: number;
  /**
   * Expected score when non-vulnerable and doubled
   */
  nd: number;
  /**
   * Expected score when vulnerable and doubled
   */
  vd: number;
  /**
   * Expected score when non-vulnerable and redoubled
   */
  nr: number;
  /**
   * Expected score when vulnerable and redoubled
   */
  vr: number;
};

type MakingScenario = {
  /**
   * Number of tricks in the contract
   */
  c: number;
  /**
   * Actual number of tricks made
   */
  a: number;
} & ExpectedScores;

type DownScenario = {
  /**
   * Number of tricks the contract went down by
   */
  d: number;
} & ExpectedScores;

function testContract(contract: Contract, expectedScore: number) {
  const scoreComponents = scoreContract(contract);
  const totalScore = getTotal(scoreComponents);
  if (totalScore !== expectedScore) {
    const vulString = contract.vulnerable ? 'Vul' : 'NV';
    console.info(`Contract: ${contractToString(contract)} (${vulString})`);
    console.info(`Score breakdown`, JSON.stringify(scoreComponents, null, 2));
  }
  expect(totalScore).toBe(expectedScore);
}

function testScenario(
  contractTricks: number,
  actualTricks: number,
  suit: ContractSuit,
  expectedScores: ExpectedScores,
) {
  const { n, v, nd, vd, nr, vr } = expectedScores;
  const baseContract = { contractTricks, actualTricks, suit };
  testContract({ ...baseContract, vulnerable: false }, n);
  testContract({ ...baseContract, vulnerable: true }, v);
  testContract({ ...baseContract, vulnerable: false, doubling: 'X' }, nd);
  testContract({ ...baseContract, vulnerable: true, doubling: 'X' }, vd);
  testContract({ ...baseContract, vulnerable: false, doubling: 'XX' }, nr);
  testContract({ ...baseContract, vulnerable: true, doubling: 'XX' }, vr);
}

const MINOR_MAKING_SCENARIOS: MakingScenario[] = [
  { c: 7, a: 7, n: 70, v: 70, nd: 140, vd: 140, nr: 230, vr: 230 },
  { c: 7, a: 8, n: 90, v: 90, nd: 240, vd: 340, nr: 430, vr: 630 },
  { c: 7, a: 9, n: 110, v: 110, nd: 340, vd: 540, nr: 630, vr: 1030 },
  { c: 7, a: 10, n: 130, v: 130, nd: 440, vd: 740, nr: 830, vr: 1430 },
  { c: 7, a: 11, n: 150, v: 150, nd: 540, vd: 940, nr: 1030, vr: 1830 },
  { c: 7, a: 12, n: 170, v: 170, nd: 640, vd: 1140, nr: 1230, vr: 2230 },
  { c: 7, a: 13, n: 190, v: 190, nd: 740, vd: 1340, nr: 1430, vr: 2630 },
  { c: 8, a: 8, n: 90, v: 90, nd: 180, vd: 180, nr: 560, vr: 760 },
  { c: 8, a: 9, n: 110, v: 110, nd: 280, vd: 380, nr: 760, vr: 1160 },
  { c: 8, a: 10, n: 130, v: 130, nd: 380, vd: 580, nr: 960, vr: 1560 },
  { c: 8, a: 11, n: 150, v: 150, nd: 480, vd: 780, nr: 1160, vr: 1960 },
  { c: 8, a: 12, n: 170, v: 170, nd: 580, vd: 980, nr: 1360, vr: 2360 },
  { c: 8, a: 13, n: 190, v: 190, nd: 680, vd: 1180, nr: 1560, vr: 2760 },
  { c: 9, a: 9, n: 110, v: 110, nd: 470, vd: 670, nr: 640, vr: 840 },
  { c: 9, a: 10, n: 130, v: 130, nd: 570, vd: 870, nr: 840, vr: 1240 },
  { c: 9, a: 11, n: 150, v: 150, nd: 670, vd: 1070, nr: 1040, vr: 1640 },
  { c: 9, a: 12, n: 170, v: 170, nd: 770, vd: 1270, nr: 1240, vr: 2040 },
  { c: 9, a: 13, n: 190, v: 190, nd: 870, vd: 1470, nr: 1440, vr: 2440 },
  { c: 10, a: 10, n: 130, v: 130, nd: 510, vd: 710, nr: 720, vr: 920 },
  { c: 10, a: 11, n: 150, v: 150, nd: 610, vd: 910, nr: 920, vr: 1320 },
  { c: 10, a: 12, n: 170, v: 170, nd: 710, vd: 1110, nr: 1120, vr: 1720 },
  { c: 10, a: 13, n: 190, v: 190, nd: 810, vd: 1310, nr: 1320, vr: 2120 },
  { c: 11, a: 11, n: 400, v: 600, nd: 550, vd: 750, nr: 800, vr: 1000 },
  { c: 11, a: 12, n: 420, v: 620, nd: 650, vd: 950, nr: 1000, vr: 1400 },
  { c: 11, a: 13, n: 440, v: 640, nd: 750, vd: 1150, nr: 1200, vr: 1800 },
  { c: 12, a: 12, n: 920, v: 1370, nd: 1090, vd: 1540, nr: 1380, vr: 1830 },
  { c: 12, a: 13, n: 940, v: 1390, nd: 1190, vd: 1740, nr: 1580, vr: 2230 },
  { c: 13, a: 13, n: 1440, v: 2140, nd: 1630, vd: 2330, nr: 1960, vr: 2660 },
];

const MAJOR_MAKING_SCENARIOS: MakingScenario[] = [
  { c: 7, a: 7, n: 80, v: 80, nd: 160, vd: 160, nr: 520, vr: 720 },
  { c: 7, a: 8, n: 110, v: 110, nd: 260, vd: 360, nr: 720, vr: 1120 },
  { c: 7, a: 9, n: 140, v: 140, nd: 360, vd: 560, nr: 920, vr: 1520 },
  { c: 7, a: 10, n: 170, v: 170, nd: 460, vd: 760, nr: 1120, vr: 1920 },
  { c: 7, a: 11, n: 200, v: 200, nd: 560, vd: 960, nr: 1320, vr: 2320 },
  { c: 7, a: 12, n: 230, v: 230, nd: 660, vd: 1160, nr: 1520, vr: 2720 },
  { c: 7, a: 13, n: 260, v: 260, nd: 760, vd: 1360, nr: 1720, vr: 3120 },
  { c: 8, a: 8, n: 110, v: 110, nd: 470, vd: 670, nr: 640, vr: 840 },
  { c: 8, a: 9, n: 140, v: 140, nd: 570, vd: 870, nr: 840, vr: 1240 },
  { c: 8, a: 10, n: 170, v: 170, nd: 670, vd: 1070, nr: 1040, vr: 1640 },
  { c: 8, a: 11, n: 200, v: 200, nd: 770, vd: 1270, nr: 1240, vr: 2040 },
  { c: 8, a: 12, n: 230, v: 230, nd: 870, vd: 1470, nr: 1440, vr: 2440 },
  { c: 8, a: 13, n: 260, v: 260, nd: 970, vd: 1670, nr: 1640, vr: 2840 },
  { c: 9, a: 9, n: 140, v: 140, nd: 530, vd: 730, nr: 760, vr: 960 },
  { c: 9, a: 10, n: 170, v: 170, nd: 630, vd: 930, nr: 960, vr: 1360 },
  { c: 9, a: 11, n: 200, v: 200, nd: 730, vd: 1130, nr: 1160, vr: 1760 },
  { c: 9, a: 12, n: 230, v: 230, nd: 830, vd: 1330, nr: 1360, vr: 2160 },
  { c: 9, a: 13, n: 260, v: 260, nd: 930, vd: 1530, nr: 1560, vr: 2560 },
  { c: 10, a: 10, n: 420, v: 620, nd: 590, vd: 790, nr: 880, vr: 1080 },
  { c: 10, a: 11, n: 450, v: 650, nd: 690, vd: 990, nr: 1080, vr: 1480 },
  { c: 10, a: 12, n: 480, v: 680, nd: 790, vd: 1190, nr: 1280, vr: 1880 },
  { c: 10, a: 13, n: 510, v: 710, nd: 890, vd: 1390, nr: 1480, vr: 2280 },
  { c: 11, a: 11, n: 450, v: 650, nd: 650, vd: 850, nr: 1000, vr: 1200 },
  { c: 11, a: 12, n: 480, v: 680, nd: 750, vd: 1050, nr: 1200, vr: 1600 },
  { c: 11, a: 13, n: 510, v: 710, nd: 850, vd: 1250, nr: 1400, vr: 2000 },
  { c: 12, a: 12, n: 980, v: 1430, nd: 1210, vd: 1660, nr: 1620, vr: 2070 },
  { c: 12, a: 13, n: 1010, v: 1460, nd: 1310, vd: 1860, nr: 1820, vr: 2470 },
  { c: 13, a: 13, n: 1510, v: 2210, nd: 1770, vd: 2470, nr: 2240, vr: 2940 },
];

const NT_MAKING_SCENARIOS: MakingScenario[] = [
  { c: 7, a: 7, n: 90, v: 90, nd: 180, vd: 180, nr: 560, vr: 760 },
  { c: 7, a: 8, n: 120, v: 120, nd: 280, vd: 380, nr: 760, vr: 1160 },
  { c: 7, a: 9, n: 150, v: 150, nd: 380, vd: 580, nr: 960, vr: 1560 },
  { c: 7, a: 10, n: 180, v: 180, nd: 480, vd: 780, nr: 1160, vr: 1960 },
  { c: 7, a: 11, n: 210, v: 210, nd: 580, vd: 980, nr: 1360, vr: 2360 },
  { c: 7, a: 12, n: 240, v: 240, nd: 680, vd: 1180, nr: 1560, vr: 2760 },
  { c: 7, a: 13, n: 270, v: 270, nd: 780, vd: 1380, nr: 1760, vr: 3160 },
  { c: 8, a: 8, n: 120, v: 120, nd: 490, vd: 690, nr: 680, vr: 880 },
  { c: 8, a: 9, n: 150, v: 150, nd: 590, vd: 890, nr: 880, vr: 1280 },
  { c: 8, a: 10, n: 180, v: 180, nd: 690, vd: 1090, nr: 1080, vr: 1680 },
  { c: 8, a: 11, n: 210, v: 210, nd: 790, vd: 1290, nr: 1280, vr: 2080 },
  { c: 8, a: 12, n: 240, v: 240, nd: 890, vd: 1490, nr: 1480, vr: 2480 },
  { c: 8, a: 13, n: 270, v: 270, nd: 990, vd: 1690, nr: 1680, vr: 2880 },
  { c: 9, a: 9, n: 400, v: 600, nd: 550, vd: 750, nr: 800, vr: 1000 },
  { c: 9, a: 10, n: 430, v: 630, nd: 650, vd: 950, nr: 1000, vr: 1400 },
  { c: 9, a: 11, n: 460, v: 660, nd: 750, vd: 1150, nr: 1200, vr: 1800 },
  { c: 9, a: 12, n: 490, v: 690, nd: 850, vd: 1350, nr: 1400, vr: 2200 },
  { c: 9, a: 13, n: 520, v: 720, nd: 950, vd: 1550, nr: 1600, vr: 2600 },
  { c: 10, a: 10, n: 430, v: 630, nd: 610, vd: 810, nr: 920, vr: 1120 },
  { c: 10, a: 11, n: 460, v: 660, nd: 710, vd: 1010, nr: 1120, vr: 1520 },
  { c: 10, a: 12, n: 490, v: 690, nd: 810, vd: 1210, nr: 1320, vr: 1920 },
  { c: 10, a: 13, n: 520, v: 720, nd: 910, vd: 1410, nr: 1520, vr: 2320 },
  { c: 11, a: 11, n: 460, v: 660, nd: 670, vd: 870, nr: 1040, vr: 1240 },
  { c: 11, a: 12, n: 490, v: 690, nd: 770, vd: 1070, nr: 1240, vr: 1640 },
  { c: 11, a: 13, n: 520, v: 720, nd: 870, vd: 1270, nr: 1440, vr: 2040 },
  { c: 12, a: 12, n: 990, v: 1440, nd: 1230, vd: 1680, nr: 1660, vr: 2110 },
  { c: 12, a: 13, n: 1020, v: 1470, nd: 1330, vd: 1880, nr: 1860, vr: 2510 },
  { c: 13, a: 13, n: 1520, v: 2220, nd: 1790, vd: 2490, nr: 2280, vr: 2980 },
];

const DOWN_SCENARIOS: DownScenario[] = [
  { d: 1, n: -50, v: -100, nd: -100, vd: -200, nr: -200, vr: -400 },
  { d: 2, n: -100, v: -200, nd: -300, vd: -500, nr: -600, vr: -1000 },
  { d: 3, n: -150, v: -300, nd: -500, vd: -800, nr: -1000, vr: -1600 },
  { d: 4, n: -200, v: -400, nd: -800, vd: -1100, nr: -1600, vr: -2200 },
  { d: 5, n: -250, v: -500, nd: -1100, vd: -1400, nr: -2200, vr: -2800 },
  { d: 6, n: -300, v: -600, nd: -1400, vd: -1700, nr: -2800, vr: -3400 },
  { d: 7, n: -350, v: -700, nd: -1700, vd: -2000, nr: -3400, vr: -4000 },
  { d: 8, n: -400, v: -800, nd: -2000, vd: -2300, nr: -4000, vr: -4600 },
  { d: 9, n: -450, v: -900, nd: -2300, vd: -2600, nr: -4600, vr: -5200 },
  { d: 10, n: -500, v: -1000, nd: -2600, vd: -2900, nr: -5200, vr: -5800 },
  { d: 11, n: -550, v: -1100, nd: -2900, vd: -3200, nr: -5800, vr: -6400 },
  { d: 12, n: -600, v: -1200, nd: -3200, vd: -3500, nr: -6400, vr: -7000 },
  { d: 13, n: -650, v: -1300, nd: -3500, vd: -3800, nr: -7000, vr: -7600 },
];

test('Scoring when the contract is made', () => {
  for (const scenario of MINOR_MAKING_SCENARIOS) {
    testScenario(scenario.c, scenario.a, 'C', scenario);
    testScenario(scenario.c, scenario.a, 'D', scenario);
  }
  for (const scenario of MAJOR_MAKING_SCENARIOS) {
    testScenario(scenario.c, scenario.a, 'H', scenario);
    testScenario(scenario.c, scenario.a, 'S', scenario);
  }
  for (const scenario of NT_MAKING_SCENARIOS) {
    testScenario(scenario.c, scenario.a, 'NT', scenario);
  }
});

test('Scoring when the contract goes down', () => {
  for (
    let contractTricks = BOOK_TRICKS + 1;
    contractTricks <= NUM_RANKS;
    contractTricks++
  ) {
    for (let actualTricks = 0; actualTricks < contractTricks; actualTricks++) {
      const amountDown = contractTricks - actualTricks;
      const scenario = DOWN_SCENARIOS[amountDown - 1];
      for (const suit of CONTRACT_SUITS) {
        testScenario(contractTricks, actualTricks, suit, scenario);
      }
    }
  }
});
