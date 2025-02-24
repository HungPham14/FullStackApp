# from fastapi import FastAPI
# from pydantic_basemodel import *

# # Create an instance of FastAPI / Instantiate app as an object of the FastAPI class
# app = FastAPI()

# # Handle get requests to the root which is either the host alone or the host followed by a single slash
# @app.get("/")
# # Add a query parameter name with a default value "Alan".
# async def root(name: str = "Alan"):
#     # When it return, FastAPI will convert the dictionary to JSON and return it to the client which will be shown in the browser
#     return {"message": f"Hello, {name}"}

# Handle post requests to the /reviews endpoint
# @app.post("/reviews", response_model=DbReview)
# def create_review(review: MovieReview):
#     # Typically we would define a file call crud.py with custom functions to create, read, update, and delete objects in the database. 
#     db_review = crud.create_review(review)
#     return db_review

# @app.put("/reviews", response_model=DbReview)
# def update_review(review: MovieReview):
#     # update the movie review in the database
#     db_review = crud.update_review(review)
#     # return the updated review
#     return db_review

# @app.delete("/reviews", response_model=DbReview)
# def delete_review(review: MovieReview):
#     # delete the movie review in the database
#     db_review = crud.delete_review(review)
#     # return the nothing since the data is gone
#     return {}
