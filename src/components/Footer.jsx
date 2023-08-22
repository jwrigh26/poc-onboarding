import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <FooterWrapper>
      <CopyRight>&copy; 2023 Aberdeen Advisory. All rights reserved.</CopyRight>
    </FooterWrapper>
  );
}

Footer.propTypes = {};

const FooterWrapper = styled((props) => (
  <Stack direction="row" alignItems="center" {...props} />
))(({ theme }) => ({
  maxWidth: theme.breakpoints.values.lg,
  padding: theme.spacing(1),
  margin: '0 auto',
}));

const CopyRight = styled((props) => <Typography {...props} />)(({ theme }) => ({
  ...theme.typography.overline,
  display: 'inline-block',
  color: theme.palette.common.white,
}));
