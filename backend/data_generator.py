import random
import datetime
from typing import Dict, List

class ParkingDataGenerator:
    """Generates realistic parking and traffic data for different city zones"""
    
    def __init__(self):
        self.zones = [
            {"id": 1, "name": "Downtown", "total_slots": 150, "base_occupancy": 0.8},
            {"id": 2, "name": "Business District", "total_slots": 200, "base_occupancy": 0.75},
            {"id": 3, "name": "Shopping Mall", "total_slots": 180, "base_occupancy": 0.65},
            {"id": 4, "name": "Residential Area", "total_slots": 120, "base_occupancy": 0.45},
            {"id": 5, "name": "Airport", "total_slots": 300, "base_occupancy": 0.70},
            {"id": 6, "name": "University", "total_slots": 160, "base_occupancy": 0.60},
            {"id": 7, "name": "Hospital", "total_slots": 100, "base_occupancy": 0.85},
            {"id": 8, "name": "Entertainment", "total_slots": 140, "base_occupancy": 0.55},
        ]
    
    def get_time_factor(self) -> float:
        """Returns occupancy factor based on current time"""
        current_hour = datetime.datetime.now().hour
        
        if 6 <= current_hour < 9:  # Morning rush
            return 1.3
        elif 9 <= current_hour < 12:  # Mid-morning
            return 1.1
        elif 12 <= current_hour < 14:  # Lunch time
            return 1.2
        elif 14 <= current_hour < 17:  # Afternoon
            return 1.0
        elif 17 <= current_hour < 20:  # Evening rush
            return 1.4
        elif 20 <= current_hour < 23:  # Night
            return 0.8
        else:  # Late night
            return 0.4
    
    def calculate_congestion_level(self, occupancy_rate: float) -> Dict:
        """Calculate congestion level based on occupancy"""
        if occupancy_rate >= 0.9:
            return {"level": "Critical", "color": "red", "score": 95}
        elif occupancy_rate >= 0.75:
            return {"level": "High", "color": "orange", "score": 80}
        elif occupancy_rate >= 0.50:
            return {"level": "Moderate", "color": "yellow", "score": 60}
        elif occupancy_rate >= 0.25:
            return {"level": "Low", "color": "green", "score": 35}
        else:
            return {"level": "Minimal", "color": "blue", "score": 15}
    
    def generate_zone_data(self) -> List[Dict]:
        """Generate current data for all zones"""
        time_factor = self.get_time_factor()
        zone_data = []
        
        for zone in self.zones:
            # Calculate occupancy with time factor and some randomness
            occupancy_rate = min(0.95, zone["base_occupancy"] * time_factor * random.uniform(0.9, 1.1))
            occupied_slots = int(zone["total_slots"] * occupancy_rate)
            available_slots = zone["total_slots"] - occupied_slots
            
            congestion = self.calculate_congestion_level(occupancy_rate)
            
            # Calculate average wait time
            wait_time = int((occupancy_rate ** 2) * 30)  # Max 30 minutes
            
            # Traffic flow (vehicles per hour)
            traffic_flow = int(zone["total_slots"] * random.uniform(0.5, 1.5))
            
            zone_data.append({
                "id": zone["id"],
                "name": zone["name"],
                "total_slots": zone["total_slots"],
                "occupied_slots": occupied_slots,
                "available_slots": available_slots,
                "occupancy_rate": round(occupancy_rate * 100, 1),
                "congestion": congestion,
                "avg_wait_time": wait_time,
                "traffic_flow": traffic_flow,
                "peak_hour": self.get_peak_hour(zone["name"]),
                "coordinates": self.get_zone_coordinates(zone["id"])
            })
        
        return zone_data
    
    def generate_forecast(self, zone_id: int, hours: int = 6) -> List[Dict]:
        """Generate forecast data for a specific zone"""
        zone = next((z for z in self.zones if z["id"] == zone_id), None)
        if not zone:
            return []
        
        forecast_data = []
        current_hour = datetime.datetime.now().hour
        
        for i in range(hours):
            hour = (current_hour + i) % 24
            time_label = f"{hour:02d}:00"
            
            # Predict occupancy based on hour patterns
            if 6 <= hour < 9 or 17 <= hour < 20:
                factor = 1.3
            elif 9 <= hour < 17:
                factor = 1.0
            elif 20 <= hour < 23:
                factor = 0.7
            else:
                factor = 0.3
            
            occupancy_rate = min(0.95, zone["base_occupancy"] * factor * random.uniform(0.95, 1.05))
            demand = int(zone["total_slots"] * occupancy_rate)
            
            forecast_data.append({
                "time": time_label,
                "hour": hour,
                "demand": demand,
                "occupancy_rate": round(occupancy_rate * 100, 1),
                "confidence": round(random.uniform(85, 98), 1)
            })
        
        return forecast_data
    
    def generate_hourly_trends(self) -> List[Dict]:
        """Generate 24-hour trend data across all zones"""
        hourly_data = []
        
        for hour in range(24):
            time_label = f"{hour:02d}:00"
            
            # Calculate average across all zones for this hour
            total_demand = 0
            total_capacity = sum(z["total_slots"] for z in self.zones)
            
            for zone in self.zones:
                if 6 <= hour < 9 or 17 <= hour < 20:
                    factor = 1.3
                elif 9 <= hour < 17:
                    factor = 1.0
                elif 20 <= hour < 23:
                    factor = 0.7
                else:
                    factor = 0.3
                
                occupancy_rate = min(0.95, zone["base_occupancy"] * factor)
                total_demand += int(zone["total_slots"] * occupancy_rate)
            
            hourly_data.append({
                "time": time_label,
                "hour": hour,
                "total_demand": total_demand,
                "total_capacity": total_capacity,
                "avg_occupancy": round((total_demand / total_capacity) * 100, 1)
            })
        
        return hourly_data
    
    def generate_weekly_forecast(self) -> List[Dict]:
        """Generate weekly forecast for all zones"""
        days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        weekly_data = []
        
        for i, day in enumerate(days):
            # Weekend factor
            weekend_factor = 0.6 if i >= 5 else 1.0
            
            total_capacity = sum(z["total_slots"] for z in self.zones)
            avg_demand = int(total_capacity * 0.65 * weekend_factor * random.uniform(0.9, 1.1))
            peak_demand = int(total_capacity * 0.85 * weekend_factor * random.uniform(0.9, 1.1))
            
            weekly_data.append({
                "day": day,
                "avg_demand": avg_demand,
                "peak_demand": peak_demand,
                "occupancy_rate": round((avg_demand / total_capacity) * 100, 1)
            })
        
        return weekly_data
    
    def get_peak_hour(self, zone_name: str) -> str:
        """Get typical peak hour for each zone"""
        peak_hours = {
            "Downtown": "18:00",
            "Business District": "09:00",
            "Shopping Mall": "14:00",
            "Residential Area": "19:00",
            "Airport": "08:00",
            "University": "10:00",
            "Hospital": "11:00",
            "Entertainment": "20:00"
        }
        return peak_hours.get(zone_name, "12:00")
    
    def get_zone_coordinates(self, zone_id: int) -> Dict:
        """Get coordinates for each zone"""
        coordinates = {
            1: {"lat": 40.7589, "lng": -73.9851},
            2: {"lat": 40.7614, "lng": -73.9776},
            3: {"lat": 40.7549, "lng": -73.9840},
            4: {"lat": 40.7489, "lng": -73.9680},
            5: {"lat": 40.6413, "lng": -73.7781},
            6: {"lat": 40.7295, "lng": -73.9965},
            7: {"lat": 40.7903, "lng": -73.9535},
            8: {"lat": 40.7580, "lng": -73.9855}
        }
        return coordinates.get(zone_id, {"lat": 40.7589, "lng": -73.9851})