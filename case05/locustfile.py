from locust import HttpLocust, TaskSet, task

class UserBehavior(TaskSet):
    # def on_start(self):
    #     """ on_start is called when a Locust start before any task is scheduled """
    #     self.login()

    # def login(self):
    #     self.client.post("/login", {"username":"ellen_key", "password":"education"})

    @task(2)
    def get_second(self):
        self.client.get("/second")

    @task(1)
    def get_first(self):
        self.client.get("/first")

class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait=5000
    max_wait=9000