from pydantic import BaseSettings
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    celery_result_broker: str
    celery_result_backend: str

    class Config:
        env_file = ".env"


settings = Settings()
