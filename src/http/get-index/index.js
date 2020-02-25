const { google } = require('googleapis')
const { http } = require('@architect/functions')

async function authorized(req) {
  if (req.session.account) {
    return {
      html: `
        <form action=/logout method=post>
          <button>logout</button>
        </form>

        <pre>${JSON.stringify( req.session, null, 2 )}</pre>
      `
    }
  }
}

async function unauthorized(req) {
  if (req.path === '/') {
    let clientID = process.env.GOOGLE_CLIENT_ID
    let secret = process.env.GOOGLE_CLIENT_SECRET
    let redirect = process.env.GOOGLE_REDIRECT_URL
    let oAuth2Client = new google.auth.OAuth2(clientID, secret, redirect)
    let url = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/gmail.readonly'
    })
    return {
      html: `<a href=${url}>Sign in with Google</a>`
    }
  }
  else {
    return http.proxy.public({spa: false})(req)
  }
}

exports.handler = http.async(authorized, unauthorized)
