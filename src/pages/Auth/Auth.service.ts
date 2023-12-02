import { signInWithPopup } from "firebase/auth";
import { I_Login } from "../../types/Auth";
import { authFirebase, googleProvider } from "../../configs/firebase.config";


export default class AuthService {
  login(data: I_Login) {
    // lấy thông tin từ loginInput
  }
  register() {}

  async loginGoogle() {
    try {
      const result = await signInWithPopup(authFirebase, googleProvider);
      console.log(result);

      return result.user;
    } catch (error) {}
  }
}
