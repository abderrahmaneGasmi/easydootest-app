import React from "react";
import { useStorageState } from "./usestorageState";
import { loginApi } from "@/api/auth";
import { router } from "expo-router";
import Toast from "react-native-root-toast";

const AuthContext = React.createContext<{
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: (username: string, password: string) => Promise.resolve(false),
  signOut: () => null,
  session: null,
  isLoading: true,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  console.log(value);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async (username: string, password: string) => {
          try {
            const data = await loginApi({ username, password });

            if (data.status === 401) {
              Toast.show("Invalid username or password", {
                position: Toast.positions.BOTTOM,
              });

              return false;
            }

            Toast.show("Login successful", {
              position: Toast.positions.BOTTOM,
            });

            setSession("123"); // Assuming setSession is defined somewhere
            return true;
          } catch (error) {
            Toast.show("An error occurred", {
              position: Toast.positions.BOTTOM,
            });
            return false;
          }
        },
        signOut: () => {
          setSession(null);
          router.replace("/sign-in");
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
