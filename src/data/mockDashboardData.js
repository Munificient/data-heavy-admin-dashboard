// Mock dataset for local development and UI previews.
// Replace these exports with API calls when connecting a live backend.

/** Tiny sparkline series consumed by MetricCard's inline LineChart. */
const buildSparkline = (points) => points.map((value, index) => ({ index, value }));

export const kpiMetrics = [
  {
    id: 'revenue',
    title: 'Total Revenue',
    value: '$48,254.00',
    trendValue: 12.4,
    trendDirection: 'up',
    trendLabel: '+12.4% vs last week',
    sparkline: buildSparkline([28, 32, 30, 38, 42, 40, 48, 46, 52, 58]),
    accent: 'indigo',
  },
  {
    id: 'subscriptions',
    title: 'Active Subscriptions',
    value: '+1,240',
    trendValue: 8.1,
    trendDirection: 'up',
    trendLabel: '+8.1% vs last week',
    sparkline: buildSparkline([12, 14, 13, 16, 18, 17, 20, 22, 21, 24]),
    accent: 'emerald',
  },
  {
    id: 'conversion',
    title: 'Sales Conversion Rate',
    value: '3.2%',
    trendValue: -2.3,
    trendDirection: 'down',
    trendLabel: '-2.3% vs last week',
    sparkline: buildSparkline([4.1, 3.9, 4.0, 3.6, 3.5, 3.7, 3.4, 3.3, 3.1, 3.2]),
    accent: 'amber',
  },
  {
    id: 'alerts',
    title: 'Active System Alerts',
    value: '4',
    trendValue: 100,
    trendDirection: 'up',
    trendLabel: '+2 new since yesterday',
    sparkline: buildSparkline([1, 1, 2, 2, 1, 3, 2, 3, 4, 4]),
    accent: 'rose',
  },
];

// Revenue and order volume series keyed by timeframe scope

export const revenueTimelines = {
  '7d': [
    { label: 'Mon', revenue: 4200, orders: 210, refunds: 180 },
    { label: 'Tue', revenue: 5120, orders: 256, refunds: 140 },
    { label: 'Wed', revenue: 4780, orders: 238, refunds: 210 },
    { label: 'Thu', revenue: 6130, orders: 301, refunds: 165 },
    { label: 'Fri', revenue: 7240, orders: 342, refunds: 190 },
    { label: 'Sat', revenue: 6890, orders: 318, refunds: 220 },
    { label: 'Sun', revenue: 5990, orders: 275, refunds: 150 },
  ],
  '30d': [
    { label: 'W1', revenue: 32100, orders: 1520, refunds: 980 },
    { label: 'W2', revenue: 35800, orders: 1680, refunds: 1120 },
    { label: 'W3', revenue: 31200, orders: 1440, refunds: 1340 },
    { label: 'W4', revenue: 41250, orders: 1910, refunds: 1050 },
    { label: 'W5', revenue: 38900, orders: 1785, refunds: 990 },
  ],
  '12m': [
    { label: 'Jan', revenue: 142000, orders: 6200, refunds: 3800 },
    { label: 'Feb', revenue: 138500, orders: 6050, refunds: 4100 },
    { label: 'Mar', revenue: 156200, orders: 6820, refunds: 3600 },
    { label: 'Apr', revenue: 149800, orders: 6510, refunds: 4200 },
    { label: 'May', revenue: 167300, orders: 7240, refunds: 3900 },
    { label: 'Jun', revenue: 172900, orders: 7480, refunds: 4050 },
    { label: 'Jul', revenue: 181400, orders: 7820, refunds: 3700 },
    { label: 'Aug', revenue: 176600, orders: 7610, refunds: 4300 },
    { label: 'Sep', revenue: 192300, orders: 8240, refunds: 3950 },
    { label: 'Oct', revenue: 205100, orders: 8790, refunds: 4150 },
    { label: 'Nov', revenue: 221800, orders: 9420, refunds: 4400 },
    { label: 'Dec', revenue: 248254, orders: 10380, refunds: 4600 },
  ],
};

export const timelineScopes = [
  { id: '7d', label: '7 Days' },
  { id: '30d', label: '30 Days' },
  { id: '12m', label: '12 Months' },
];

// User acquisition breakdown

export const acquisitionChannels = [
  { id: 'organic', name: 'Organic', value: 4820, color: '#6366f1' },
  { id: 'paid', name: 'Paid Ads', value: 3210, color: '#22c55e' },
  { id: 'referral', name: 'Referral', value: 1740, color: '#f59e0b' },
  { id: 'direct', name: 'Direct', value: 2380, color: '#ec4899' },
];

// Sample order records

export const orderStatuses = ['Paid', 'Pending', 'Refunded', 'Cancelled'];

export const orderRecords = [
  { id: 'ORD-10231', customer: 'Amelia Hart', email: 'amelia.hart@novamail.com', date: '2026-09-18', amount: 482.5, status: 'Paid' },
  { id: 'ORD-10232', customer: 'Julian Cross', email: 'julian.cross@fernpost.io', date: '2026-09-18', amount: 129.0, status: 'Pending' },
  { id: 'ORD-10233', customer: 'Priya Natarajan', email: 'priya.n@orbitmail.com', date: '2026-09-17', amount: 998.2, status: 'Paid' },
  { id: 'ORD-10234', customer: 'Marcus Webb', email: 'marcus.webb@driftline.co', date: '2026-09-17', amount: 64.99, status: 'Cancelled' },
  { id: 'ORD-10235', customer: 'Sofia Lindqvist', email: 'sofia.l@haloinbox.com', date: '2026-09-16', amount: 310.0, status: 'Refunded' },
  { id: 'ORD-10236', customer: 'Daniel Osei', email: 'daniel.osei@pinemail.net', date: '2026-09-16', amount: 745.35, status: 'Paid' },
  { id: 'ORD-10237', customer: 'Chloe Bennett', email: 'chloe.bennett@quaymail.com', date: '2026-09-15', amount: 88.4, status: 'Pending' },
  { id: 'ORD-10238', customer: 'Rafael Moreno', email: 'rafael.moreno@cedarbox.io', date: '2026-09-15', amount: 1250.0, status: 'Paid' },
  { id: 'ORD-10239', customer: 'Ingrid Solberg', email: 'ingrid.solberg@arcmail.com', date: '2026-09-14', amount: 215.75, status: 'Refunded' },
  { id: 'ORD-10240', customer: 'Tobias Reinhardt', email: 'tobias.r@northinbox.de', date: '2026-09-14', amount: 59.0, status: 'Cancelled' },
  { id: 'ORD-10241', customer: 'Naomi Chen', email: 'naomi.chen@mistmail.com', date: '2026-09-13', amount: 432.1, status: 'Paid' },
  { id: 'ORD-10242', customer: 'Elias Fontaine', email: 'elias.fontaine@brookpost.fr', date: '2026-09-13', amount: 178.6, status: 'Pending' },
  { id: 'ORD-10243', customer: 'Grace Okafor', email: 'grace.okafor@sunmail.ng', date: '2026-09-12', amount: 890.0, status: 'Paid' },
  { id: 'ORD-10244', customer: 'Lucas Bergström', email: 'lucas.b@fjordinbox.se', date: '2026-09-12', amount: 46.2, status: 'Cancelled' },
  { id: 'ORD-10245', customer: 'Isabela Duarte', email: 'isabela.duarte@palmmail.br', date: '2026-09-11', amount: 621.9, status: 'Paid' },
  { id: 'ORD-10246', customer: 'Kwame Asante', email: 'kwame.asante@goldmail.gh', date: '2026-09-11', amount: 99.99, status: 'Pending' },
  { id: 'ORD-10247', customer: 'Hana Kobayashi', email: 'hana.kobayashi@sakuramail.jp', date: '2026-09-10', amount: 355.4, status: 'Refunded' },
  { id: 'ORD-10248', customer: 'Owen Fitzgerald', email: 'owen.fitz@cloverbox.ie', date: '2026-09-10', amount: 1420.0, status: 'Paid' },
  { id: 'ORD-10249', customer: 'Mei Lin', email: 'mei.lin@jademail.com', date: '2026-09-09', amount: 76.5, status: 'Pending' },
  { id: 'ORD-10250', customer: 'Andres Villalobos', email: 'andres.v@condorbox.mx', date: '2026-09-09', amount: 512.0, status: 'Paid' },
  { id: 'ORD-10251', customer: 'Freya Nilsen', email: 'freya.nilsen@birchmail.no', date: '2026-09-08', amount: 233.15, status: 'Cancelled' },
  { id: 'ORD-10252', customer: 'Samuel Achterberg', email: 'samuel.a@duneinbox.nl', date: '2026-09-08', amount: 998.75, status: 'Paid' },
  { id: 'ORD-10253', customer: 'Layla Haddad', email: 'layla.haddad@oasismail.ae', date: '2026-09-07', amount: 145.0, status: 'Refunded' },
  { id: 'ORD-10254', customer: 'Connor Sheehan', email: 'connor.sheehan@mossbox.ie', date: '2026-09-07', amount: 67.3, status: 'Pending' },
];

export const statusStyles = {
  Paid: {
    badge:
      'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20',
    dot: 'bg-emerald-500',
  },
  Pending: {
    badge:
      'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20',
    dot: 'bg-amber-500',
  },
  Refunded: {
    badge:
      'bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:ring-sky-500/20',
    dot: 'bg-sky-500',
  },
  Cancelled: {
    badge:
      'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-500/20',
    dot: 'bg-rose-500',
  },
};

// Header notifications and active user profile

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
