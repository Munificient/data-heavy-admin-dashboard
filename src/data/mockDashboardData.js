const buildSparkline = (points) => points.map((value, index) => ({ index, value }));

export const kpiMetrics = [
  {
    id: 'revenue',
    title: 'Total Revenue',
    value: '$48,254.00',
    trendDirection: 'up',
    trendLabel: '+12.4% vs last week',
    sparkline: buildSparkline([28, 32, 30, 38, 42, 40, 48, 46, 52, 58]),
    accent: 'indigo',
  },
  {
    id: 'subscriptions',
    title: 'Active Subscriptions',
    value: '+1,240',
    trendDirection: 'up',
    trendLabel: '+8.1% vs last week',
    sparkline: buildSparkline([12, 14, 13, 16, 18, 17, 20, 22, 21, 24]),
    accent: 'emerald',
  },
  {
    id: 'conversion',
    title: 'Sales Conversion Rate',
    value: '3.2%',
    trendDirection: 'down',
    trendLabel: '-2.3% vs last week',
    sparkline: buildSparkline([4.1, 3.9, 4.0, 3.6, 3.5, 3.7, 3.4, 3.3, 3.1, 3.2]),
    accent: 'amber',
  },
  {
    id: 'alerts',
    title: 'Active System Alerts',
    value: '4',
    trendDirection: 'up',
    trendLabel: '+2 new since yesterday',
    sparkline: buildSparkline([1, 1, 2, 2, 1, 3, 2, 3, 4, 4]),
    accent: 'rose',
  },
];

export const notifications = [
  {
    id: 1,
    title: 'Payment failed for ORD-10232',
    description: 'Julian Cross — card declined on retry attempt #2.',
    time: '4m ago',
    unread: true,
  },
  {
    id: 2,
    title: 'New refund request',
    description: 'Sofia Lindqvist requested a refund on ORD-10235.',
    time: '38m ago',
    unread: true,
  },
  {
    id: 3,
    title: 'Weekly report ready',
    description: 'Your analytics summary for Sep 8–14 has been generated.',
    time: '2h ago',
    unread: true,
  },
  {
    id: 4,
    title: 'Server latency warning',
    description: 'API response time exceeded 800ms for 5 consecutive minutes.',
    time: '5h ago',
    unread: false,
  },
];

export const currentUser = {
  name: 'Muntasir Mahin Siam',
  role: 'Operations Admin',
  email: 'muntasirsiam2002@gmail.com',
  initials: 'MS',
};

export const revenueTimelines = {
  '7d': [
    { label: 'Mon', revenue: 4200, orders: 210 },
    { label: 'Tue', revenue: 5120, orders: 256 },
    { label: 'Wed', revenue: 4780, orders: 238 },
    { label: 'Thu', revenue: 6130, orders: 301 },
    { label: 'Fri', revenue: 7240, orders: 342 },
    { label: 'Sat', revenue: 6890, orders: 318 },
    { label: 'Sun', revenue: 5990, orders: 275 },
  ],
  '30d': [
    { label: 'W1', revenue: 32100, orders: 1520 },
    { label: 'W2', revenue: 35800, orders: 1680 },
    { label: 'W3', revenue: 31200, orders: 1440 },
    { label: 'W4', revenue: 41250, orders: 1910 },
    { label: 'W5', revenue: 38900, orders: 1785 },
  ],
  '12m': [
    { label: 'Jan', revenue: 142000, orders: 6200 },
    { label: 'Feb', revenue: 138500, orders: 6050 },
    { label: 'Mar', revenue: 156200, orders: 6820 },
    { label: 'Apr', revenue: 149800, orders: 6510 },
    { label: 'May', revenue: 167300, orders: 7240 },
    { label: 'Jun', revenue: 172900, orders: 7480 },
    { label: 'Jul', revenue: 181400, orders: 7820 },
    { label: 'Aug', revenue: 176600, orders: 7610 },
    { label: 'Sep', revenue: 192300, orders: 8240 },
    { label: 'Oct', revenue: 205100, orders: 8790 },
    { label: 'Nov', revenue: 221800, orders: 9420 },
    { label: 'Dec', revenue: 248254, orders: 10380 },
  ],
};

export const timelineScopes = [
  { id: '7d', label: '7 Days' },
  { id: '30d', label: '30 Days' },
  { id: '12m', label: '12 Months' },
];

export const acquisitionChannels = [
  { id: 'organic', name: 'Organic', value: 4820, color: '#6366f1' },
  { id: 'paid', name: 'Paid Ads', value: 3210, color: '#22c55e' },
  { id: 'referral', name: 'Referral', value: 1740, color: '#f59e0b' },
  { id: 'direct', name: 'Direct', value: 2380, color: '#ec4899' },
];
