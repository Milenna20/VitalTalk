from flask import Flask, request, jsonify
from transformers import GPT2Tokenizer, GPT2LMHeadModel
import torch

app = Flask(__name__)

model_name = "./modelo_afinado"  # Ruta donde guardaste el modelo
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

def generate_response(user_input):
    input_text = f"Usuario: {user_input}\nModelo: "
    input_ids = tokenizer.encode(input_text + tokenizer.eos_token, return_tensors='pt')

    with torch.no_grad():
        output = model.generate(
            input_ids,
            max_length=150,
            num_return_sequences=1,
            pad_token_id=tokenizer.eos_token_id,
            num_beams=5,
            do_sample=True,
            temperature=0.7,
            top_k=50,
            top_p=0.95
        )

    response = tokenizer.decode(output[0], skip_special_tokens=True)
    
    response_text = response.split("Modelo:")[-1].strip()
    return response_text

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message')
    user_id = data.get('user_id') 

    if not user_message:
        return jsonify({"error": "No message provided."}), 400

    response = generate_response(user_message)

    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(port=4000)
