import React from 'react';
import Box from '@mui/material/Box';
import { theme } from '../../../constants';
import { RandomContractOptions } from '../model/contract';

function normalPdf(x: number, mean: number, std: number) {
  const variance = std * std;
  const denom = Math.sqrt(2 * Math.PI * variance);
  const num = Math.exp(-(Math.pow(x - mean, 2) / (2 * variance)));
  return num / denom;
}

function renderGraph(
  ctx: CanvasRenderingContext2D,
  options: RandomContractOptions,
) {
  const { downStd, makingStd, percentMaking } = options;
  const { canvas } = ctx;
  const { width, height } = canvas;

  ctx.clearRect(0, 0, width, height);

  const maxUndertricks = 13;
  const maxOvertricks = 6;
  const numOutcomes = maxUndertricks + 1 + maxOvertricks;

  const padding = 10;
  const numGraphPx = width - padding * 2;

  const xs = Array.from(
    { length: numGraphPx },
    (_, i) => (i * numOutcomes) / numGraphPx,
  );

  const scaleMaking = percentMaking / 100;
  const scaleDown = 1 - scaleMaking;
  const pdfValues = xs.map(x => {
    if (x >= maxUndertricks) {
      return scaleMaking * normalPdf(x - maxUndertricks, 0, makingStd);
    } else {
      return scaleDown * normalPdf(maxUndertricks - x, 0, downStd);
    }
  });

  const maxPdf = pdfValues.reduce((a, b) => Math.max(a, b), 0);
  const yAxis = height - Math.min(20, Math.floor(0.1 * height));
  const yScale = yAxis / maxPdf;

  ctx.beginPath();
  ctx.moveTo(padding, yAxis);

  xs.forEach((x, idx) => {
    const py = yAxis - pdfValues[idx] * yScale;
    ctx.lineTo(idx + padding, py);
  });

  ctx.lineTo(width - padding, yAxis);
  ctx.closePath();
  ctx.fillStyle = theme.palette.primary.main;
  ctx.fill();

  const notchGap = (width - 2 * padding) / numOutcomes;
  const markerX = padding + maxUndertricks * notchGap;
  ctx.strokeStyle = theme.palette.text.primary;
  ctx.beginPath();
  ctx.moveTo(markerX, 0);
  ctx.lineTo(markerX, yAxis);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, yAxis);
  ctx.lineTo(width, yAxis);
  ctx.stroke();

  const notchHeight = 6;
  for (let i = 0; i < numOutcomes; i++) {
    let x = padding + i * notchGap;
    let top = yAxis - notchHeight / 2;
    ctx.beginPath();
    ctx.moveTo(x, top);
    ctx.lineTo(x, top + notchHeight);
    ctx.stroke();

    if (i % 2 === 0) {
      const relative = i - maxUndertricks;
      const text =
        relative === 0 ? '=' : relative > 0 ? `+${relative}` : `${relative}`;
      ctx.fillStyle = theme.palette.text.primary;
      const fontSize = 10;
      ctx.font = `500 ${fontSize}px sans-serif`;
      const { width } = ctx.measureText(text);
      ctx.fillText(text, x - width / 2, yAxis + fontSize + notchHeight / 2);
    }
  }
}

type ContractOutcomeGraphProps = {
  options: RandomContractOptions;
};
const ContractOutcomeGraph: React.FC<ContractOutcomeGraphProps> = props => {
  const { options } = props;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useLayoutEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(() => {
        const canvas = canvasRef.current;
        if (canvas && containerRef.current) {
          canvas.height = containerRef.current.offsetHeight;
          canvas.width = containerRef.current.offsetWidth;
        }
      });
    };
    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  React.useLayoutEffect(() => {
    let handle = requestAnimationFrame(() => render());

    const render = () => {
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx) {
        renderGraph(ctx, options);
      }
      handle = requestAnimationFrame(() => render());
    };

    return () => cancelAnimationFrame(handle);
  }, [options]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        display: 'flex',
        maxHeight: '16rem',
      }}
    >
      <canvas ref={canvasRef} style={{ flex: 1 }} />
    </Box>
  );
};

export { ContractOutcomeGraph };
