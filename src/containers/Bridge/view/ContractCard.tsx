import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { BaseTrickScore, Contract } from '../model/constants';
import {
  getBaseTrickTotal,
  getTotal,
  scoreContract,
} from '../model/bridgeScoring';
import { FlipCard } from './FlipCard';
import { ContractName } from './ContractName';

type CardHeaderProps = { heading: string; children?: React.ReactNode };
const CardHeader: React.FC<CardHeaderProps> = props => {
  const { heading, children } = props;
  return (
    <Stack
      direction="row"
      sx={{ justifyContent: 'space-between', width: '100%' }}
    >
      <Typography variant="h5">{heading}</Typography>
      {children}
    </Stack>
  );
};

type CardBodyProps = { children?: React.ReactNode };
const CardBody: React.FC<CardBodyProps> = props => {
  const { children } = props;
  return (
    <Stack
      direction="column"
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Stack>
  );
};

function baseTrickScoreToString(
  baseTricks: BaseTrickScore,
): string | undefined {
  const { firstTrickScore, otherTricksScore, numOtherTricks, multiplier } =
    baseTricks;
  const firstTrickDifferent = firstTrickScore !== otherTricksScore;
  const terms: string[] = [];
  if (firstTrickDifferent && firstTrickScore) {
    terms.push(`1 × ${firstTrickScore}`);
  }

  const numTricks = firstTrickDifferent
    ? numOtherTricks
    : (numOtherTricks ?? 0) + 1;
  if (numTricks) {
    terms.push(`${numTricks} × ${otherTricksScore}`);
  }

  let string = terms.join(' + ');
  if (string && multiplier && multiplier > 1) {
    string = `(${string}) × ${multiplier}`;
  }
  return string || undefined;
}

type ContractCardProps = {
  contract: Contract;
  showFront: boolean;
  handleFlip: () => void;
};

type ScoreComponentRow = {
  heading: string;
  data?: string;
  total: number;
};

const ContractCard: React.FC<ContractCardProps> = props => {
  const { contract, showFront, handleFlip } = props;

  const [totalScore, scoreRows] = React.useMemo<
    [number, ScoreComponentRow[]]
  >(() => {
    const scoreComponents = scoreContract(contract);
    const totalScore = getTotal(scoreComponents);
    const scoreRows: ScoreComponentRow[] = [];

    if (scoreComponents.baseTricks) {
      const data = baseTrickScoreToString(scoreComponents.baseTricks);
      const total = getBaseTrickTotal(scoreComponents.baseTricks);
      if (total > 0 && data) {
        scoreRows.push({ heading: 'Trick score', data, total });
      }
    }
    if (scoreComponents.overtricks) {
      const { numOvertricks, trickScore } = scoreComponents.overtricks;
      if (numOvertricks && trickScore) {
        const data = `${numOvertricks} × ${trickScore}`;
        const total = numOvertricks * trickScore;
        scoreRows.push({ heading: 'Overtricks', data, total });
      }
    }
    if (scoreComponents.bonus) {
      const { bonusScore, description } = scoreComponents.bonus;
      scoreRows.push({
        heading: 'Bonus',
        data: description,
        total: bonusScore,
      });
    }
    if (scoreComponents.insultScore) {
      scoreRows.push({ heading: 'Insult', total: scoreComponents.insultScore });
    }

    return [totalScore, scoreRows];
  }, [contract]);

  return (
    <FlipCard
      showFront={showFront}
      handleFlip={handleFlip}
      frontElement={() => (
        <>
          <CardHeader heading="Contract" />
          <CardBody>
            <Stack direction="column" sx={{ alignItems: 'flex-end' }}>
              <ContractName typographyVariant="h1" contract={contract} />
              <Chip
                sx={{ width: 'min-content' }}
                label={contract.vulnerable ? 'Vulnerable' : 'Non-vulnerable'}
                color={contract.vulnerable ? 'error' : 'primary'}
              />
            </Stack>
          </CardBody>
        </>
      )}
      backElement={() => (
        <>
          <CardHeader heading="Score">
            <Stack
              direction="row"
              sx={{ height: '100%', gap: 1, alignItems: 'center' }}
            >
              <ContractName typographyVariant="body1" contract={contract} />
              <Chip
                size="small"
                label={contract.vulnerable ? 'Vul' : 'Non-vul'}
                color={contract.vulnerable ? 'error' : 'primary'}
              />
            </Stack>
          </CardHeader>
          <CardBody>
            <Typography variant="h1">{totalScore}</Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, auto)',
                rowGap: 1,
                columnGap: 4,
              }}
            >
              {scoreRows.map(row => (
                <React.Fragment key={`${row.heading}_${row.data}_${row.total}`}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600 }}
                    textAlign="left"
                  >
                    {row.heading}
                  </Typography>
                  <Typography variant="body1" textAlign="left">
                    {row.data}
                  </Typography>
                  <Typography variant="body1" textAlign="right">
                    {row.total}
                  </Typography>
                </React.Fragment>
              ))}
            </Box>
          </CardBody>
        </>
      )}
    />
  );
};

export { ContractCard };
