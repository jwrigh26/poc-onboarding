import { alpha, styled, useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import LoadingButton from '@mui/lab/LoadingButton';

export default function Button({
  children,
  loading = false,
  loadingPosition = 'center',
  variant = 'contained',
  sx = [],
  ...props
}) {
  const theme = useTheme();

  return (
    <StyledLoadingButton
      disableRipple
      disableFocusRipple
      disableTouchRipple
      disableElevation
      loading={loading}
      loadingPosition={loadingPosition}
      sx={{ ...theme.shape.button, ...sx }}
      variant={variant}
      {...props}
    >
      {children}
    </StyledLoadingButton>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  loading: PropTypes.bool,
  loadingPosition: PropTypes.string,
  variant: PropTypes.string,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

const StyledLoadingButton = styled(LoadingButton)(({ theme, color }) => {
  const mainColor = color
    ? theme.palette[color].main
    : theme.palette.primary.main;
  const darkColor = color
    ? theme.palette[color].dark
    : theme.palette.primary.dark;
  return {
    transition: theme.transitions.create(
      ['border-color', 'background-color', 'box-shadow'],
      { duration: theme.transitions.duration.shorter }
    ),
    '&:focus-visible': {
      boxShadow: `${alpha(mainColor, 0.25)} 0 0 0 0.2rem`,
      borderColor: mainColor,
      backgroundColor: darkColor,
    },
    '&:active': {
      boxShadow: 'none',
      borderColor: 'none',
      backgroundColor: mainColor,
    },
    // Not currently being used. Leaving as a reference.
    // '&:hodver': {
    // boxShadow: 'none',
    // borderColor: 'none',
    // backgroundColor: darkColor,
    // },
    // '&:focus:not(:focus-visible)': {
    //   boxShadow: 'none',
    //   borderColor: 'none',
    //   backgroundColor: mainColor,
    // },
  };
});
