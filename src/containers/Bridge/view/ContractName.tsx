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
      <Box component="span">{beforeSuit}</Box>
      <Box
        component="span"
        sx={({ palette }) => ({
          display: 'inline',
          color: isRed(contract.suit) ? palette.error.dark : undefined,
          fontFamily:
            contract.suit !== 'NT' ? '"Noto Sans Symbols 2"' : undefined,
        })}
      >
        {suit}
      </Box>
      <Box component="span">{afterSuit}</Box>
    </Typography>
  );
};

export { ContractName };
