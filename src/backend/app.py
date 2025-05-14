from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db, pastDiscussions
from datetime import datetime
from ollama import generate

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db.init_app(app)

with app.app_context():
    def create_tables():
        db.create_all()

@app.route('/pastDiscussions', methods=['POST'])
def add_article():
    data = request.json
    try:
        new_article = pastDiscussions(
            date=datetime.strptime(data['date'], '%Y-%m-%d'),
            topic=data['topic'],
            link=data['link']
        )
        db.session.add(new_article)
        db.session.commit()
        return jsonify({'message': 'Article added successfully', 'topic': new_article.topic}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/pastDiscussions', methods=['GET'])
def get_articles():
    articles = pastDiscussions.query.order_by(pastDiscussions.date.desc()).all()
    result = [
        {
            'date': article.date.strftime('%Y-%m-%d'),
            'topic': article.topic,
            'link': article.link
        } for article in articles
    ]
    return jsonify(result), 200

@app.route('/ollama', methods=['POST'])
def chat_bot():
    try:
        data = request.get_json()
        input_text = data.get('input')
        response = generate('gemma3:1b', input_text)
        print("Input text:", input_text)
        print("Generated response:", response)
        print(response.response)
        return response.response
    except Exception as e:
        print("Error:", e)
        return jsonify({'error': 'Something went wrong'}), 500


if __name__ == '__main__':
    app.run(debug=True)