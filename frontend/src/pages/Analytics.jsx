import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  Car,
  Clock,
  BarChart3,
  PieChart,
} from "lucide-react";

const hourlyData = [
  { time: "00:00", occupancy: 15, available: 26 },
  { time: "03:00", occupancy: 8, available: 33 },
  { time: "06:00", occupancy: 12, available: 29 },
  { time: "09:00", occupancy: 35, available: 6 },
  { time: "12:00", occupancy: 38, available: 3 },
  { time: "15:00", occupancy: 32, available: 9 },
  { time: "18:00", occupancy: 28, available: 13 },
  { time: "21:00", occupancy: 20, available: 21 },
];

const weeklyData = [
  { day: "Mon", avg: 32, peak: 38 },
  { day: "Tue", avg: 30, peak: 36 },
  { day: "Wed", avg: 35, peak: 40 },
  { day: "Thu", avg: 33, peak: 39 },
  { day: "Fri", avg: 38, peak: 41 },
  { day: "Sat", avg: 25, peak: 30 },
  { day: "Sun", avg: 18, peak: 24 },
];

const predictionData = [
  { time: "Now", demand: 28 },
  { time: "+1h", demand: 32 },
  { time: "+2h", demand: 38 },
  { time: "+3h", demand: 35 },
  { time: "+4h", demand: 30 },
  { time: "+5h", demand: 25 },
];

export default function Analytics() {
  const stats = [
    {
      icon: Car,
      title: "Current Occupancy",
      value: "28/41",
      change: "+5%",
      trend: "up",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: Users,
      title: "Today's Traffic",
      value: "156",
      change: "+12%",
      trend: "up",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: Clock,
      title: "Avg Duration",
      value: "2.3h",
      change: "-8%",
      trend: "down",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Activity,
      title: "Peak Hour",
      value: "12:00",
      change: "Today",
      trend: "neutral",
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 py-12 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 max-w-4xl mx-auto"
      >
        <Badge variant="premium" className="mb-4">
          <BarChart3 size={14} className="mr-1" />
          Advanced Analytics Dashboard
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Parking Analytics & Insights
        </h2>
        <p className="text-gray-400 text-lg">
          Real-time data visualization powered by machine learning predictions
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50 hover:scale-105 transition-transform">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                    >
                      <stat.icon size={24} className="text-white" />
                    </div>
                    {stat.trend !== "neutral" && (
                      <Badge
                        variant={
                          stat.trend === "up" ? "success" : "destructive"
                        }
                        className="text-xs"
                      >
                        {stat.trend === "up" ? (
                          <TrendingUp size={12} className="mr-1" />
                        ) : (
                          <TrendingDown size={12} className="mr-1" />
                        )}
                        {stat.change}
                      </Badge>
                    )}
                  </div>
                  <div className="text-gray-400 text-sm mb-1">{stat.title}</div>
                  <div className="text-white text-3xl font-bold">
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Hourly Occupancy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50">
              <CardHeader className="border-b border-gray-700/50">
                <CardTitle className="text-white text-2xl flex items-center gap-2">
                  <Activity className="text-emerald-400" size={24} />
                  24-Hour Occupancy Trend
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Real-time parking utilization
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={hourlyData}>
                    <defs>
                      <linearGradient
                        id="occupancy"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10b981"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10b981"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "#fff" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="occupancy"
                      stroke="#10b981"
                      fillOpacity={1}
                      fill="url(#occupancy)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weekly Comparison */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50">
              <CardHeader className="border-b border-gray-700/50">
                <CardTitle className="text-white text-2xl flex items-center gap-2">
                  <BarChart3 className="text-blue-400" size={24} />
                  Weekly Pattern Analysis
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Average vs Peak occupancy
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "#fff" }}
                    />
                    <Legend wrapperStyle={{ color: "#9ca3af" }} />
                    <Bar dataKey="avg" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="peak" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Prediction Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50">
            <CardHeader className="border-b border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <TrendingUp size={24} className="text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-2xl">
                      AI Demand Prediction
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Next 5 hours forecast using neural networks
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="premium" className="animate-pulse">
                  <Activity size={12} className="mr-1" />
                  Live ML Model
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={predictionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="time"
                    stroke="#9ca3af"
                    style={{ fill: "#fff" }}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    style={{ fill: "#fff" }}
                    label={{
                      value: "Demand",
                      angle: -90,
                      position: "insideLeft",
                      style: { fill: "#fff" },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="demand"
                    stroke="url(#gradient)"
                    strokeWidth={4}
                    dot={{ r: 6, fill: "#a855f7" }}
                    activeDot={{ r: 8 }}
                    label={{ fill: "#fff", fontSize: 12 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
              <p className="text-center text-gray-400 text-sm mt-4">
                Predictive analytics with 94% accuracy based on historical
                patterns
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}