import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Download,
  MapPin,
  Clock,
  CreditCard,
  Car,
  Calendar,
  Shield,
  Sparkles,
  Award,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

export default function Booking() {
  const [searchParams] = useSearchParams();
  const slotNumber = searchParams.get("slot") || "3";
  const [duration, setDuration] = useState(2);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const pricePerHour = 25;
  const totalPrice = duration * pricePerHour;

  const handleConfirmBooking = () => {
    setBookingConfirmed(true);
  };

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full"
        >
          <Card className="bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50 overflow-hidden">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle size={60} className="text-emerald-500" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Booking Confirmed!
              </h2>
              <p className="text-emerald-100">
                Your parking slot has been reserved successfully
              </p>
            </div>

            <CardContent className="p-8 space-y-6">
              {/* Booking Details */}
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Car size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Slot Number</div>
                      <div className="text-white text-xl font-bold">
                        S-{slotNumber}
                      </div>
                    </div>
                  </div>
                  <Badge variant="premium">Premium</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                      <Clock size={16} />
                      Duration
                    </div>
                    <div className="text-white text-lg font-semibold">
                      {duration} Hours
                    </div>
                  </div>
                  <div className="p-4 bg-gray-700/30 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                      <CreditCard size={16} />
                      Total Amount
                    </div>
                    <div className="text-white text-lg font-semibold">
                      ${totalPrice}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <MapPin size={16} />
                    Location
                  </div>
                  <div className="text-white font-medium">
                    Downtown Parking - Level 2, Zone A
                  </div>
                </div>

                <div className="p-4 bg-gray-700/30 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <Calendar size={16} />
                    Booking ID
                  </div>
                  <div className="text-white font-mono">
                    SPK-{Date.now().toString().slice(-8)}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 gap-2">
                  <Download size={18} />
                  Download Pass
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-white/10 border-gray-600 text-white hover:bg-white/20"
                >
                  Share Details
                </Button>
              </div>

              {/* Perks */}
              <div className="border-t border-gray-700 pt-6 mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="text-yellow-400" size={20} />
                  <span className="text-white font-semibold">
                    Premium Benefits Unlocked
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "24/7 Security",
                    "Car Wash Available",
                    "EV Charging",
                    "Valet Service",
                  ].map((perk, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-gray-300 text-sm"
                    >
                      <CheckCircle size={16} className="text-emerald-400" />
                      {perk}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="premium" className="mb-4">
            <Sparkles size={14} className="mr-1" />
            Premium Booking Experience
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Reserve Your Spot
          </h2>
          <p className="text-gray-400 text-lg">
            Secure parking with instant confirmation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50">
              <CardHeader className="border-b border-gray-700/50">
                <CardTitle className="text-white text-2xl">
                  Booking Details
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Complete your reservation
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Slot Number */}
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block">
                    Selected Slot
                  </label>
                  <div className="p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-xl">
                        {slotNumber}
                      </div>
                      <div>
                        <div className="text-white font-semibold">
                          Slot S-{slotNumber}
                        </div>
                        <div className="text-emerald-400 text-sm">
                          Level 2, Zone A
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Duration Selector */}
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-3 block flex items-center gap-2">
                    <Clock size={16} />
                    Parking Duration
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((hours) => (
                      <button
                        key={hours}
                        onClick={() => setDuration(hours)}
                        className={`p-3 rounded-lg font-semibold transition-all ${
                          duration === hours
                            ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                            : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
                        }`}
                      >
                        {hours}h
                      </button>
                    ))}
                  </div>
                </div>

                {/* Vehicle Info */}
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block flex items-center gap-2">
                    <Car size={16} />
                    Vehicle Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter vehicle number"
                    className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-3 block flex items-center gap-2">
                    <CreditCard size={16} />
                    Payment Method
                  </label>
                  <div className="space-y-2">
                    {["Credit Card", "Debit Card", "UPI", "Wallet"].map(
                      (method) => (
                        <label
                          key={method}
                          className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-all"
                        >
                          <input
                            type="radio"
                            name="payment"
                            className="w-4 h-4 accent-emerald-500"
                          />
                          <span className="text-gray-300">{method}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* Confirm Button */}
                <Button
                  onClick={handleConfirmBooking}
                  className="w-full gap-2 text-lg py-6"
                >
                  <Shield size={20} />
                  Confirm Booking - ${totalPrice}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Price Summary */}
            <Card className="bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50">
              <CardHeader className="border-b border-gray-700/50">
                <CardTitle className="text-white text-2xl">
                  Price Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between text-gray-300">
                  <span>Base Rate (per hour)</span>
                  <span className="font-semibold">${pricePerHour}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Duration</span>
                  <span className="font-semibold">{duration} hours</span>
                </div>
                <div className="border-t border-gray-700 pt-4 flex justify-between text-white text-xl font-bold">
                  <span>Total</span>
                  <span className="text-emerald-400">${totalPrice}</span>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="bg-gradient-to-br from-slate-800/90 to-gray-800/90 backdrop-blur-xl border-gray-700/50">
              <CardHeader className="border-b border-gray-700/50">
                <CardTitle className="text-white text-xl flex items-center gap-2">
                  <Award className="text-yellow-400" />
                  Premium Features
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {[
                    "24/7 Security & CCTV",
                    "Covered Parking",
                    "EV Charging Points",
                    "Car Wash Service",
                    "Valet Assistance",
                    "Insurance Coverage",
                  ].map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <CheckCircle
                        size={18}
                        className="text-emerald-400 flex-shrink-0"
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}