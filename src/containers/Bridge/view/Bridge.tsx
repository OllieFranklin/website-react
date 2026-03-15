import React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
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

  const [cardHistory, setCardHistory] = React.useState([randomCard()]);
  const [cardIndex, setCardIndex] = React.useState(0);
  const card = cardHistory.at(cardIndex) ?? cardHistory[cardIndex - 1];

  const nextCard = React.useCallback(() => {
    setCardIndex(currentIndex => {
      if (currentIndex < cardHistory.length - 1) {
        return currentIndex + 1;
      }

      setCardHistory(history => [...history, randomCard()]);
      return currentIndex + 1;
    });
  }, [cardHistory.length, randomCard, setCardIndex, setCardHistory]);

  const prevCard = React.useCallback(() => {
    setCardIndex(currentIndex => Math.max(currentIndex - 1, 0));
  }, [setCardIndex]);

  const handleFlip = React.useCallback(() => {
    setCardHistory(hist => {
      const newCardHistory = [...hist];
      const newCard: CardData = { ...card, showFront: !card.showFront };
      newCardHistory.splice(cardIndex, 1, newCard);
      return newCardHistory;
    });
  }, [card, setCardHistory]);

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
          handleFlip={handleFlip}
        />
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="default"
            onClick={() => prevCard()}
            disabled={cardIndex === 0}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton color="default" onClick={() => nextCard()}>
            <NavigateNextIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export { Bridge };
