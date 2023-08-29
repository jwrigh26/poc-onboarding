import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ThemeDashboard = () => {
  const theme = useTheme();

  const renderThemeKeys = (obj, parentKey = '') => {
    return Object.keys(obj).flatMap((key) => {
      if (typeof obj[key] === 'object') {
        return renderThemeKeys(obj[key], parentKey + key + '.');
      } else if (typeof obj[key] === 'string') {
        return (
          <TableRow key={parentKey + key}>
            <TableCell component="th" scope="row">
              {parentKey + key}
            </TableCell>
            <TableCell>{obj[key]}</TableCell>
          </TableRow>
        );
      }
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Theme Key</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderThemeKeys(theme)}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default ThemeDashboard;
