from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class pastDiscussions(db.Model):
    __tablename__ = 'past_discussions'

    topic = db.Column(db.String(100), nullable=False, primary_key = True)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    link = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<pastDiscussions {self.topic} on {self.date.strftime('%Y-%m-%d')}>"