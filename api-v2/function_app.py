import azure.functions as func
import http
import json
import logging
import time

from roster_generator import RosterGenerator


app = func.FunctionApp()


def prepare_schedule(staff=5, sections=3, span=30) -> dict:
    """
    Prepare the schedule for the roster.

    Args:
        staff (int, optional): The number of staff members. Defaults to 5.
        sections (int, optional): The number of sections in the schedule. Defaults to 3.
        span (int, optional): The time span for the schedule in minutes. Defaults to 30.

    Returns:
        dict: The complete schedule for the roster
    """

    logging.info(f"STEP 1: Calculating total slots for the schedule..")
    total_slots = RosterGenerator.calculate_total_slots(span, sections)
    logging.info(f"Total slots for the schedule: {total_slots}")
    
    logging.info(f"STEP 2: Calculating maximum slots per staff member..")
    max_per_employee = RosterGenerator.calculate_slots_per_staff_member(
        total_slots,
        staff
    )
    logging.info(f"Maximum slots per staff member: {max_per_employee}")
    
    freq_dict = RosterGenerator.create_frequency_map(staff)
    logging.debug(f"Frequency dictionary: {freq_dict}")
    
    gen = RosterGenerator()
    logging.info(f"STEP 3: Generating the roster..")
    start = time.perf_counter()
    roster = gen.generate_rooster(
        total_slots,
        max_per_employee,
        freq_dict,
        staff
    )
    elapsed = round(time.perf_counter() - start, 6)
    logging.info(f"Roster generated ok. Elapsed time: {elapsed} seconds")
    complete_schedule = gen.print_full_schedule(
        roster,
        span,
        sections
    )

    return complete_schedule


def _process_request(req: func.HttpRequest) -> func.HttpResponse:

    span = req.params.get('span')
    staff = req.params.get('staff')
    sections = req.params.get('sections')

    logging.debug('Validating request parameters')
    if not span or not staff or not sections:
        return func.HttpResponse(
            json.dumps({
                "message": "Please provide all the required parameters: span, staff, and sections",
                "error": "InvalidRequest",
                "received": {
                    "span": span,
                    "staff": staff,
                    "sections": sections
                }
            }),
            status_code=http.HTTPStatus.BAD_REQUEST,
            mimetype='application/json'
        )

    logging.info("Request parameters are valid. Waiting for schedule generation to complete...")
    generated_roster = prepare_schedule(staff=int(staff), span=int(span), sections=int(sections))
    logging.info(f"Successfully generated {len(generated_roster)} slots")

    return func.HttpResponse(
        json.dumps(generated_roster),
        status_code=http.HTTPStatus.OK,
        mimetype="application/json"
    )


@app.route(route="GenerateRoster",
           methods=["GET", "POST"],
           auth_level=func.AuthLevel.FUNCTION)
def GenerateRoster(req: func.HttpRequest) -> func.HttpResponse:
    logging.info(f'Python HTTP trigger function receiving a request from: {req.url}')
    start = time.perf_counter()

    try:
        logging.error(f"PRINTING PARAMS: {req.params}")
        logging.info("Processing request...")
        return _process_request(req)
    except Exception as e:
        logging.exception("Unable to generate roster - unexpected error occured")
        return func.HttpResponse(
            f"An error occurred: {e}",
            status_code=http.HTTPStatus.INTERNAL_SERVER_ERROR
        )
    finally:
        elapsed = time.perf_counter() - start
        logging.info(f'Request fully processed in {elapsed} seconds')
