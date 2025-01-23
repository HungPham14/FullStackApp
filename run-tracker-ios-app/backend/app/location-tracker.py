from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2

app = Flask(__name__) # Create a Flask app
CORS(app) # Allow Cross-Origin Resource Sharing

# # Connect to the PostgreSQL database
# conn = psycopg2.connect(
#     host="localhost",
#     database="run_tracker",
#     user="postgres",
#     password="password",
#     port="5432",
# )

## Open a cursor to perform database operations
# cur = conn.cursor() 

# IF FRONTEND IS SENDING GET REQUESTS TO /api/runs
@app.route('/api/runs', methods=['GET'])
def get_runs():
    # Logic to get runs
    return jsonify([])

# IF FRONTEND IS SENDING POST REQUESTS TO /api/runs
@app.route('/api/runs', methods=['POST'])
def add_run():
    # Logic to add a new run
    return jsonify({'message': 'Run added successfully'})

if __name__ == '__main__':
    app.run(debug=True)


# # Initialize variables for tracking location updates
# start_time = datetime.datetime.now()
# end_time = start_time + datetime.timedelta(seconds=60)  # Collect data for 60 seconds
# distance = 0

# def fetchGPSData():
#     global distance
#     locationManager = CLLocationManager.shared

#     # Check if we have permission to access location services
#     if locationManager.authorizationState != .authorizedAlways:
#         print("Location service not authorized. Please enable location services.")
#         return

#     # Start updating location data
#     def updateLocation(_location: CLLocation) {
#         # Calculate distance between consecutive points using Haversine formula
#         prev_lat = _location.latitude
#         prev_lon = _location.longitude

#         # Collect all points until end_time is reached
#         current_point_count += 1
#         if current_point_count >= 2:
#             lat1 = prev_lat * math.pi / 180
#             lon1 = prev_lon * math.pi / 180
#             lat2 = current_lat * math.pi / 180
#             lon2 = current_lon * math.pi / 180

#             # Haversine formula to calculate distance between two points
#             dlat = lat2 - lat1
#             dlon = lon2 - lon1
#             a = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
#             c = 2 * math.asin(math.sqrt(a))
#             distance += abs(c) * 6371000  # Earth radius in meters

#         if _location == end_time:
#             locationManager.stopUpdatingLocation()
#     }

#     locationManager.delegate = updateLocation
#     locationManager.startUpdatingLocation()

#     # Run a background thread to avoid freezing the UI
#     DispatchQueue.global(qos: .background).async {
#         while true {
#             if self.end_time <= datetime.datetime.now():
#                 locationManager.stopUpdatingLocation()
#                 break
#         }
#         dispatch_async(dispatch_get_main_queue(), { self.updateLocation(nil) })
#     }

# # Start fetching GPS data
# fetchGPSData()

# print(f"Total distance traveled: {distance} meters")