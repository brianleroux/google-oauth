const { http } = require('@architect/functions')
const { google } = require('googleapis')

async function login(req) {
  if (req.query.code) {
    try {
      let account = await auth(req)
      return {
        session: { account },
        location: '/?success'
      }
    }
    catch(e) {
      console.log(e)
      return {
        location: `/?failed&message=${e.message}`
      }
    }
  }
  else {
    return {
      location: '/?failed'
    }
  }
}

async function auth(req) {
  let code = req.query.code
  let clientID = process.env.GOOGLE_CLIENT_ID
  let secret = process.env.GOOGLE_CLIENT_SECRET
  let redirect = process.env.GOOGLE_REDIRECT_URL

  let oAuth2Client = new google.auth.OAuth2(clientID, secret, redirect)
  return new Promise(function argh(res, rej) {
    oAuth2Client.getToken(code, function errback(err, tokens) {
      if (err) rej(err)
      else res(tokens)
    })
  })
}

exports.handler = http.async(login)
