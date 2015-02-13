from locust import HttpLocust, TaskSet, task

class UserBehavior(TaskSet):
    @task
    def get_no_kafka(self):
        self.client.get("/getnokafka")
    @task
    def post_and_abandon(self):
        self.client.post("/postandabandon")

class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait=5000
    max_wait=9000

# locust -H http://192.168.6.21:3000
