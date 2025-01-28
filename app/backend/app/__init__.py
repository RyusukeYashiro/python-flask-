# __init__.pyファイルの最も基本的な役割は、そのディレクトリをPythonのパッケージとして認識させることです。
# これにより、他のモジュールからこのディレクトリ内のファイルをインポートすることが可能になります。

# アプリケーションオブジェクトとデータベースの紐付け、config定義、ログインマネージャーを紐付ける
# Migrateは、データベースをマイグレーション（データ移行）する機能です。

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS

class Base(DeclarativeBase):
    pass
# flaskインスタンス生成
app = Flask(__name__)

# corsの設定
CORS(app , resources={r"/*": 
                    {"origins": ["http://localhost:3000"], 
                    "methods" : ['GET' , "POST" , "PUT" , "DELETE" , "PATCH"]
                    , "allow_credentials" : True}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
# SQLAlchemyのイベントシステムを無効化します。
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# セッションやその他のセキュリティ機能で使用される秘密鍵を設定
app.config['SECRET_KEY'] = 'your-secret-key'
db = SQLAlchemy(model_class=Base)
db.init_app(app)
migrate = Migrate(app, db)
login_manager = LoginManager()
login_manager.init_app(app)


