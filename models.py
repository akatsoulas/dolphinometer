import os
from datetime import datetime

from sqlalchemy_wrapper import SQLAlchemy


DATABASE = os.environ.get('DATABASE', 'sqlite+pysqlite:///swim.db')
db = SQLAlchemy(DATABASE)


class LogEntry(db.Model):
    __table__name = 'logentry'

    id = db.Column(db.Integer, primary_key=True)
    counter = db.Column(db.Integer, nullable=False)
    added = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def save(self):
        db.add(self)
        db.commit()
        return self

    def delete(self):
        db.query(self.__class__).filter_by(id=self.id).delete()
        db.commit()
