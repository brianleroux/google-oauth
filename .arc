@app
sunny-luf

@static
folder public

@http
get /
get /login
post /logout

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
