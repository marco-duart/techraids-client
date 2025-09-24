#!/bin/bash

APP_DIR="/home/bulk/tech-raids/techraids-client"
LOG_FILE="$APP_DIR/logs/client.log"
PORT=3006

echo "Starting TechRaids Client..."

cd $APP_DIR

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo "Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "Build failed! Check errors above."
    exit 1
fi

echo "Starting Vite preview server on port $PORT..."
npm run preview -- --port $PORT > $LOG_FILE 2>&1 &

CLIENT_PID=$!
echo $CLIENT_PID > "$APP_DIR/tmp/pids/client.pid"
echo "Client started with PID: $CLIENT_PID"
echo "Logs: $LOG_FILE"