#!/bin/sh

cd /var/react-native/android
./gradlew assembleDebug
cp /var/react-native/android/app/build/outputs/debug/apk/app-debug.apk /var/react-native/build/client.apk