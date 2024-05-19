import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export default supabase;

// Fetch all data from a table
export async function fetchDataById(tableName: string, id: number) {
    try {
        const { data, error } = await supabase.from(tableName).select('*').eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
        return data[0];
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Fetch all data from a table
export async function fetchAllData(tableName: string, id: number) {
  try {
    const { data, error } = await supabase.from(tableName).select('*').eq('id', id);
    if (error) {
      throw new Error(error.message);
    }
    return data[0];
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

// Add more data fetching methods as needed
// ...