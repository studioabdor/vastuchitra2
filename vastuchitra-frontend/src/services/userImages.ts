import { supabase } from "@/integrations/supabase/client";
import type { SavedImage } from "./api";

export const getUserImages = async (): Promise<SavedImage[]> => {
  const { data: images, error } = await supabase
    .from("images")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return images.map((img) => ({
    id: img.id,
    userId: img.user_id,
    imageUrl: img.image_url,
    style: img.style || "",
    textPrompt: img.prompt,
    createdAt: img.created_at,
  }));
};