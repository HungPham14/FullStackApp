'''
Author: Hung Pham
See Recommendation System Version 1.2 Notebook for more detail
'''

import numpy as np
import pandas as pd
from scipy.sparse.linalg import svds

def recommend_products(customerID, number_of_product_for_recommendation):
    actual_sales = pd.read_csv('actual_sales.csv')
    df = actual_sales.groupby(['CustomerID', 'Description']).agg({'Quantity':'sum'})
    df.reset_index(drop=False, inplace=True)

    Ratings = df.pivot(index='CustomerID', columns='Description', values='Quantity').fillna(0)
    ratings_matrix = Ratings.values
    ratings_mean = np.mean(ratings_matrix, axis=1)
    ratings_mean = ratings_mean.reshape(-1,1)
    ratings_demeaned = ratings_matrix - ratings_mean

    # SVD
    U, sigma, Vt = svds(ratings_demeaned, k = 50)
    sigma = np.diag(sigma)
    k_rank_matrix = np.dot(np.dot(U, sigma), Vt)
    predicted_ratings = k_rank_matrix + ratings_mean
    prediction_ratings = pd.DataFrame(data=predicted_ratings, index=df.CustomerID.unique(), columns=df.Description.unique())

    # Get and sort the customer's ratings
    sorted_customer_predictions = prediction_ratings.loc[customerID].sort_values(ascending=False).reset_index()
    sorted_customer_predictions = sorted_customer_predictions.rename(columns = {'index': 'Description'})
    
    customer_data = df[df.CustomerID == (customerID)]
    customer_data = customer_data.sort_values(['Quantity'], ascending=False)
    
    # List of products that the customer hasn't rated
    unrated_products = df[~df['Description'].isin(customer_data['Description'])]
    
    # Recommend the highest predicted rating products that the customer hasn't purchased yet.
    recommendations = unrated_products.merge(sorted_customer_predictions, how = 'left', left_on = 'Description', right_on = 'Description')
    recommendations = recommendations.rename(columns = {customerID: 'score'})
    recommendations = recommendations.sort_values('score', ascending = False)
    recommendations = recommendations[['Description', 'score']]
    recommendations = recommendations.rename(columns = {'Description': 'Product'})
    recommendations.drop_duplicates(inplace=True)
    recommendations = recommendations.iloc[:number_of_product_for_recommendation, :-1].reset_index(drop=True)
    # return customer_data, recommendations

    # Modify to Return only string
    result = [f"{i+1}. {recommendations.loc[i,'Product'].strip()}" for i in recommendations.index]
    result = '\n'.join(result)
    result
    return result

# recommendations = recommend_products(18287,10)
# recommendations