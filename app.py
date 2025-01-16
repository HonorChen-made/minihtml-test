from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

# 初始化数据库
def init_db():
    conn = sqlite3.connect('messages.db')
    cursor = conn.cursor()
    cursor.execute('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, content TEXT)')
    conn.commit()
    conn.close()

init_db()

# 提交留言的 API
@app.route('/submit', methods=['POST'])
def submit_message():
    data = request.json
    conn = sqlite3.connect('messages.db')
    cursor = conn.cursor()
    cursor.execute('INSERT INTO messages (content) VALUES (?)', (data['message'],))
    conn.commit()
    conn.close()
    return jsonify({"success": True}), 200

# 获取所有留言的 API
@app.route('/messages', methods=['GET'])
def get_messages():
    conn = sqlite3.connect('messages.db')
    cursor = conn.cursor()
    cursor.execute('SELECT content FROM messages')
    messages = [row[0] for row in cursor.fetchall()]
    conn.close()
    return jsonify(messages), 200

if __name__ == '__main__':
    app.run(debug=True)
