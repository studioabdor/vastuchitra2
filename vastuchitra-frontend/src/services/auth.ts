import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { User } from "./api";

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // Get user profile data
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

  return {
    id: data.user.id,
    email: data.user.email!,
    name: profile?.full_name || "User",
    plan: profile?.plan_type || "free",
    createdAt: data.user.created_at,
    imagesRemaining: profile?.images_remaining || 0,
  };
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) throw error;
  if (!user) throw new Error("Registration failed");

  // Profile is created automatically via database trigger
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const newUser: User = {
    id: user.id,
    email: user.email!,
    name: profile?.full_name || name,
    plan: "free" as "free" | "premium" | "professional",
    createdAt: user.created_at,
    imagesRemaining: 5,
  };

  return newUser;
};

export const getCurrentUser = async (): Promise<User | null> => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error || !session) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (!profile) return null;

  return {
    id: session.user.id,
    email: session.user.email!,
    name: profile.full_name || "User",
    plan: profile.plan_type,
    createdAt: session.user.created_at,
    imagesRemaining: profile.images_remaining,
  };
};

export const logout = async (): Promise<void> => {
  await supabase.auth.signOut();
};