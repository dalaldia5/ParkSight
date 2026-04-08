import {
  CarFront,
  Sparkles,
  Zap,
  Shield,
  TrendingUp,
  Award,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

export default function Home() {
  const features = [
    {
      icon: Zap,
      title: "Real-Time Detection",
      description:
        "AI-powered computer vision detects parking availability instantly with 99% accuracy",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description:
        "Smart algorithms predict parking patterns and optimize space utilization",
      color: "from-blue-400 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Secure Booking",
      description:
        "End-to-end encrypted reservations with instant confirmation and payment",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: Award,
      title: "Premium Experience",
      description:
        "VIP parking spots, priority access, and exclusive member benefits",
      color: "from-emerald-400 to-teal-500",
    },
  ];

  const stats = [
    { value: "10K+", label: "Daily Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "5K+", label: "Parking Spots" },
    { value: "50+", label: "Locations" },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Animated gradient background with mesh effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-emerald-900 to-slate-900">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTE4IDBjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZ6bTAtMThjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZ6IiBzdHJva2U9InJnYmEoMTYsIDE4NSwgMTI5LCAwLjEpIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-20"></div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, Math.random() * -100 - 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col items-center text-white space-y-8 px-4 max-w-6xl"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Badge variant="premium" className="px-4 py-2 text-sm">
              <Sparkles size={14} className="mr-1" />
              AI-Powered Parking Intelligence
            </Badge>
          </motion.div>

          {/* Glowing animated car icon */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-emerald-400/20 blur-3xl rounded-full"></div>
            <CarFront
              size={100}
              className="text-emerald-400 drop-shadow-[0_0_30px_rgba(16,185,129,0.9)] relative"
            />
          </motion.div>

          {/* Title + Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                ParkSight
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 font-light">
              The Future of Urban Parking
            </p>
          </motion.div>

          <motion.p
            className="max-w-3xl text-gray-300 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Experience the next generation of parking management. Our AI-powered
            platform combines real-time detection, predictive analytics, and
            seamless booking to transform your parking experience.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link to="/parking">
              <Button size="lg" className="group">
                Explore Parking
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={18}
                />
              </Button>
            </Link>
            <Link to="/analytics">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                View Analytics
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-12 w-full max-w-4xl"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-slate-900 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">
              Premium Features
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Why Choose ParkSight?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Cutting-edge technology meets user-friendly design
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all group">
                  <CardHeader>
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon size={28} className="text-white" />
                    </div>
                    <CardTitle className="text-white">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}