import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "firebaseApp";
import { toast } from "react-toastify";

export default function SignUpForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
      toast.success("회원가입이 완료되었습니다.");
    } catch (error: any) {
      toast.error(error?.code);
    }
  };

  const onChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
      const validRegax = /^[a-zA-Z0-9.!@#$%^&*()?{}|~]+@[a-zA-Z0-9.-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!value?.match(validRegax)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }

    if (name === "password") {
      setPassword(value);

      if (value.length < 8) {
        setError("비밀번호는 8자리 이상이어야 합니다.");
      } else if (value !== passwordConfirmation) {
        setError("비밀번호와 비밀번호 확인 값이 다릅니다.");
      } else {
        setError("");
      }
    }

    if (name === "password_confirmaiton") {
      setPasswordConfirmation(value);

      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상이어야 합니다.");
      } else if (value !== password) {
        setError("비밀번호와 비밀번호 확인 값이 다릅니다.");
      } else {
        setError("");
      }
    }
  };

  return (
    <form className="form form--lg" onSubmit={onSubmit}>
      <div className="form__title">회원가입</div>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input type="email" name="email" id="email" value={email} onChange={onChnage} required />
      </div>

      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          required
          onChange={onChnage}
        />
      </div>

      <div className="form__block">
        <label htmlFor="password_confirmaiton">비밀번호 확인</label>
        <input
          type="password"
          name="password_confirmaiton"
          id="password_confirmaiton"
          value={passwordConfirmation}
          onChange={onChnage}
          required
        />
      </div>

      {error && error.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}

      <div className="form__block">
        계정이 있으신가요?
        <Link to="/users/login" className="form__link">
          로그인 하기
        </Link>
      </div>
      <div className="form__block--lg">
        <button type="submit" className="form__btn--submit" disabled={error?.length > 0}>
          회원가입
        </button>
      </div>
    </form>
  );
}
