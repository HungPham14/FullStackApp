'''
Author: Hung Pham
'''
from flask import request, jsonify, render_template
from config import app
import Cortana
import RecommendationSystem

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
        # print(value)

    # GET request
    if value == 'get_recommended_products':
        result = {'response':f"This feature will recommend products based on personal data\nFlow: Log In -> POST user_id (for example: 18287) to the server, server run script on 18287 -> GET result from the Server\nFor example: This is the result for 18287\n{RecommendationSystem.recommend_products(18287,10)}"}
    else:
        result = {'response':Cortana.chat(value)}
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)