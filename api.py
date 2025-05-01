from flask import Flask, request, jsonify
import psycopg2
from datetime import datetime

app = Flask(__name__)

conn = psycopg2.connect(
    host="localhost",
    user="postgres",
    password="123",
    database="morse_decoder"
)

@app.route('/api/morse', methods=['POST'])
def receive_morse():
    data = request.json
    sinal = data.get('sinal')

    try:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO sinais_morse (sinal) VALUES (%s)",
            (sinal,)
        )
        conn.commit()
        return jsonify({"status": "success", "sinal": sinal}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)