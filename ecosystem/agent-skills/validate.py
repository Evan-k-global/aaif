import json
from pathlib import Path
from skills_ref import validate, read_properties, to_prompt
skill = Path('ecosystem/agent-skills/skills/zeko-state-actions')
problems = validate(skill)
assert problems == [], problems
props = read_properties(skill)
prompt = to_prompt([skill])
print(json.dumps({'officialReferenceValidatorPassed': not problems,
    'skillMetadataParsed': props.name == 'zeko-state-actions', 'promptContainsSkill': 'zeko-state-actions' in prompt}))
