from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from os import environ
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
DB_HOST = environ.get("MYSQL_HOST")
DB_USER = environ.get("MYSQL_USER")
DB_PASSWORD = environ.get("MYSQL_PASSWORD")
DB_NAME = environ.get("MYSQL_DATABASE")
DB_URL = f"mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:3306/{DB_NAME}"
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URL
db = SQLAlchemy(app)

class People(db.Model):
    __tablename__ = "pessoas"
    id_pessoa = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    rg = db.Column(db.String(100), nullable=False)
    cpf = db.Column(db.String(100), nullable=False)
    data_nascimento = db.Column(db.Date, nullable=False)
    data_admissao = db.Column(db.Date, nullable=False)
    funcao = db.Column(db.String(100), nullable=False)

    def json(self):
        return {
            "id_pessoa": self.id_pessoa,
            "nome": self.nome,
            "rg": self.rg,
            "cpf": self.cpf,
            "data_nascimento": self.data_nascimento,
            "data_admissao": self.data_admissao,
            "funcao": self.funcao,
        }

@app.route("/pessoas", methods=["GET"])
def get_pessoas():
    try:
        pessoas = People.query.all()
        response_data = [pessoa.json() for pessoa in pessoas]

        return make_response(jsonify(response_data), 200, {'Content-Type': 'application/json; charset=utf-8'})
    except Exception as e:
        return make_response(
            jsonify({"message": f"Não foi possível listar pessoas: {str(e)}"}), 500
        )

@app.route("/pessoas/<int:id>", methods=["GET"])
def get_pessoa(id):
    pessoa = People.query.get(id)
    if pessoa is not None:
        return make_response(jsonify(pessoa.json()), 200)
    return make_response(jsonify({"message": "Pessoa nao encontrada"}), 404)


@app.route("/pessoas", methods=["POST"])
def create_pessoa():
    try:
        data = request.get_json()
        new_entry = People(
            nome=data["nome"],
            rg=data["rg"],
            cpf=data["cpf"],
            data_nascimento=data["data_nascimento"],
            data_admissao=data["data_admissao"],
            funcao=data["funcao"],
        )
        db.session.add(new_entry)
        db.session.commit()
        return make_response(jsonify({"message": "Pessoa criada com sucesso"}), 201)
    except Exception as e:
        return make_response(
            jsonify({"message": f"Não foi possivel criar pessoa: {str(e)}"}), 500
        )


@app.route("/pessoas/<int:id>", methods=["PUT"])
def update_pessoa(id):
    try:
        entry = People.query.get(id)
        if entry:
            data = request.get_json()
            entry.nome = data["nome"]  # Corrected attribute name
            entry.rg = data["rg"]
            entry.cpf = data["cpf"]
            entry.data_nascimento = data["data_nascimento"]
            entry.data_admissao = data["data_admissao"]
            entry.funcao = data["funcao"]  # Corrected attribute name
            db.session.commit()
            return make_response(
                jsonify({"message": f"Pessoa {entry.nome} atualizada com sucesso"}), 200
            )
        return make_response(jsonify({"message": "Pessoa nao encontrada"}), 404)
    except Exception as e:
        return make_response(
            jsonify({"message": f"Não foi possivel atualizar pessoa: {str(e)}"}), 500
        )


@app.route("/pessoas/<int:id>", methods=["DELETE"])
def delete_pessoa(id):
    try:
        entry = People.query.get(id)
        if entry:
            db.session.delete(entry)
            db.session.commit()
            return make_response(
                jsonify({"message": f"Pessoa {entry.nome} deletada com sucesso"}), 200
            )
        return make_response(jsonify({"message": "Pessoa nao encontrada"}), 404)
    except Exception as e:
        return make_response(
            jsonify({"message": f"Não foi possivel deletar pessoa: {str(e)}"}), 500
        )

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=5000, debug=True)