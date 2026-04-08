import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin, TrendingUp, AlertTriangle, Clock, Activity, Navigation,
  BarChart3, LineChart as LineChartIcon, RefreshCw, Zap, Car
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

export default function Traffic() {
  const [zonesData, setZonesData] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [zoneForecast, setZoneForecast] = useState([]);
  const [hourlyTrends, setHourlyTrends] = useState([]);
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [congestionData, setCongestionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const API_BASE = "http://localhost:5001/api";

  // Fetch all data
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch zones data
      const zonesRes = await fetch(`${API_BASE}/zones`);
      const zonesJson = await zonesRes.json();
      setZonesData(zonesJson.zones || []);

      // Fetch congestion data
      const congestionRes = await fetch(`${API_BASE}/traffic/congestion`);
      const congestionJson = await congestionRes.json();
      setCongestionData(congestionJson);

      // Fetch analytics
      const analyticsRes = await fetch(`${API_BASE}/analytics`);
      const analyticsJson = await analyticsRes.json();
      setHourlyTrends(analyticsJson.hourly_trends || []);
      setWeeklyForecast(analyticsJson.weekly_forecast || []);

      // Select first zone by default
      if (zonesJson.zones && zonesJson.zones.length > 0 && !selectedZone) {
        handleZoneSelect(zonesJson.zones[0].id);
      }

      setLastUpdate(new Date());
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch zone forecast
  const handleZoneSelect = async (zoneId) => {
    setSelectedZone(zoneId);
    try {
      const forecastRes = await fetch(`${API_BASE}/zones/${zoneId}/forecast?hours=12`);
      const forecastJson = await forecastRes.json();
      setZoneForecast(forecastJson.forecast || []);
    } catch (error) {
      console.error("Error fetching forecast:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getCongestionColor = (level) => {
    const colors = {
      Critical: "from-red-500 to-pink-600",
      High: "from-orange-500 to-red-500",
      Moderate: "from-yellow-500 to-orange-500",
      Low: "from-green-500 to-teal-500",
      Minimal: "from-blue-500 to-cyan-500"
    };
    return colors[level] || "from-gray-500 to-gray-600";
  };

  const getCongestionBadgeVariant = (level) => {
    const variants = {
      Critical: "destructive",
      High: "warning",
      Moderate: "default",
      Low: "success",
      Minimal: "secondary"
    };
    return variants[level] || "default";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin text-emerald-400 mx-auto mb-4" size={48} />
          <p className="text-white text-xl">Loading traffic data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 py-12 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 max-w-6xl mx-auto"
      >
        <Badge variant="premium" className="mb-4">
          <Activity size={14} className="mr-1" />
          Real-Time Traffic Intelligence
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Traffic Congestion & Demand Forecast
        </h2>
        <p className="text-gray-400 text-lg mb-6">
          AI-powered analysis across {zonesData.length} city zones
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="text-sm text-gray-400">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
          <Button
            onClick={fetchData}
            size="sm"
            variant="outline"
            className="bg-white/10 border-gray-600 text-white hover:bg-white/20"
          >
            <RefreshCw size={14} className="mr-2" />
            Refresh
          </Button>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Congestion Overview */}
        {congestionData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50">
              <CardHeader className="border-b border-gray-700/50">
                <CardTitle className="text-white text-2xl flex items-center gap-2">
                  <AlertTriangle className="text-orange-400" size={24} />
                  Live Congestion Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-red-500/20 rounded-lg border border-red-500/30">
                    <div className="text-3xl font-bold text-red-400">
                      {congestionData.overall_congestion.critical}
                    </div>
                    <div className="text-sm text-gray-300">Critical</div>
                  </div>
                  <div className="text-center p-4 bg-orange-500/20 rounded-lg border border-orange-500/30">
                    <div className="text-3xl font-bold text-orange-400">
                      {congestionData.overall_congestion.high}
                    </div>
                    <div className="text-sm text-gray-300">High</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                    <div className="text-3xl font-bold text-yellow-400">
                      {congestionData.overall_congestion.moderate}
                    </div>
                    <div className="text-sm text-gray-300">Moderate</div>
                  </div>
                  <div className="text-center p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                    <div className="text-3xl font-bold text-green-400">
                      {congestionData.overall_congestion.low}
                    </div>
                    <div className="text-sm text-gray-300">Low</div>
                  </div>
                  <div className="text-center p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                    <div className="text-3xl font-bold text-blue-400">
                      {congestionData.overall_congestion.minimal}
                    </div>
                    <div className="text-sm text-gray-300">Minimal</div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="text-cyan-400" size={20} />
                      <span className="text-gray-300">Avg Wait Time</span>
                    </div>
                    <span className="text-white text-xl font-bold">
                      {congestionData.avg_wait_time} min
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Car className="text-purple-400" size={20} />
                      <span className="text-gray-300">Total Traffic Flow</span>
                    </div>
                    <span className="text-white text-xl font-bold">
                      {congestionData.total_traffic_flow}/h
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Zone Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <MapPin className="text-emerald-400" size={24} />
            City Zones Status
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {zonesData.map((zone, index) => (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleZoneSelect(zone.id)}
                className="cursor-pointer"
              >
                <Card
                  className={`bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50 hover:scale-105 transition-all ${
                    selectedZone === zone.id ? "ring-2 ring-emerald-500" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-white font-bold text-lg mb-1">
                          {zone.name}
                        </h4>
                        <p className="text-gray-400 text-sm">Zone #{zone.id}</p>
                      </div>
                      <Badge variant={getCongestionBadgeVariant(zone.congestion.level)}>
                        {zone.congestion.level}
                      </Badge>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Occupancy</span>
                        <span className="text-white font-bold">
                          {zone.occupancy_rate}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${getCongestionColor(
                            zone.congestion.level
                          )} transition-all duration-500`}
                          style={{ width: `${zone.occupancy_rate}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-center p-2 bg-gray-700/30 rounded">
                        <div className="text-emerald-400 font-bold text-lg">
                          {zone.available_slots}
                        </div>
                        <div className="text-gray-400 text-xs">Available</div>
                      </div>
                      <div className="text-center p-2 bg-gray-700/30 rounded">
                        <div className="text-orange-400 font-bold text-lg">
                          {zone.avg_wait_time}m
                        </div>
                        <div className="text-gray-400 text-xs">Wait Time</div>
                      </div>
                    </div>

                    {/* Peak Hour */}
                    <div className="mt-4 text-center text-xs text-gray-400">
                      Peak: {zone.peak_hour}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Zone Forecast */}
        {selectedZone && zoneForecast.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
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
                        12-Hour Demand Forecast
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {zonesData.find((z) => z.id === selectedZone)?.name} - AI Predictions
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="premium" className="animate-pulse">
                    <Zap size={12} className="mr-1" />
                    Live
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={zoneForecast}>
                    <defs>
                      <linearGradient id="demandGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" style={{ fill: "#fff" }} />
                    <YAxis stroke="#9ca3af" style={{ fill: "#fff" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                      labelStyle={{ color: "#fff" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="demand"
                      stroke="#a855f7"
                      fillOpacity={1}
                      fill="url(#demandGradient)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 24-Hour City-Wide Trend */}
          {hourlyTrends.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50">
                <CardHeader className="border-b border-gray-700/50">
                  <CardTitle className="text-white text-xl flex items-center gap-2">
                    <LineChartIcon className="text-cyan-400" size={20} />
                    24-Hour City-Wide Demand
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Aggregated across all zones
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={hourlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9ca3af" style={{ fill: "#fff" }} />
                      <YAxis stroke="#9ca3af" style={{ fill: "#fff" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="total_demand"
                        stroke="#06b6d4"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#06b6d4" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Weekly Forecast */}
          {weeklyForecast.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50">
                <CardHeader className="border-b border-gray-700/50">
                  <CardTitle className="text-white text-xl flex items-center gap-2">
                    <BarChart3 className="text-green-400" size={20} />
                    Weekly Demand Forecast
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Average vs peak demand
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyForecast}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="day" stroke="#9ca3af" style={{ fill: "#fff" }} />
                      <YAxis stroke="#9ca3af" style={{ fill: "#fff" }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                      />
                      <Legend wrapperStyle={{ color: "#9ca3af" }} />
                      <Bar dataKey="avg_demand" fill="#10b981" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="peak_demand" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}