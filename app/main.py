from celery.result import AsyncResult
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Body, FastAPI
from fastapi.responses import JSONResponse

from .tasks import app as celery_app
from .tasks import process


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/generate", status_code=201)
def run_task(payload=Body(...)):
    task = process.delay()
    return JSONResponse({"task_id": task.id})


@app.get("/task-status/{task_id}")
def get_status(task_id):
    task_result = AsyncResult(task_id, app=celery_app)

    response = {
        "task_id": task_id,
        "state": task_result.state,
        "progress": None,
        "result": None,
    }

    if task_result.state == "PROGRESS":
        response["progress"] = task_result.info

    elif task_result.state == "SUCCESS":
        response["result"] = task_result.result

    elif task_result.state == "FAILURE":
        response["result"] = str(task_result.result)

    return JSONResponse(response)
