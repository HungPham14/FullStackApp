from requirements import *

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
