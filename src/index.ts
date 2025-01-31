import {
  createClientIdAndSecret,
  createToken,
  verifyClientId,
  verifyClientSecret,
} from "./lib/auth";
import { IClientIdAndSecret } from "./lib/types";

class OpenAuth {
  static generateToken(secret: string): string {
    return createToken(secret);
  }

  generateClientIdAndSecret(secret: string): IClientIdAndSecret {
    return createClientIdAndSecret(secret);
  }

  verifyClient(clientId: string, clientSecret: string, secret: string): string | Error {
    const timestamp = clientSecret.slice(
      clientSecret.length - 44,
      clientSecret.length
    );
    const token = verifyClientId(timestamp, secret);
    const ClientSecretData = verifyClientSecret(clientId, clientSecret);
    if (token === ClientSecretData) {
      return OpenAuth.generateToken(secret);
    }
    throw new Error("Authentication failed");
  }

  verifyToken = (token: string, secret: string) => {
    const generateToken = createToken(secret);
    if (generateToken === token) return true;
    return false;
  };
}

export default OpenAuth;
