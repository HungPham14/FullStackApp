'''
Chat bot development version 1.0\n
Chat bot development version 1.1.0\n
    rewrite chat() function to follow fullstack flow get input from templates -> chat(input) return response -> send response to frontend\n
    reduced feature to only receive input & send output\n

Author: Hung Pham
'''

import json
import pytz
from datetime import datetime
from difflib import get_close_matches
from typing import List

def load_knowledge_base(file_path: str) -> dict:
    '''
    Load the knowledge base from a JSON file: the path must be a string, the return value is a dict
    '''
    with open(file_path, 'r') as file:
        data: dict = json.load(file)
    return data

def save_knowledge_base(file_path: str, data: dict):
    '''
    Save the knowledge base to the JSON file, the file path is a string and the saved data must be a dict
    '''
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=2)


def find_the_best_match(user_input: str, patterns: List[str]) -> str | None: 
    '''
    Find the best matched pattern which is a list of strings written by user input being a string, the function should return string or none if the pattern it looking for in the knowledge base does not exist
    '''
    matches: list = get_close_matches(
        user_input, # word: is a sequence for which close matches are desired
        patterns,   # possibilities: is a list of sequences against which to match word
        n=1,        # n: (default 3) is the maximum number of close matches to return, n must be greater than 0 (optional)
        cutoff=0.7  # cutoff: (default 0.6) is a float in the range [0, 1]. Possibilities that don’t score at least that similar to word are ignored (optional)
    )
    return matches[0] if matches else None

def get_answer_for_input(user_input: str, knowledge_base: dict) -> str | None:
    '''
    Get response for the user input / question
    '''
    for p in knowledge_base["patterns"]:
        if p["pattern"].lower().strip() == user_input:
            return p["response"]
    return None

# 05. speech to text function
# def speech_to_text(self) -> None:
#     recognizer = speech_recognition.Recognizer()
#     with speech_recognition.Microphone() as mic:
#         print("Listening...")
#         audio = recognizer.listen(mic)
#         self.text="ERROR"
#     try:
#         self.text = recognizer.recognize_google(audio)
#         print("Me  --> ", self.text)
#     except:
#         print("Me  -->  ERROR")

# chatbot
def chat(input: str) -> str:
    knowledge_base: dict = load_knowledge_base("knowledge_base.json")
    now = datetime.now(pytz.timezone("Asia/Saigon"))
    user_input: str = input.lower().strip()

    # find the best match pattern to the input using No.03 function which could exist as a string or none
    best_match: str | None = find_the_best_match(
        user_input=user_input,
        patterns=[p["pattern"].lower().strip() for p in knowledge_base["patterns"]]
    )

    # if there is a best match for the prompt, return the written response else run option write new pattern - response to the knowledge base
    if best_match:
        response: str = get_answer_for_input(best_match, knowledge_base)
        
    elif user_input.lower() == 'what time is it ?':
        response = 'it\'s ' + now.strftime('%I:%M:%S %p')
            
    elif user_input.lower() == 'what date is it ?':
        response = 'it\'s ' + now.strftime('%A, %B %d, %Y')

    else:
        response = "I do not know how to response."

    return response

if __name__ == "__main__":
    chat("what date is it ?")
    chat("what time is it ?")