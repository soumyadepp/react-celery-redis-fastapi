# Readme

## Installing Dependencies

### Install & start Redis

#### Linux device

Follow the instructions given in this [page](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-linux/) to install Redis in your Linux machine.

#### Mac device

Follow the instructions given in this [page](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-mac-os/) to install Redis in your MacOS machine.

### Windows device

Follow the instructions given in this [page](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-windows/) to install Redis in your Windows machine.

## Test if Redis is running

Run the following command to check if redis is installed successfully on your device:

```
$ redis-cli ping
PONG
```

**PONG** indicates that redis is running on the designated port.

## Setting up the project

### Setting up the backend, broker and worker

- After cloning the repository, create a Python virtualenv in your local using the command:

  ```bash
  python -m venv celery_test_venv
  ```

- Create a .env file and paste the following in it:

  ```python
  CELERY_RESULT_BROKER="redis://localhost:6379/0"
  CELERY_RESULT_BACKEND="redis://localhost:6379/1"
  ```

- A virtual environment will be created after running this command. Next, install the dependencies using the command:

  ```bash
  pip install -r requirements.txt
  ```

- Now, run the redis server using:

  ```bash
  redis-server
  ```

- Run the celery worker:

  ```bash
  celery -A app.tasks worker -l info
  ```

  You should see the process method under the `tasks` section of the output.

- Run the FastAPI server using the command:

  ```bash
  uvicorn app.main:app --reload
  ```

  or

  ```bash
  uvicorn app.main:app --host 0.0.0.0 --port 8000 # Replace 8000 with your own port if you wish
  ```

**Congratulations! Your backend is all set and running!**

### Setting up the frontend

- Go to the `celery-test-fe` directory and run:

  ```bash
  sudo npm i -g pnpm
  ```

  This will install `pnpm` in your device globally.

- Now run:

  ```bash
  pnpm i
  ```

  to install the dependencies.

- To run the linter, use this command:

  ```bash
  npm run lint
  ```

- To run the frontend on your local, run:

  ```bash
  npm run dev
  ```

- To create a stable build, run:

  ```bash
  npm run build
  ```

- To preview your build, run:
  ```bash
  npm run preview
  ```

### Happy Coding!
