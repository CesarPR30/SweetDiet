from flask import Flask, request, jsonify
from flask_cors import CORS  # Importa CORS
import ollama
import json

app = Flask(__name__)
CORS(app)

@app.route('/generate_meal', methods=['POST'])
def generate_meal():
    data = request.get_json()
    total_kcal = data.get('kcal', 2000)  # Valor por defecto de 2000 kcal si no se proporciona
    allergies = data.get('allergies', [])
    dislikes = data.get('dislikes', [])

    # Proporciones para desayuno, almuerzo y cena
    proporciones = [0.25, 0.45, 0.30]  # Desayuno, Almuerzo, Cena

    if total_kcal <= 0:
        return jsonify({"error": "La cantidad de calorías debe ser mayor que 0"}), 400

    # Calcular kcal para cada comida
    desayuno_kcal = total_kcal * proporciones[0]
    almuerzo_kcal = total_kcal * proporciones[1]
    cena_kcal = total_kcal * proporciones[2]

    # Crear el prompt para Ollama
    allergies_str = ', '.join(allergies) if allergies else 'ninguna'
    dislikes_str = ', '.join(dislikes) if dislikes else 'ninguno'

    prompt = (f"Crear un plan nutricional con Desayuno, Almuerzo y Cena con aproximadamente las siguientes calorías: "
              f"Desayuno {desayuno_kcal:.0f} kcal, Almuerzo {almuerzo_kcal:.0f} kcal, Cena {cena_kcal:.0f} kcal. "
              f"Soy diabético y alérgico a {allergies_str}, y vivo en Perú, Lima. "
              f"Tengo los siguientes disgustos: {dislikes_str}. "
              "Proporcionar un plato de fondo y una bebida para cada comida. "
              "Genera tu respuesta siguiendo esta estructura tipo JSON, no colocar ninguna información extra:\n\n"
              "{\n"
              "  \"Comidas\": {\n"
              "    \"Desayuno\": {\n"
              "      \"Bebida\": {\n"
              "        \"Titulo\": \"\",\n"
              "        \"Kcal\": ,\n"
              "        \"Tiempo\": \"\",\n"
              "        \"Dificultad\": \"\",\n"
              "        \"Ingredientes\": [\n"
              "        ],\n"
              "        \"Preparacion\": [\n"
              "          \"\",\n"
              "          \"\",\n"
              "          \"\"\n"
              "        ]\n"
              "      },\n"
              "      \"Plato\": {\n"
              "        \"Titulo\": \"\",\n"
              "        \"Kcal\": ,\n"
              "        \"Tiempo\": \"\",\n"
              "        \"Dificultad\": \"\",\n"
              "        \"Ingredientes\": [\n"
              "        ],\n"
              "        \"Preparacion\": [\n"
              "          \"\",\n"
              "          \"\",\n"
              "          \"\"\n"
              "        ]\n"
              "      }\n"
              "    },\n"
              "    \"Almuerzo\": {\n"
              "      \"Bebida\": {\n"
              "        \"Titulo\": \"\",\n"
              "        \"Kcal\": ,\n"
              "        \"Tiempo\": \"\",\n"
              "        \"Dificultad\": \"\",\n"
              "        \"Ingredientes\": [\n"
              "        ],\n"
              "        \"Preparacion\": [\n"
              "          \"\",\n"
              "          \"\",\n"
              "          \"\"\n"
              "        ]\n"
              "      },\n"
              "      \"Plato\": {\n"
              "        \"Titulo\": \"\",\n"
              "        \"Kcal\": ,\n"
              "        \"Tiempo\": \"\",\n"
              "        \"Dificultad\": \"\",\n"
              "        \"Ingredientes\": [\n"
              "        ],\n"
              "        \"Preparacion\": [\n"
              "          \"\",\n"
              "          \"\",\n"
              "          \"\"\n"
              "        ]\n"
              "      }\n"
              "    },\n"
              "    \"Cena\": {\n"
              "      \"Bebida\": {\n"
              "        \"Titulo\": \"\",\n"
              "        \"Kcal\": ,\n"
              "        \"Tiempo\": \"\",\n"
              "        \"Dificultad\": \"\",\n"
              "        \"Ingredientes\": [\n"
              "        ],\n"
              "        \"Preparacion\": [\n"
              "          \"\",\n"
              "          \"\",\n"
              "          \"\"\n"
              "        ]\n"
              "      },\n"
              "      \"Plato\": {\n"
              "        \"Titulo\": \"\",\n"
              "        \"Kcal\": ,\n"
              "        \"Tiempo\": \"\",\n"
              "        \"Dificultad\": \"\",\n"
              "        \"Ingredientes\": [\n"
              "        ],\n"
              "        \"Preparacion\": [\n"
              "          \"\",\n"
              "          \"\",\n"
              "          \"\"\n"
              "        ]\n"
              "      }\n"
              "    }\n"
              "  }\n"
              "}"
    )

    response = ollama.chat(model='llama3', messages=[
        {
            'role': 'user',
            'content': prompt
        }
    ])

    if 'message' in response and 'content' in response['message']:
        response_text = response['message']['content']
        cleaned_response = response_text.strip("'")
        response_json = json.loads(cleaned_response)
        return jsonify(response_json)
    else:
        return jsonify({"error": "Error generating recipe"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

