import dash
from dash import html, dash_table, dcc
import psycopg2
import pandas as pd
from dash.dependencies import Input, Output

MORSE_CODE = { ... }

app = dash.Dash(__name__)

app.layout = html.Div([
    html.H1("Sinais Morse em Tempo Real", style={'textAlign': 'center'}),
    dcc.Interval(id='interval', interval=3000),
    dash_table.DataTable(
        id='tabela',
        columns=[
            {"name": "ID", "id": "id"},
            {"name": "Sinal", "id": "sinal"},
            {"name": "Letra", "id": "letra"},
            {"name": "Data/Hora", "id": "created_at"}
        ],
        style_table={'width': '80%', 'margin': '0 auto'}
    )
])

@app.callback(
    Output('tabela', 'data'),
    Input('interval', 'n_intervals')
)
def update_table(n):
    try:
        conn = psycopg2.connect(
            host="localhost",
            user="postgres",
            password="123",
            database="morse_decoder"
        )
        df = pd.read_sql("SELECT * FROM sinais_morse ORDER BY created_at DESC LIMIT 10", conn)
        df['letra'] = df['sinal'].map(MORSE_CODE).fillna('?')
        return df.to_dict('records')
    except Exception as e:
        print(f"Erro: {e}")
        return []

if __name__ == '__main__':
    app.run(debug=True)