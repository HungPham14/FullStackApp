'''
Author: Hung Pham
See Recommendation System Version 1.2 Notebook for more detail
'''

import numpy as np
import pandas as pd
from scipy.sparse.linalg import svds

df = pd.read_csv('E-Commerce Data.csv', encoding='cp1252')
df = df[df['CustomerID'].isnull() == False]
df.reset_index(drop=True, inplace=True)

not_products = ['Next Day Carriage', 
                'Discount', 
                'CRUK Commission', 
                'Bank Charges', 
                'Manual', 
                'High Resolution Image']
not_products.append('POSTAGE')
not_products.append('CARRIAGE')

df['Status'] = ['Cancel' if x[0] == 'C' else 'Actual Sales' for x in df['InvoiceNo']]
promotion_index = df[df['Description'].isin(not_products) == True].index
df['Promotion'] = 'No'
for i in promotion_index:
    df['Promotion'][i] = 'Yes'
df_pro = df[df['Promotion'] == 'Yes']
df_pro['Status'] = 'Promotion'
df.drop(promotion_index, inplace=True)
df.reset_index(drop=True,inplace=True)
df = df.drop(['Promotion'], axis=1)
df_pro.reset_index(drop=True, inplace=True)
df = pd.concat([df,df_pro],ignore_index=True)
df = df.drop(['Promotion'], axis=1)
df = df.drop_duplicates()
actual_sales = df[df['Status'] == 'Actual Sales']
# actual_sales.to_csv('actual_sales.csv')