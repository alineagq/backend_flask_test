import os
import unittest
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from app import app, db, People

dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
load_dotenv(dotenv_path)

class FlaskAppTestCase(unittest.TestCase):
    def setUp(self):
        app.config[
            "SQLALCHEMY_DATABASE_URI"
        ] = f"mysql+mysqlconnector://{os.environ['DB_USERNAME']}:{os.environ['DB_PASSWORD']}@{os.environ['DB_HOST']}:{os.environ['DB_PORT']}/{os.environ['DB_NAME']}"
        app.config["TESTING"] = True
        self.app = app.test_client()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_info_route(self):
        response = self.app.get("/info")
        data = response.get_json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(data["message"], "API de pessoas")

    def test_get_pessoas_route(self):
        response = self.app.get("/pessoas")
        data = response.get_json()

        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(data, list)

    def test_create_pessoa_route(self):
        data = {
            "nome": "Test Person",
            "rg": "123456",
            "cpf": "7890123456",
            "data_nascimento": "1990-01-01",
            "data_admissao": "2023-01-01",
            "funcao": "Tester",
        }

        response = self.app.post("/pessoas", json=data)
        result = response.get_json()

        self.assertEqual(response.status_code, 201)
        self.assertEqual(result["message"], "Pessoa criada com sucesso")

        # Check if the created person exists in the database
        person = People.query.filter_by(name="Test Person").first()
        self.assertIsNotNone(person)
        self.assertEqual(person.name, "Test Person")

    def test_update_pessoa_route(self):
        # Create a test person
        test_person = People(
            name="Test Person",
            rg="123456",
            cpf="7890123456",
            birth_date="1990-01-01",
            admission_date="2023-01-01",
            role="Tester",
        )
        db.session.add(test_person)
        db.session.commit()

        updated_data = {
            "nome": "Updated Test Person",
            "rg": "654321",
            "cpf": "0123456789",
            "data_nascimento": "1990-02-02",
            "data_admissao": "2023-02-02",
            "funcao": "Updated Tester",
        }

        response = self.app.put(f"/pessoas/{test_person.id}", json=updated_data)
        result = response.get_json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(result["message"], "Pessoa Updated Test Person atualizada com sucesso")

        # Check if the person details are updated in the database
        updated_person = People.query.get(test_person.id)
        self.assertIsNotNone(updated_person)
        self.assertEqual(updated_person.name, "Updated Test Person")

    def test_delete_pessoa_route(self):
        # Create a test person
        test_person = People(
            name="Test Person",
            rg="123456",
            cpf="7890123456",
            birth_date="1990-01-01",
            admission_date="2023-01-01",
            role="Tester",
        )
        db.session.add(test_person)
        db.session.commit()

        response = self.app.delete(f"/pessoas/{test_person.id}")
        result = response.get_json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(result["message"], "Pessoa Test Person deletada com sucesso")

        # Check if the person is deleted from the database
        deleted_person = People.query.get(test_person.id)
        self.assertIsNone(deleted_person)

if __name__ == "__main__":
    unittest.main()
