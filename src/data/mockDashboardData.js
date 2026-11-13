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
