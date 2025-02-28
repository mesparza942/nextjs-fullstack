import { Request, Response, NextFunction } from "express";
import jwt, {
  JwtHeader,
  VerifyOptions,
  GetPublicKeyOrSecret,
  SigningKeyCallback,
} from "jsonwebtoken";
import jwksClient from "jwks-rsa";

// Extend Express Request to include a "user" property
declare global {
  namespace Express {
    interface Request {
      user?: CognitoToken;
    }
  }
}

// Define an interface for the expected token payload
interface CognitoToken {
  "cognito:username"?: string;
  username?: string;
  [key: string]: any;
}

// Configure the JWKS client using your Cognito User Pool details
const client = jwksClient({
  jwksUri: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
});

// Helper function to retrieve the signing key from Cognito’s JWKS endpoint.
// We cast this function to the GetPublicKeyOrSecret type so that it matches jwt.verify’s expectations.
const getKey: GetPublicKeyOrSecret = (
  header: JwtHeader,
  callback: SigningKeyCallback
): void => {
  if (!header.kid) {
    return callback(new Error("Missing kid in token header"), undefined);
  }
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      return callback(err, undefined);
    }
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
};

// Express middleware to validate the token and extract the username
export function cognitoAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing or invalid Authorization header" });
    return;
  }

  // Extract the token from the header ("Bearer <token>")
  const token = authHeader.split(" ")[1];

  // Define verification options (update issuer and audience as needed)
  const verifyOptions: VerifyOptions = {
    issuer: `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`,
    // Uncomment and set your client ID if you want to verify the audience
    // audience: "<clientId>",
  };

  // Verify the token. We use a generic parameter to tell TypeScript the shape of our decoded token.
  jwt.verify(token, getKey, verifyOptions, (err, decoded: any) => {
    if (err || !decoded) {
      res.status(401).json({
        error:
          "Invalid token: " + (err ? err.message : "Token decoding failed"),
      });
      return;
    }

    // Attach the username (Cognito typically provides this as "cognito:username")
    req.user = {
      username: decoded["cognito:username"] || decoded.username,
      ...decoded,
    };

    next();
  });
}
