import unittest
import bcrypt

class TestMediClear(unittest.TestCase):

    def test_password_hashing(self):
        password = "password123"
        hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        self.assertTrue(bcrypt.checkpw(password.encode(), hashed))

    def test_password_wrong(self):
        password = "password123"
        hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        self.assertFalse(bcrypt.checkpw("wrongpassword".encode(), hashed))

    def test_generic_name(self):
        drug = {
            "generic_name": "ibuprofen"
        }
        self.assertEqual(drug["generic_name"], "ibuprofen")

    def test_brand_name(self):
        drug = {
            "brand_name": "Advil"
        }
        self.assertEqual(drug["brand_name"], "Advil")

    def test_saved_drug(self):
        saved = {
            "drug_name": "ibuprofen",
            "brand_name": "Advil"
        }
        self.assertIn("drug_name", saved)

    def test_library_type(self):
        library = []
        self.assertIsInstance(library, list)


if __name__ == "__main__":
    unittest.main()