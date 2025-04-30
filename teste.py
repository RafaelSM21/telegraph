import dash
from dash import html, dash_table, dcc
import psycopg2
import pandas as pd

# --------------------------------------------------------
# 1. Configuração da Conexão com Tratamento de Encoding
# --------------------------------------------------------
try:
    conn = psycopg2.connect(
        host='localhost',
        user='postgres',
        database= "morse_decoder",
        password='123',
    )
    print("✅ Conexão com o PostgreSQL bem-sucedida!")
except Exception as e:
    print(f"❌ Erro na conexão: {e}")
    exit()

# --------------------------------------------------------
# 2. Consulta ao Banco de Dados
# --------------------------------------------------------
try:
    df = pd.read_sql("SELECT * FROM sinais_morse ORDER BY id DESC LIMIT 10", conn)
    print("📊 Dados carregados:")
    print(df.head())  # Debug no terminal
except Exception as e:
    print(f"❌ Erro na consulta: {e}")
    df = pd.DataFrame()  # DataFrame vazio para evitar erros
finally:
    conn.close()  # Fecha a conexão

# --------------------------------------------------------
# 3. Configuração do Dash (com correção do run_server)
# --------------------------------------------------------
app = dash.Dash(__name__)

app.layout = html.Div([
    html.H1("Dashboard - Sinais Morse", style={'textAlign': 'center'}),
    dash_table.DataTable(
        id='tabela',
        columns=[{"name": "ID", "id": "id"}, {"name": "Sinal", "id": "sinal"}],
        data=df.to_dict('records'),
        style_table={'width': '50%', 'margin': '0 auto'},
        style_cell={'textAlign': 'center'}
    )
])

# --------------------------------------------------------
# 4. Inicialização do Servidor (Método atualizado)
# --------------------------------------------------------
if __name__ == '__main__':
    app.run(debug=True)  # Correção: app.run() no lugar de app.run_server()