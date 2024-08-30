import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

export const Header = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  return (
    <div className="flex justify-end navbar bg-[#F97316] text-primary-content">
      <div>
        <div>
          {
            sessionData?.user && (
              <button
                className="px-4 py-2 ml-8 bg-[#F97316] text-white rounded hover:bg-[#EA580C] transition duration-200"
                onClick={() => router.push('/dashboard')}
              >
                Go To Dashboard
              </button>
            )
          }
        </div>
        <div className="dropdown-end dropdown">
          {sessionData?.user ? (
            <label
              tabIndex={0}
              className="btn-ghost btn-circle avatar btn"
              onClick={() => void signOut()}
            >
              <div className="w-10 rounded-full">
                <Image
                  src={sessionData?.user?.image ?? ""}
                  alt={sessionData?.user?.name ?? ""}
                  width={50}
                  height={50}
                />
              </div>
            </label>
          ) : (
            <button
              className="btn-ghost rounded-btn btn"
              onClick={() => void signIn()}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
