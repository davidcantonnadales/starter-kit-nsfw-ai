"use client";

import { User } from "firebase/auth";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

import { useUser } from "reactfire";

interface RoleProviderProps {
  children: ReactNode;
}

interface RoleContextType {
  role: string | null;
  userId: string | null;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const { data, hasEmitted } = useUser();
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  async function getCustomClaimRole(data: User) {
    await data.getIdToken(true);
    const decodedToken = await data.getIdTokenResult(true);
    return decodedToken.claims.stripeRole ?? null;
  }

  useEffect(() => {
    if (data != null) {
      getCustomClaimRole(data).then((role) => {
        console.log("Saving", role, data.uid);
        setRole(role);
        setUserId(data.uid);
      });
    }
  }, [data]);

  return (
    <RoleContext.Provider value={{ role, userId }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};
