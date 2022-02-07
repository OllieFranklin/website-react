import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

type VideoPlayerProps = React.DetailedHTMLProps<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
>;

//ffmpeg -i video.mp4 -c copy -an video2.mp4

export default function VideoPlayer(props: VideoPlayerProps) {
  const { src, autoPlay, style = {}, ...rest } = props;

  const { width = 'unset', height = 'unset' } = style;

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = React.useState(!autoPlay);

  const togglePlayPause = () => {
    if (isPaused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }

    setIsPaused(!isPaused);
  };

  return (
    <Box sx={{ width, height, position: 'relative', backgroundColor: 'black' }}>
      <video
        src={src}
        ref={videoRef}
        autoPlay={autoPlay}
        disablePictureInPicture
        muted
        loop
        controlsList="disablepictureinpicture"
        preload="auto"
        {...rest}
        style={{ ...style, position: 'absolute' }}
      />
      <Box
        sx={{
          position: 'absolute',
          opacity: isPaused ? 1 : 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '100%',
          transitionDuration: '600ms',
          backgroundColor: 'rgba(31,31,31,0.64)',
          '&:hover': {
            opacity: 1,
            cursor: 'pointer',
          },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={togglePlayPause}
      >
        <IconButton component="span" sx={{ color: 'white' }}>
          {isPaused ? (
            <PlayCircleIcon sx={{ fontSize: '80px' }} />
          ) : (
            <PauseCircleIcon sx={{ fontSize: '80px' }} />
          )}
        </IconButton>
      </Box>
    </Box>
  );
}
