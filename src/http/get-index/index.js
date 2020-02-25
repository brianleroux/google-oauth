let arc = require('@architect/functions')

async function http(req) {
  if (req.path === '/') {
    return {
      html: 'good luck'
    }
  }
  else {
    return arc.http.proxy.public({spa: false})(req)
  }
}

exports.handler = arc.http.async(http)
