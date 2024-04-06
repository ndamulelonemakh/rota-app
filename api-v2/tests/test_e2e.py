import traceback
import unittest
from roster_generator import RosterGenerator

class TestGeneratorE2e(unittest.TestCase):
    gen = RosterGenerator()

    # Static inputs
    staff = 5
    sections = 3
    span = 30

    # Dynamic computations
    total_slots = gen.calculate_total_slots(span, sections)
    max_per_employee = gen.calculate_slots_per_staff_member(
        total_slots,
        staff
    )
    freq_dict = gen.create_frequency_map(staff)
    # To no of shifts randomly assigned to each employee
    shifts = list()

    def no_duplicates(self, arr):
        unique = set(arr)
        return True if sum(unique) == sum(arr) else False

    def test_unique_daily_shifts(self):
        """Checks if daily shifts dont have duplicate employees"""
        self.shifts = self.gen.generate_rooster(self.total_slots,
        self.max_per_employee,
        self.freq_dict,
        self.staff)

        day = self.gen.create_daily_schedule(self.shifts, self.sections)
        is_shift_fair = self.no_duplicates(day)
        self.assertTrue(is_shift_fair)

    def test_full_schedule_uniqueness(self):
        self.shifts = self.gen.generate_rooster(self.total_slots,
        self.max_per_employee,
        self.freq_dict,
        self.staff)
        # Expecting five rows for each 3 sections
        daily_group_size = self.span
        full_schedule = self.gen.print_full_schedule(self.shifts,
         daily_group_size, self.sections)

        self.assertEqual(30, len(full_schedule))

        # print('******######x day Calender view######******')
        # print(full_schedule)
        # print('-------------------------------------------')


if __name__ == '__main__':
    try:
        unittest.main()
        print("End-to-ends tests done!")
    except:
        traceback.print_exc()
        
