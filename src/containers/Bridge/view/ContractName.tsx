import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Variant } from '@mui/material/styles/createTypography';
import {
  BOOK_TRICKS,
  isRed,
  type Contract as ContractType,
} from '../model/constants';
import { resultString, suitToString } from '../model/contract';

type ContractNameProps = {
  typographyVariant: Variant;
  contract: ContractType;
};
const ContractName: React.FC<ContractNameProps> = props => {
  const { typographyVariant, contract } = props;

  const [beforeSuit, suit, afterSuit] = React.useMemo(() => {
    return [
      `${contract.contractTricks - BOOK_TRICKS}`,
      suitToString(contract.suit),
      `${contract.doubling ?? ''} ${resultString(contract)}`,
    ];
  }, [contract]);

  return (
    <Typography variant={typographyVariant}>
      {beforeSuit}
      <Box
        sx={({ palette }) => ({
          display: 'inline',
          color: isRed(contract.suit) ? palette.error.dark : undefined,
          fontSize: contract.suit !== 'NT' ? '120%' : undefined,
        })}
      >
        {suit}
      </Box>
      {afterSuit}
    </Typography>
  );
};

export { ContractName };
