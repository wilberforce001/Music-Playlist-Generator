from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoModelForCausalLM, AutoTokenizer

app = Flask(__name__)
CORS(app)

# Load the model and tokenizer
model_name = "gpt2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

@app.route('/generate-playlist', methods=['POST'])
def generate_playlist():
    try: 
        data = request.json
        genre = data.get("genre", "music")

        prompt = (
            f"Create a playlist of exactly 5 popular {genre} songs. For each song, include the title and artist. \n"
            "1. Bohemian Rhapsody by Queen\n"
            "2. "
        )

        # Tokenize and generate
        inputs = tokenizer(prompt, return_tensors="pt")
        outputs = model.generate(
            inputs["input_ids"],
            max_length=300,
            temperature=0.8,
            top_p=0.9,
            top_k=50,
            pad_token_id=tokenizer.eos_token_id
        )

        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        print(f"Raw Model Output: {response}")

        # Parse songs
        songs = []
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
        
        return jsonify({"playlist": songs[:5]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

