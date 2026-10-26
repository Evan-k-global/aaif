import json
import sys
import uuid
import urllib.request
from openenv.core.env_server.interfaces import Environment
from openenv.core.env_server.types import Action, Observation, State

config = json.load(sys.stdin)
assert config['base'].startswith('http://127.0.0.1:')

def request(path, data=None):
    req = urllib.request.Request(config['base'] + path, data=None if data is None else json.dumps(data).encode(),
        headers={'Content-Type': 'application/json', 'Authorization': 'Bearer ' + config['fixtureToken']})
    with urllib.request.urlopen(req, timeout=20) as response:
        return json.load(response)

class ReserveAction(Action):
    units: int
    actionId: str

class ReserveObservation(Observation):
    remaining: int
    accepted: bool

class SharedQuotaEnvironment(Environment):
    def __init__(self):
        self._state = State(episode_id=str(uuid.uuid4()), step_count=0)

    def reset(self, **kwargs):
        # An agent/episode restart cannot reset the external shared authority.
        self._state = State(episode_id=str(uuid.uuid4()), step_count=0)
        return ReserveObservation(remaining=request('/state')['remaining'], accepted=False, reward=0)

    def step(self, action, **kwargs):
        result = request('/action', {'units': action.units, 'actionId': action.actionId})
        self._state.step_count += 1
        return ReserveObservation(remaining=request('/state')['remaining'], accepted=result['ok'], reward=1 if result['ok'] else 0)

    @property
    def state(self):
        return self._state

env = SharedQuotaEnvironment()
initial = env.reset()
first = env.step(ReserveAction(**config['actions'][0]))
after_reset = env.reset()
second = env.step(ReserveAction(**config['actions'][1]))
assert initial.remaining == 100 and first.accepted and first.remaining == 30
assert after_reset.remaining == 30 and not second.accepted and second.remaining == 30
print(json.dumps({'officialEnvironmentSubclass': isinstance(env, Environment), 'firstAccepted': first.accepted,
    'resetPreservesSharedBudget': after_reset.remaining == 30, 'secondOverspendRejected': not second.accepted,
    'rewardIsScenarioOnly': second.reward == 0}))
