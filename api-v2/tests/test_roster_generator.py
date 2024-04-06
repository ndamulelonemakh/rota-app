import traceback
import unittest
from roster_generator import RosterGenerator

class TestRosterGenerator(unittest.TestCase):
    gen = RosterGenerator()
    total_slots = 15
    max_per_unit = 5
    participants = 3
    freq_dict = gen.create_frequency_map(3)

    def test_roster_length(self):
        """Checks if generator returns expected roster length"""
        shifts = self.gen.generate_rooster(self.total_slots,
        self.max_per_unit,
        self.freq_dict,
        self.participants)
        
        self.assertEqual(self.total_slots, len(shifts))

        # Check if slots are divided equally
        expectedDict = self.gen.create_frequency_map(3, 5)
        self.assertDictEqual(expectedDict, self.gen.occurence_map)

if __name__ == '__main__':
    try:
        unittest.main()
    except:
        traceback.print_exc()
