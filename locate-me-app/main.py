import math

coordinate_1 = {
		'latitude': 10.792396168049365
		,'longitude': 106.64261256720364
}
coordinate_2 = {
		'latitude': 10.79221935434552
		,'longitude': 106.64304376105503
}

d=math.acos(
    math.sin(math.radians(coordinate_1['latitude']))*math.sin(math.radians(coordinate_2['latitude']))+math.cos(math.radians(coordinate_1['latitude']))*math.cos(math.radians(coordinate_2['latitude']))*math.cos(math.radians(coordinate_2['longitude'])-math.radians(coordinate_1['longitude']))
)*6371
print(d)


