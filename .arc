@app
sunny-luf

@static
folder public

@http
get /admin
get /login
post /logout
get /

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
