from flask import Flask, request, jsonify
# Flask is a lightweight web framework for building web servers
# request is an object provided by Flask used to handle incoming HTTP request data
# jsonify converts Python objects (e.g., dictionaries) into JSON responses for the client 
from flask_cors import CORS
# CORS: Enables Cross-Origin Resource Sharing, which allows the server to handle requests from a different origin (like the React fronted)
from transformers import AutoModelForCausalLM, AutoTokenizer
# AutoModelForCausalLM loads a language (e.g., GPT-2 for text generations tasks)
# Prepares input text for the model by tokenizing it into a format the model can understand

app = Flask(__name__) # Creates the Flask app instance (app) and configures it with CORS, enabling communication wit the frontend
CORS(app)

# Load the model and tokenizer
model_name = "gpt2" # Specifies the name of the model to be loaded (gpt2)
tokenizer = AutoTokenizer.from_pretrained(model_name) # Loads the tokenizer for the GPT-2 model which is responsible for converting text into input tokens
model = AutoModelForCausalLM.from_pretrained(model_name) # Loads the GPT-2 model, which is capable of generating text based on input tokens.

# Endpoint definition
@app.route('/generate-playlist', methods=['POST']) # Defines a route (/generate-playlist) for the server, which listens for HTTP POST requests.
def generate_playlist(): # Defines the Python function to handle incoming requests at /generate-playlist.
    try: 
        data = request.json # Extracts JSON data from the request body
        genre = data.get("genre", "music") # Retrieves the genre field. If not provided, it defaults to "music".

       # Creates a prompt for the GPT-2 model, asking it to generate a playlist with titles and artists for the specified genre
        prompt = (
            f"Create a playlist of exactly 5 popular {genre} songs. For each song, include the title and artist. \n"
            "1. Bohemian Rhapsody by Queen\n" # An example prompt that guides the model to format its out similarly
            "2. "
        )

        # Tokenize and generate
        inputs = tokenizer(prompt, return_tensors="pt") # Converts the prompt into tokenized input compatible with the GPT-2 model. The return_tensors="pt" ensures the input is in PyTorch tensor format.
        outputs = model.generate( # generate: Generates text using the GPT-2 model
            inputs["input_ids"],
            max_length=300, # Limits the output length to 300 tokens
            temperature=0.8, # Adjusts the randomness of predictions (higher values = more randomness)
            top_p=0.9, # Sampling techniques to increase output diversity
            top_k=50,
            pad_token_id=tokenizer.eos_token_id # Ensures padding is handled correctly
        )

        response = tokenizer.decode(outputs[0], skip_special_tokens=True) # Decodes the model's output back into readable text
        print(f"Raw Model Output: {response}") # Logs the raw output for debugging purposes

        # Parse songs
        songs = [] # Initializes an empty list to store the parsed songs
        for line in response.split("\n"):
            if ". " in line and " by " in line:
                parts = line.split(" by ", 1)
                if len(parts) == 2:
                    title = parts[0].split(". ", 1)[1].strip()
                    artist = parts[1].strip()
                    if title and artist and not any(song['title'] == title for song in songs):
                        songs.append({"title": title, "artist": artist})
        # After parsing songs
        if len(songs) < 5:
            # Add placeholders if fewer than 5 songs are generated 
            while len(songs) < 5:
                songs.append({"title": "Unknwon Song", "artist": "Unknwon Artist"})
        
        return jsonify({"playlist": songs[:5]})
        
        if not songs: 
            return jsonify({"error": "Unable to generate a valid playlist. Please try again with a different genre or parameters."}), 500
        
        return jsonify({"playlist": songs[:5]}) # Sends the list of up to 5 songs back to the client as a JSON response.
    except Exception as e: # Catches any unexpected errors and returns an error message with a 500 (Internal Server Error) status code.
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__': # Starts the Flask server in debug mode, enabling live updates and detailed error logs during development.
    app.run(debug=True)

