import CoreLocation
import Foundation
import math
import datetime # Import datetime module

# Initialize variables for tracking location updates
start_time = datetime.datetime.now()
end_time = start_time + datetime.timedelta(seconds=60)  # Collect data for 60 seconds
distance = 0.0

def fetchGPSData():
    global distance
    locationManager = CLLocationManager.shared

    # Check if we have permission to access location services
    if locationManager.authorizationState != .authorizedAlways:
        print("Location service not authorized. Please enable location services.")
        return

    # Start updating location data
    def updateLocation(_location: CLLocation) {
        # Calculate distance between consecutive points using Haversine formula
        prev_lat = _location.latitude
        prev_lon = _location.longitude

        # Collect all points until end_time is reached
        current_point_count += 1
        if current_point_count >= 2:
            lat1 = prev_lat * math.pi / 180
            lon1 = prev_lon * math.pi / 180
            lat2 = current_lat * math.pi / 180
            lon2 = current_lon * math.pi / 180

            # Haversine formula to calculate distance between two points
            dlat = lat2 - lat1
            dlon = lon2 - lon1
            a = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
            c = 2 * math.asin(math.sqrt(a))
            distance += abs(c) * 6371000  # Earth radius in meters

        if _location == end_time:
            locationManager.stopUpdatingLocation()
    }

    locationManager.delegate = updateLocation
    locationManager.startUpdatingLocation()

    # Run a background thread to avoid freezing the UI
    DispatchQueue.global(qos: .background).async {
        while true {
            if self.end_time <= datetime.datetime.now():
                locationManager.stopUpdatingLocation()
                break
        }
        dispatch_async(dispatch_get_main_queue(), { self.updateLocation(nil) })
    }

# Start fetching GPS data
fetchGPSData()

print(f"Total distance traveled: {distance} meters")