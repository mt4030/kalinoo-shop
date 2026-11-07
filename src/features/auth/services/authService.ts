import { supabase } from "@/lib/supabase";


interface SignUpData {
  fullName: string;
  email: string;
  password: string;
}

// Sign in an existing customer
export async function signIn(
  email: string,
  password: string
) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}

// Register a new customer
export async function signUp({
  fullName,
  email,
  password,
}: SignUpData) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    throw error;
  }

  return data;
}