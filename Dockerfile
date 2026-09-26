FROM nginx:1.27-alpine

ENV PORT=8080

COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY docker-entrypoint.d/30-track-config.sh /docker-entrypoint.d/30-track-config.sh
RUN chmod +x /docker-entrypoint.d/30-track-config.sh
COPY index.html contact.html 404.html /usr/share/nginx/html/
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js
COPY logo /usr/share/nginx/html/logo

EXPOSE 8080
