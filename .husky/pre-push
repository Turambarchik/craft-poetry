 #!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo '🚨 Validating the branch name before pushing the code'

local_branch="$(git rev-parse --abbrev-ref HEAD)"

valid_branch_regex="^(feature|bugfix|improvement|library|prerelease|release|hotfix)\/[a-z0-9._-]+$"

if [[ ! $local_branch =~ $valid_branch_regex ]]
then
    echo "❌🤘🔥 Uh-oh! Your branch name seems to be off-key. In this project, we groove to a specific beat: feature | bugfix | improvement | library | prerelease | release | hotfix. Your commit ain't jamming with our vibe. Time to remix that branch name and rock it again! 🔥🤘❌"
    exit 1
fi

exit 0