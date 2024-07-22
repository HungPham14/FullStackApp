'''
Author: Hung Pham
'''
from flask import request, jsonify, render_template
from config import app
import Cortana

# decorator
@app.route('/') 
def index():
    return render_template("index.html")

@app.route('/process', methods=['GET','POST'])
def process():
    # POST request
    if request.method == 'POST':
        data = request.get_json()
        value = data['value']
    
    # GET request
    result = {'response':Cortana.chat(value)}
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)