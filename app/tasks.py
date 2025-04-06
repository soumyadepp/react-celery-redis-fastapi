import time

from celery import Celery
from .settings import settings

app = Celery(__name__)
app.conf.broker_url = settings.celery_result_broker
app.conf.result_backend = settings.celery_result_backend
MESSAGES = [
    "Initializing...",
    "Understanding requirements...",
    "Generating designs...",
    "Checking compliance...",
    "Almost completed...",
]


@app.task(bind=True, name="process")
def process(self, x: int, y: int):
    total_steps = 5

    for step in range(total_steps):
        time.sleep(1)  # Simulate time-consuming work
        percent_done = int(((step + 1) / total_steps) * 100)
        self.update_state(
            state="PROGRESS",
            meta={"progress": percent_done, "action": MESSAGES[step]},
        )

    return "Generated assets successfully"
