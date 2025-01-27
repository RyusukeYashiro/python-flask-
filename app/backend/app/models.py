# Modelはデータベースのテーブルを定義するorデータベースの操作
from . import db, login_manager
from flask_login import UserMixin

# セッションに保存されているユーザー ID からユーザー オブジェクトをリロードするために使用
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# テーブルを定義
class User(db.Model , UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False , index=True)
    email = db.Column(db.String(120), unique=True, nullable=False , index=True)
    password = db.Column(db.String(120), nullable=False)
