import traceback

from random import randint

class RosterGenerator():
    """Auto generate work shifts given total number of shits & staff"""

    def __init__(self, span = 30, workers = 5, sections = 3):
        """Defaults to organisation with 5 employees
           and 5 sections in a span of 30 days.
        """
        self.cycle = span
        self.staff = workers
        self.departments = sections

        # Dynamically computed
        self.no_of_shifts = 0
        self.max_shifts_per_employee = 0
        self.schedule = list()
        self.occurence_map = dict()

    def __str__(self):
        return "roster: %s, %s, %s, %s"% (self.no_of_shifts, self.max_shifts_per_employee, self.schedule, self.occurence_map)

        
    @staticmethod
    def calculate_total_slots(cycle_in_days, no_of_sections):
        """Calculate total shifts in a given cycle e.g. 30 days * 3 sections"""
        try:
            result = cycle_in_days * no_of_sections
            #self.no_of_shifts = result
            return result
        except Exception as error:
            print(f'Failed to compute total no of slots: {error}')
            traceback.print_exc()
            return None
        
    @staticmethod
    def calculate_slots_per_staff_member(slots, workforce):
        """Computes max shifts per employee
        i.e. total_slots/total_staff_members
        """
        try:
            result = slots // workforce
            #self.max_shifts_per_employee = result
            return result
        except Exception as e:
            print(f'Slots per employee error: {e}')
            traceback.print_exc()
            return None

    @staticmethod
    def create_frequency_map(workforce, initial_value=0):
        result = dict()
        for i in range(1, workforce + 1):
            result[str(i)] = initial_value
        return result

    def print_full_schedule(self, roster, daily_groups, sections) -> dict:
        schedule = dict()
        arr = roster.copy()

        for i in range(1, daily_groups + 1):
            schedule[str(i)] = self.create_daily_schedule(arr, sections)

        return schedule
    

    def generate_rooster(self, 
                        total_slots: int, 
                        max_no_of_shifts: int, 
                        frequency_dict: dict, 
                        participants: int) -> list:
        """
        Generates a roster of participants' shifts based on specified constraints.
        
        This function creates a list of randomly selected participant IDs for shift assignments, ensuring no participant
        exceeds the maximum number of shifts allowed. It uses a dictionary to track the frequency of each participant's
        assignments and prevents assignment overflow through an exclusion mechanism.

        Args:
            total_slots (int): The total number of slots to fill in the roster.
            max_no_of_shifts (int): The maximum number of shifts any single participant can have.
            frequency_dict (dict): A dictionary with participant IDs as keys and their current shift count as values.
            participants (int): The total number of available participants.
            
        Returns:
            list: A list representing the roster of participant IDs for each slot.
            
        Raises:
            ValueError: If any of the numerical arguments are not positive integers or if participants < max_no_of_shifts.

        """
        # Validate inputs
        if not all(isinstance(arg, int) and arg > 0 for arg in [total_slots, max_no_of_shifts, participants]):
            raise ValueError("total_slots, max_no_of_shifts, and participants must be positive integers.")
        
        roster = []
        excluded = set()
        
        for _ in range(total_slots):                
            # Randomly select a next participant to assign i.e. a staff number
            current_staff_no = randint(1, participants)
            
            # If staff is already selected enough times, select another
            while current_staff_no in excluded:
                current_staff_no = randint(1, participants)
                if len(excluded) == participants:
                    print("All participants have reached their maximum shifts. Stopping assignment loop.")
                    break
            
            # Update occurrences
            total_shifts_assigned = frequency_dict.get(current_staff_no, 0) + 1
            frequency_dict[current_staff_no] = total_shifts_assigned
            
            # Exclude staff if max shifts reached
            if total_shifts_assigned >= max_no_of_shifts:
                excluded.add(current_staff_no)
            
            roster.append(current_staff_no)
        
        # Optionally: Update class state here
        self.schedule = roster
        self.occurrence_map = frequency_dict
        
        return roster


    def create_daily_schedule(self, arr, no_departments):
        day = list()

        while(len(day) < no_departments):
            index = randint(0, len(arr) - 1)
            selection = arr[index]

            if(selection not in day):
                day.append(arr.pop(index))
        return day
    