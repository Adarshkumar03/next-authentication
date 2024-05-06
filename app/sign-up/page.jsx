"use client";
import { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  cr,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignUp() {
  const [email, setEmail] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, isLoading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithRedirect(auth, provider);
      const user = result.user;
      console.log({ user });
      router.push("/");
    } catch (e) {
      console.log("Google Sign-in error: ", e);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem("user", true);
      setEmail("");
      setPassword("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="md:h-screen flex flex-col md:flex-row bg-gray-900">
      <div className="bg-gray-700 h-1/2 md:h-screen rounded-lg shadow-xl w-full md:w-1/2">
        <img
          src="/painting.jpg"
          alt="Sign Up Illustration"
          className="object-fill md:h-screen w-full"
        />
      </div>
      <div className="bg-[#071829] p-10 rounded-lg shadow-xl w-full md:w-1/2 flex flex-col justify-center content-center">
        <div className="mb-16 flex flex-col self-center absolute top-96 md:static md:translate-y-0">
          <svg
            width="110"
            height="67"
            viewBox="0 0 110 67"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-auto ml-auto -mb-5"
          >
            <path
              d="M4.992 19.944C4.992 20.12 5 20.344 5.016 20.616C5.032 20.872 5.064 21.12 5.112 21.36C5.16 21.6 5.24 21.808 5.352 21.984C5.464 22.16 5.616 22.248 5.808 22.248C6.032 22.248 6.28 22.152 6.552 21.96C6.84 21.768 7.248 21.536 7.776 21.264C8 21.152 8.216 21.096 8.424 21.096C8.696 21.096 8.936 21.176 9.144 21.336C9.368 21.496 9.552 21.696 9.696 21.936C9.856 22.176 9.976 22.44 10.056 22.728C10.136 23.016 10.176 23.296 10.176 23.568C10.176 24.592 9.792 25.424 9.024 26.064C8.256 26.704 7.192 27.024 5.832 27.024C5.032 27.024 4.304 27 3.648 26.952C3.008 26.888 2.456 26.704 1.992 26.4C1.544 26.096 1.192 25.632 0.936 25.008C0.696 24.384 0.576 23.512 0.576 22.392V14.256C0.576 13.824 0.6 13.36 0.648 12.864C0.712 12.352 0.832 11.88 1.008 11.448C1.184 11.016 1.44 10.656 1.776 10.368C2.112 10.08 2.56 9.936 3.12 9.936C3.584 9.936 3.944 10.04 4.2 10.248C4.456 10.44 4.648 10.696 4.776 11.016C4.92 11.32 5.008 11.664 5.04 12.048C5.072 12.416 5.088 12.768 5.088 13.104C5.088 13.76 5.08 14.36 5.064 14.904C5.064 15.448 5.056 15.984 5.04 16.512C5.024 17.04 5.008 17.584 4.992 18.144C4.992 18.688 4.992 19.288 4.992 19.944ZM26.0777 18.312C26.0777 19.512 25.9897 20.656 25.8137 21.744C25.6377 22.832 25.2937 23.784 24.7817 24.6C24.2857 25.416 23.5897 26.064 22.6937 26.544C21.8137 27.024 20.6537 27.264 19.2137 27.264C17.7097 27.264 16.5097 27.048 15.6137 26.616C14.7177 26.168 14.0297 25.56 13.5497 24.792C13.0857 24.024 12.7817 23.112 12.6377 22.056C12.4937 21 12.4217 19.856 12.4217 18.624C12.4217 17.952 12.4457 17.272 12.4937 16.584C12.5577 15.896 12.6697 15.232 12.8297 14.592C13.0057 13.936 13.2457 13.32 13.5497 12.744C13.8697 12.168 14.2857 11.664 14.7977 11.232C15.3097 10.8 15.9417 10.464 16.6937 10.224C17.4457 9.968 18.3417 9.84 19.3817 9.84C20.7897 9.84 21.9257 10.072 22.7897 10.536C23.6697 10.984 24.3497 11.6 24.8297 12.384C25.3257 13.152 25.6537 14.048 25.8137 15.072C25.9897 16.096 26.0777 17.176 26.0777 18.312ZM19.2137 23.544C19.7097 23.544 20.1097 23.4 20.4137 23.112C20.7177 22.824 20.9577 22.44 21.1337 21.96C21.3097 21.464 21.4297 20.888 21.4937 20.232C21.5577 19.56 21.5897 18.848 21.5897 18.096C21.5897 17.36 21.5657 16.712 21.5177 16.152C21.4697 15.592 21.3657 15.12 21.2057 14.736C21.0617 14.352 20.8457 14.064 20.5577 13.872C20.2857 13.68 19.9257 13.584 19.4777 13.584C18.9497 13.584 18.5177 13.696 18.1817 13.92C17.8457 14.144 17.5897 14.472 17.4137 14.904C17.2377 15.336 17.1177 15.864 17.0537 16.488C16.9897 17.096 16.9577 17.784 16.9577 18.552C16.9577 19.24 16.9817 19.888 17.0297 20.496C17.0777 21.088 17.1817 21.616 17.3417 22.08C17.5017 22.528 17.7257 22.888 18.0137 23.16C18.3177 23.416 18.7177 23.544 19.2137 23.544Z"
              fill="white"
            />
            <rect x="33" width="47" height="37" rx="8" fill="#00B2FF" />
            <path
              d="M48.368 22.536C48.704 22.536 48.992 22.488 49.232 22.392C49.472 22.28 49.664 22.144 49.808 21.984C49.952 21.824 50.056 21.656 50.12 21.48C50.184 21.288 50.216 21.12 50.216 20.976C50.216 20.576 49.984 20.376 49.52 20.376C49.36 20.376 49.184 20.384 48.992 20.4C48.8 20.4 48.544 20.408 48.224 20.424C47.664 20.456 47.296 20.328 47.12 20.04C46.96 19.752 46.88 19.352 46.88 18.84C46.88 18.408 46.968 18.064 47.144 17.808C47.336 17.552 47.584 17.36 47.888 17.232C48.208 17.088 48.576 17 48.992 16.968C49.408 16.936 49.84 16.92 50.288 16.92C50.8 16.92 51.296 16.968 51.776 17.064C52.272 17.144 52.72 17.32 53.12 17.592C53.52 17.848 53.84 18.232 54.08 18.744C54.32 19.24 54.44 19.912 54.44 20.76C54.44 21.688 54.28 22.544 53.96 23.328C53.64 24.112 53.192 24.784 52.616 25.344C52.056 25.904 51.392 26.344 50.624 26.664C49.856 26.968 49.016 27.12 48.104 27.12C47.176 27.12 46.304 26.976 45.488 26.688C44.672 26.384 43.96 25.904 43.352 25.248C42.744 24.576 42.264 23.712 41.912 22.656C41.56 21.584 41.384 20.288 41.384 18.768C41.384 15.712 41.984 13.456 43.184 12C44.4 10.528 46.168 9.792 48.488 9.792C50.312 9.792 51.712 10.112 52.688 10.752C53.664 11.376 54.152 12.368 54.152 13.728C54.152 14.304 54.08 14.768 53.936 15.12C53.792 15.456 53.608 15.712 53.384 15.888C53.176 16.064 52.936 16.184 52.664 16.248C52.392 16.296 52.136 16.32 51.896 16.32C51.4 16.32 50.976 16.216 50.624 16.008C50.272 15.8 49.992 15.432 49.784 14.904C49.672 14.6 49.472 14.36 49.184 14.184C48.912 14.008 48.592 13.92 48.224 13.92C47.776 13.92 47.408 14.072 47.12 14.376C46.832 14.68 46.6 15.072 46.424 15.552C46.248 16.016 46.12 16.536 46.04 17.112C45.976 17.672 45.944 18.216 45.944 18.744C45.944 19.208 45.992 19.672 46.088 20.136C46.184 20.584 46.328 20.992 46.52 21.36C46.728 21.712 46.984 22 47.288 22.224C47.592 22.432 47.952 22.536 48.368 22.536ZM64.019 27.264C63.011 27.264 62.075 27.104 61.211 26.784C60.363 26.448 59.619 25.936 58.979 25.248C58.339 24.544 57.835 23.664 57.467 22.608C57.115 21.536 56.939 20.272 56.939 18.816C56.939 17.28 57.115 15.952 57.467 14.832C57.835 13.712 58.339 12.792 58.979 12.072C59.635 11.352 60.411 10.816 61.307 10.464C62.219 10.112 63.227 9.936 64.331 9.936C66.603 9.936 68.315 10.64 69.467 12.048C70.619 13.456 71.195 15.536 71.195 18.288C71.195 21.12 70.579 23.328 69.347 24.912C68.131 26.48 66.355 27.264 64.019 27.264ZM61.547 18.816C61.547 19.248 61.595 19.736 61.691 20.28C61.787 20.808 61.939 21.312 62.147 21.792C62.371 22.256 62.651 22.648 62.987 22.968C63.323 23.288 63.739 23.448 64.235 23.448C64.763 23.448 65.179 23.296 65.483 22.992C65.787 22.688 66.019 22.304 66.179 21.84C66.355 21.376 66.467 20.864 66.515 20.304C66.563 19.744 66.587 19.216 66.587 18.72C66.587 18.208 66.531 17.672 66.419 17.112C66.323 16.536 66.163 16 65.939 15.504C65.731 15.008 65.467 14.6 65.147 14.28C64.827 13.96 64.459 13.8 64.043 13.8C63.739 13.8 63.435 13.928 63.131 14.184C62.843 14.424 62.579 14.768 62.339 15.216C62.099 15.648 61.907 16.176 61.763 16.8C61.619 17.408 61.547 18.08 61.547 18.816Z"
              fill="white"
            />
          </svg>
          <p className="text-slate-200">
            Journey to a trillion miles starts from here!!
          </p>
        </div>
        <div className="mb-12 flex flex-col">
          <h1 className="font-semibold text-white text-2xl mb-3 ml-auto mr-auto">
            Sign Up
          </h1>
          <p className="tracking-wider text-slate-200 text-md ml-auto mr-auto">
            Choose a sign up method
          </p>
        </div>

        <div className="mb-5">
          <button
            onClick={handleGoogleSignup}
            className="w-full p-3 mb-3 bg-[#192734] rounded text-white font-semibold hover:bg-gray-600 flex justify-center"
          >
            <svg
              className="w-9 h-6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.3126 10.5415H21.5071V10.5H12.5071V14.5H18.1586C17.3341 16.8285 15.1186 18.5 12.5071 18.5C9.19358 18.5 6.50708 15.8135 6.50708 12.5C6.50708 9.1865 9.19358 6.5 12.5071 6.5C14.0366 6.5 15.4281 7.077 16.4876 8.0195L19.3161 5.191C17.5301 3.5265 15.1411 2.5 12.5071 2.5C6.98458 2.5 2.50708 6.9775 2.50708 12.5C2.50708 18.0225 6.98458 22.5 12.5071 22.5C18.0296 22.5 22.5071 18.0225 22.5071 12.5C22.5071 11.8295 22.4381 11.175 22.3126 10.5415Z"
                fill="#FFC107"
              />
              <path
                d="M3.6601 7.8455L6.9456 10.255C7.8346 8.054 9.9876 6.5 12.5071 6.5C14.0366 6.5 15.4281 7.077 16.4876 8.0195L19.3161 5.191C17.5301 3.5265 15.1411 2.5 12.5071 2.5C8.6661 2.5 5.3351 4.6685 3.6601 7.8455Z"
                fill="#FF3D00"
              />
              <path
                d="M12.5071 22.5C15.0901 22.5 17.4371 21.5115 19.2116 19.904L16.1166 17.285C15.1126 18.0455 13.8646 18.5 12.5071 18.5C9.90605 18.5 7.69755 16.8415 6.86555 14.527L3.60455 17.0395C5.25955 20.278 8.62055 22.5 12.5071 22.5Z"
                fill="#4CAF50"
              />
              <path
                d="M22.3126 10.5415H21.5071V10.5H12.5071V14.5H18.1586C17.7626 15.6185 17.0431 16.583 16.1151 17.2855L16.1166 17.2845L19.2116 19.9035C18.9926 20.1025 22.5071 17.5 22.5071 12.5C22.5071 11.8295 22.4381 11.175 22.3126 10.5415Z"
                fill="#1976D2"
              />
            </svg>
            Sign up with Google
          </button>

          <button
            onClick={() => setShowEmailForm(true)}
            className="w-full p-3 bg-[#192734] rounded text-white font-semibold hover:bg-indigo-500 flex justify-center"
          >
            <svg
              className="w-9 h-6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_dd_4_19)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.4465 3.5C20.7875 3.5 22.0775 4.03 23.0265 4.981C23.9765 5.93 24.5075 7.21 24.5075 8.55V16.45C24.5075 19.24 22.2375 21.5 19.4465 21.5H9.56751C6.77651 21.5 4.50751 19.24 4.50751 16.45V8.55C4.50751 5.76 6.76651 3.5 9.56751 3.5H19.4465ZM21.0375 10.04L21.1175 9.96C21.3565 9.67 21.3565 9.25 21.1065 8.96C20.9675 8.811 20.7765 8.72 20.5775 8.7C20.3675 8.689 20.1675 8.76 20.0165 8.9L15.5075 12.5C14.9275 12.981 14.0965 12.981 13.5075 12.5L9.00751 8.9C8.69651 8.67 8.26651 8.7 8.00751 8.97C7.73751 9.24 7.70751 9.67 7.93651 9.97L8.06751 10.1L12.6175 13.65C13.1775 14.09 13.8565 14.33 14.5675 14.33C15.2765 14.33 15.9675 14.09 16.5265 13.65L21.0375 10.04Z"
                  fill="white"
                />
              </g>
              <defs>
                <filter
                  id="filter0_dd_4_19"
                  x="-1.49292"
                  y="0.5"
                  width="32"
                  height="32"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_4_19"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="effect1_dropShadow_4_19"
                    result="effect2_dropShadow_4_19"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect2_dropShadow_4_19"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
            Sign up with Email
          </button>
        </div>
        {showEmailForm && (
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
            />
            <button
              onClick={handleSignUp}
              className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
            >
              Sign Up
            </button>
          </div>
        )}
        <p className="ml-auto mr-auto text-slate-200">
          Already a user?{" "}
          <Link href="/sign-in" className="text-[#018cca]">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
