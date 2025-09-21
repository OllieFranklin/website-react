import React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Contract } from '../model/constants';
import { randomContract } from '../model/contract';
import { ContractCard } from './ContractCard';

type CardData = {
  contract: Contract;
  showFront: boolean;
};

function randomCard(): CardData {
  return {
    contract: randomContract(),
    showFront: true,
  };
}

type BridgeProps = {};

const Bridge: React.FC<BridgeProps> = props => {
  const [card, setCard] = React.useState<CardData>(randomCard());

  return (
    <Stack
      sx={{
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack direction="column" sx={{ gap: 1 }}>
        <ContractCard
          key={`${JSON.stringify(card.contract)}`}
          contract={card.contract}
          showFront={card.showFront}
          handleFlip={() => setCard(c => ({ ...c, showFront: !c.showFront }))}
        />
        <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
          <IconButton color="default" onClick={() => setCard(randomCard())}>
            <RefreshIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export { Bridge };
