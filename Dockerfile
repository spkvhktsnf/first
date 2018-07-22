FROM alpine
RUN apk add nodejs
EXPOSE 8080
CMD ["node","server.js"]
