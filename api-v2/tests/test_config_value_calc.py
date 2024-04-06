import unittest
import traceback
from roster_generator import RosterGenerator


class TestConfigValues(unittest.TestCase):
    gen = RosterGenerator(5, 3)

    def test_total_slots(self):
        """ Test : Compute total number of possible shifts
            Expect result to be product of parameters
        """
        self.assertEqual(1095, self.gen.calculate_total_slots(365, 3))
        self.assertEqual(90, self.gen.calculate_total_slots(
            30, 3))

    def test_slots_per_employee(self):
        """Test: Compute maximum shifts per imployee
           Expect integer result
        """
        self.assertEqual(18, self.gen.calculate_slots_per_staff_member(90, 5))
        self.assertEqual(0, self.gen.calculate_slots_per_staff_member(4, 5))

    def test_freq_dict(self):
        """Test: Generate a tracking map to control max no of shifts"""
        expected = {'1': 0, '2': 0, '3': 0}
        self.assertDictEqual(expected,
                             self.gen.create_frequency_map(3))


if __name__ == '__main__':
    try:
        unittest.main()
    except:
        print("Fatal exception while trying to run tests.")
        traceback.print_exc()
