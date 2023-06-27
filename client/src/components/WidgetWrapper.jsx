import { Box } from '@mui/material';
import { styled } from '@mui/system';

const WidgetWrapper = styled(Box)(({ theme }) => ({
    padding: '1.5rem 1.5rem 0.75rem 1.5rem',
    backgroundColor: theme.palette.background.altOpacity,
    filter: `drop-shadow(${theme.palette.background.altOpacity} 0px 0px 0.55rem)`,
    backdropFilter: 'blur(8px)',
    borderRadius: '0.75rem'
}));


export default WidgetWrapper;