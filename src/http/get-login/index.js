let arc = require('@architect/functions')
let github = require('./github')

async function login(req) {
  if (req.query.code) {
    let account = await github(req)
    return {
      session: {account},
      location: '/admin'
    }
  }
  else {
    return {
      location: '/admin/?authorized=false'
    }
  }
}

exports.handler = arc.http.async(login)
