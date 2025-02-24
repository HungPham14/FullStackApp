from pydantic import BaseModel
from datetime import date

class Review(BaseModel):
    num_stars: int
    text: str
    public: bool = False

class MovieReview(BaseModel):
    movie: str
    # Nest Review in MovieReview
    review: Review

# Define model Item
class Item(BaseModel):
    name: str
    quantity: int = 0
    expiration: date = None
