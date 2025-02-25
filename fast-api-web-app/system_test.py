from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional

# define model Item
class Item(BaseModel):
    name: str
    quantity: Optional[int] = 0

app = FastAPI()

items = {"scissors": Item(name="scissors", quantity=100)}


@app.get("/items")
def read(name: str):
    if name not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    return items[name]