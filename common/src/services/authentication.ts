import { scrypt, randomBytes } from "crypto"
import { promisify } from "util"

const scryptAsync = promisify(scrypt)

class Authentication {
  /**
   * The function `pwtToHash` asynchronously generates a hashed password using scrypt with a random
   * salt.
   * @param {string} pass - The `pwtToHash` function you provided is an asynchronous function that
   * takes a password string as input, generates a random salt, and then hashes the password using the
   * scrypt algorithm. The hashed password is then returned in the format of "hashedPassword.salt".
   * @returns The function `pwtToHash` returns a hashed password in the format of
   * `.`.
   */
  async pwtToHash(pass: string) {
    const salt = randomBytes(8).toString("hex")
    const buf = (await scryptAsync(pass, salt, 64)) as Buffer
    const hashedPassword = `${buf.toString("hex")}.${salt}`

    return hashedPassword
  }

  /**
   * The function `pwtCompared` compares a stored hashed password with a received password by hashing
   * the received password and checking for equality.
   * @param {string} storedPass - The `storedPass` parameter is a string that contains the hashed
   * password and salt concatenated with a period (".") separator.
   * @param {string} receivedPass - The `receivedPass` parameter is the password that a user enters or
   * provides, which needs to be compared with a stored password for authentication or verification
   * purposes.
   * @returns The function `pwtCompared` is returning a boolean value indicating whether the hashed
   * version of the received password matches the stored hashed password.
   */
  async pwtCompared(storedPass: string, receivedPass: string) {
    const [storedHashedPass, storedSalt] = storedPass.split(".")

    const receivedBuf = (await scryptAsync(
      receivedPass,
      storedSalt,
      64
    )) as Buffer

    const isReceivedBufEqualToStoredBuf =
      receivedBuf.toString("hex") === storedHashedPass

    return isReceivedBufEqualToStoredBuf
  }
}

export const authenticationService = new Authentication()

// export type A = typeof<ReturnType authenticationService>
export type AuthenticationServiceType = InstanceType<typeof Authentication>
