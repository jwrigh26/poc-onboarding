import { mapPropType } from 'helpers/proptypes';
import { useTheme } from '@mui/material/styles';

import { useWizzardContext } from 'providers/WizzardProvider';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileWizard from './MobileWizard';

export default function Wizard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // return <>{isMobile && <MobileWizard steps={steps} />}</>;
  return <MobileWizard />;
}
