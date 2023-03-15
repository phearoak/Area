container_name="$1"

if [ -z $container_name ]; then
  echo "No container name specified";
  exit 1;
fi

echo "Container: $container_name";

is_healthy=1;

$(docker inspect --format='{{json .State.Running}}' $container_name);
is_healthy=$?;

if [[ is_healthy -eq 0 ]]; then
  echo " • Container is running";
  exit 0;
else
  echo " • Container is not running";
  echo "=> Because $is_healthy"
  exit 1;
fi