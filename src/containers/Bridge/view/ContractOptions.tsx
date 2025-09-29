import React from 'react';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Modal from '@mui/material/Modal';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { RandomContractOptions } from '../model/contract';
import { ContractOutcomeGraph } from './ContractOutcomeGraph';

type VulnerabilityState = 'all' | 'none' | 'random';

function vulStateToPercent(state: VulnerabilityState): number {
  switch (state) {
    case 'none':
      return 0;
    case 'all':
      return 100;
    default:
      return 50;
  }
}

function vulPercentToState(percent: number): VulnerabilityState {
  switch (percent) {
    case 0:
      return 'none';
    case 100:
      return 'all';
    default:
      return 'random';
  }
}

type ContractOptionsProps = {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  options: RandomContractOptions;
  setOptions: (options: RandomContractOptions) => void;
};
const ContractOptions: React.FC<ContractOptionsProps> = props => {
  const { isModalOpen, handleCloseModal, options, setOptions } = props;

  const vulnerabilityState = React.useMemo<VulnerabilityState>(
    () => vulPercentToState(options.percentVulnerable),
    [options.percentVulnerable],
  );

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <Stack
        sx={theme => ({
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
          width: '38rem',
          height: 'min-content',
          maxWidth: `calc(100% - 2 * ${theme.spacing(2)})`,
          maxHeight: `calc(100% - 2 * ${theme.spacing(2)})`,
          gap: 2,
          overflowY: 'auto',
        })}
      >
        <Stack>
          <FormLabel id="contract-options-vulnerability">
            Vulnerability
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="contract-options-vulnerability"
            value={vulnerabilityState}
            onChange={(_, vul) => {
              setOptions({
                ...options,
                percentVulnerable: vulStateToPercent(vul as VulnerabilityState),
              });
            }}
          >
            <FormControlLabel
              value="random"
              control={<Radio />}
              label="Random"
            />
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="Always vulnerable"
            />
            <FormControlLabel
              value="none"
              control={<Radio />}
              label="Never vulnerable"
            />
          </RadioGroup>
        </Stack>

        <Stack>
          <FormLabel id="contract-options-doubling">
            Chance of being doubled
          </FormLabel>
          <Slider
            id="contract-options-doubling"
            sx={{ maxWidth: '24rem' }}
            track={false}
            value={[
              options.percentRedoubled,
              options.percentRedoubled + options.percentDoubled,
            ]}
            onChange={(_, value) => {
              if (Array.isArray(value)) {
                setOptions({
                  ...options,
                  percentRedoubled: value[0],
                  percentDoubled: value[1] - value[0],
                });
              }
            }}
            valueLabelDisplay="auto"
            valueLabelFormat={(_, index) => {
              const { percentRedoubled, percentDoubled } = options;
              const value = index === 0 ? percentRedoubled : percentDoubled;
              const doubling = index === 0 ? 'XX' : 'X';
              return `${value}% ${doubling}`;
            }}
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, auto)',
              maxWidth: '20rem',
            }}
          >
            <Typography>Redoubled (XX)</Typography>
            <Typography>{`${options.percentRedoubled}% chance`}</Typography>
            <Typography>Doubled (X)</Typography>
            <Typography>{`${options.percentDoubled}% chance`}</Typography>
            <Typography>Not doubled</Typography>
            <Typography>{`${
              100 - options.percentRedoubled - options.percentDoubled
            }% chance`}</Typography>
          </Box>
        </Stack>

        <Stack>
          <FormLabel>Chance of outcomes</FormLabel>

          <Stack sx={{ flex: 1 }}>
            <FormLabel id="contract-options-percent-making">
              <Typography variant="caption">Chance to make contract</Typography>
            </FormLabel>
            <Slider
              id="contract-options-percent-making"
              value={options.percentMaking}
              onChange={(_, value) => {
                if (typeof value === 'number') {
                  setOptions({ ...options, percentMaking: value });
                }
              }}
              valueLabelDisplay="auto"
              valueLabelFormat={value => `${value}%`}
            />
            <FormLabel id="contract-options-making-std">
              <Typography variant="caption">
                Standard deviation when making
              </Typography>
            </FormLabel>
            <Slider
              id="contract-options-making-std"
              value={options.makingStd}
              min={0}
              max={10}
              step={0.5}
              onChange={(_, value) => {
                if (typeof value === 'number') {
                  setOptions({ ...options, makingStd: value });
                }
              }}
              valueLabelDisplay="auto"
            />
            <FormLabel id="contract-options-down-std">
              <Typography variant="caption">
                Standard deviation when down
              </Typography>
            </FormLabel>
            <Slider
              id="contract-options-down-std"
              value={options.downStd}
              min={0}
              max={10}
              step={0.5}
              onChange={(_, value) => {
                if (typeof value === 'number') {
                  setOptions({ ...options, downStd: value });
                }
              }}
              valueLabelDisplay="auto"
            />
          </Stack>

          <Box sx={{ flex: 1, width: '100%', height: '100%' }}>
            <ContractOutcomeGraph options={options} />
          </Box>
        </Stack>
      </Stack>
    </Modal>
  );
};

export { ContractOptions };
