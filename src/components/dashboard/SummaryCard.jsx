import { Box, Card, CardContent, Typography } from '@mui/material';

const SummaryCard = ({ title, value, change, prefix = '', comparisonPeriod, icon: Icon, bgColor, iconColor }) => (
  <Card sx={{ bgcolor: bgColor, height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Icon sx={{ color: iconColor, mr: 1 }} />
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
        {prefix}{value}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        {change} from {comparisonPeriod}
      </Typography>
    </CardContent>
  </Card>
);

export default SummaryCard; 