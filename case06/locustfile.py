from locust import HttpLocust, TaskSet, task

class UserBehavior(TaskSet):
    @task
    def get_first(self):
        self.client.get("/first")
    @task
    def get_second(self):
        self.client.get("/second")

class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait=5000
    max_wait=9000