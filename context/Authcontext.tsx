import React from "react";
import { useStorageState } from "./usestorageState";
import { loginApi } from "@/api/auth";
import { router } from "expo-router";
import Toast from "react-native-root-toast";

const AuthContext = React.createContext<{
  signIn: (username: string, password: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: (username: string, password: string) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
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
        signIn: (username: string, password: string) => {
          loginApi({ username, password }).then((data) => {
            if (data.status === 401) {
              Toast.show("Invalid Credentials", {
                position: Toast.positions.BOTTOM,
              });
              return;
            }

            Toast.show("Login Success", {
              position: Toast.positions.BOTTOM,
            });
            setSession("123");
            router.push("/products");
          });
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
