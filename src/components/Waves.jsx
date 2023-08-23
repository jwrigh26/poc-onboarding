import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import waves from 'assets/waves.svg';

export default function Waves({ children }) {
  return <WaveWrapper>{children}</WaveWrapper>;
}

Waves.propTypes = {
  children: PropTypes.node.isRequired,
};

// const WaveWrapper = styled((props) => <div {...props} />)(({ theme }) => ({
//   position: 'relative',
//   width: '100%',
//   height: '100%',
//   backgroundColor: theme.palette.background.paper,
//   '&::after': {
//     content: '""',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: '50%',
//     backgroundImage: `linear-gradient(to bottom, rgba(255,255,255, 1) 0%, rgba(255,255,255,0) 50%), url(${waves})`,
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'bottom',
//     backgroundSize: 'cover',
//   },
// }));

const WaveWrapper = styled((props) => <div {...props} />)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  background: `
      linear-gradient(to bottom, rgba(255,255,255, 1) 30%, rgba(255,255,255,0) 100%),
      url(${waves}) no-repeat bottom/cover`,
}));
