from locust import HttpLocust, TaskSet, task

class UserBehavior(TaskSet):
    @task
    def get_no_message(self):
        self.client.get("/getnomessage")

class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait=5000
    max_wait=9000
