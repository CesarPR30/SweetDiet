from flask import Flask, request, jsonify
from PIL import Image
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

CORS(app)

API_KEY = os.getenv('API_KEY')  # Leer la API key desde las variables de entorno

genai.configure(api_key=API_KEY)
model = genai.GenerativeModel(model_name='gemini-1.5-flash')

@app.route('/analyze', methods=['POST'])
def analyze():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image = Image.open(request.files['image'])
    prompt = '¿El producto es recomendable para una persona diabética? Solo responde Producto Apto o Producto No Apto.'
    response = model.generate_content([prompt, image], stream=True)

    buffer = []
    for chunk in response:
        for part in chunk.parts:
            buffer.append(part.text)

    result = ''.join(buffer)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
