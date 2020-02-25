@app
sunny-luf

@static
folder _site

@http
get /admin
get /login
post /logout

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
