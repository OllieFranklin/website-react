import React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import { Contract } from '../model/constants';
import {
  DEFAULT_RANDOM_CONTRACT_OPTIONS,
  randomContract,
  RandomContractOptions,
} from '../model/contract';
import { ContractCard } from './ContractCard';
import { ContractOptions } from './ContractOptions';

type CardData = {
  contract: Contract;
  showFront: boolean;
};

type BridgeProps = {};

const Bridge: React.FC<BridgeProps> = props => {
  const [contractOptions, setContractOptions] =
    React.useState<RandomContractOptions>(DEFAULT_RANDOM_CONTRACT_OPTIONS);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = React.useState(false);

  const randomCard = React.useCallback<() => CardData>(
    () => ({ contract: randomContract(contractOptions), showFront: true }),
    [contractOptions],
  );
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
        <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
          <IconButton
            color="default"
            onClick={() => setIsOptionsModalOpen(true)}
          >
            <SettingsIcon />
          </IconButton>
        </Stack>
        <ContractOptions
          isModalOpen={isOptionsModalOpen}
          handleCloseModal={() => setIsOptionsModalOpen(false)}
          options={contractOptions}
          setOptions={setContractOptions}
        />
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
