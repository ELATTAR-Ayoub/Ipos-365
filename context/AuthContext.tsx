import { createContext, use, useContext, useEffect, useState } from "react";

// components
import Loader from "@/components/Loader";
import { toast } from "sonner";

// route
import { useRouter, usePathname } from "next/navigation";

// constants
import { User } from "@/constants/interfaces";

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User>({
    ID: "",
    docID: "",
    userName: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = false;

    return () => {
      mounted = false;
    };
  }, []);

  const signup = () => {
    toast("Your account has been created successfuly.", {
      description: "Welcome to the family!",
    });
    router.push(`/login`);
  };

  const login = () => {
    toast("You’ve logged in successfully.", {
      description: "Welcome to your account!",
    });
    router.push(`/`);
  };

  const resetPassword = () => {
    router.push(`/login/forgot_password/1`);
  };

  const createNewPassword = () => {
    toast("Password updated successfuly!", {
      description: "Your new password is now active.",
    });
    router.push(`/login/forgot_password/successful`);
  };

  const getUser = async (uid: string) => {};

  const logout = async () => {
    router.push(`/`);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        resetPassword,
        createNewPassword,
        logout,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
