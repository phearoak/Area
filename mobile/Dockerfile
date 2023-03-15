FROM reactnativecommunity/react-native-android:latest

WORKDIR /var/react-native

COPY package*.json /var/react-native/
RUN yarn install

COPY . /var/react-native/

CMD [ "./docker-entrypoint.sh" ]