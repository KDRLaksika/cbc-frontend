import { createClient } from "@supabase/supabase-js";

const url = "https://nsqamuhdendvtakberya.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zcWFtdWhkZW5kdnRha2JlcnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MzY0NzAsImV4cCI6MjA2MjQxMjQ3MH0.W0ondifODnrQDTAT4A8uLWBdGNKzOeN53jvLuS_va6M";

const supabase = createClient(url, key);

export default async function mediaUpload(file) {
    if (file == null) {
        throw new Error("No file selected");
    }

    const timestamp = new Date().getTime();
    const newName = timestamp + file.name;

    try {
        await supabase.storage.from('images').upload(newName, file, {
            upsert: true,
            cacheControl: '3600',
        });

        const { data } = supabase.storage.from('images').getPublicUrl(newName);
        if (!data || !data.publicUrl) {
            throw new Error("Error retrieving public URL");
        }

        return data.publicUrl;
    } catch (error) {
        throw new Error("Error uploading file");
    }
}