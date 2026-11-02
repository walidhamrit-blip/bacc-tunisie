import { createAdminClient } from "@/lib/supabase";

/**
 * Client Supabase admin (côté serveur / Edge).
 * Remplace l'ancien pool pg + drizzle pour la compatibilité Cloudflare Workers Edge.
 */
export const supabase = createAdminClient();

/**
 * Helper pour insérer une ligne dans une table Supabase.
 */
export async function dbInsert(table: string, row: Record<string, unknown>) {
  const { error } = await supabase.from(table).insert(row);
  if (error) throw error;
}

/**
 * Helper pour sélectionner des lignes d'une table Supabase.
 */
export async function dbSelect<T = any>(
  table: string,
  { columns = "*", filters, orderBy, limit }: {
    columns?: string;
    filters?: Record<string, any>;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
  } = {}
) {
  let query = supabase.from(table).select(columns);

  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      query = query.eq(key, value);
    }
  }

  if (orderBy) {
    query = query.order(orderBy.column, { ascending: orderBy.ascending ?? true });
  }

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as T[];
}

/**
 * Helper pour sélectionner une seule ligne.
 */
export async function dbSelectOne<T = any>(
  table: string,
  { columns = "*", filters }: { columns?: string; filters?: Record<string, any> } = {}
) {
  const rows = await dbSelect<T>(table, { columns, filters, limit: 1 });
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Helper pour mettre à jour une ligne.
 */
export async function dbUpdate(
  table: string,
  { filters, updates }: { filters: Record<string, any>; updates: Record<string, unknown> }
) {
  let query = supabase.from(table).update(updates);
  for (const [key, value] of Object.entries(filters)) {
    query = query.eq(key, value);
  }
  const { error } = await query;
  if (error) throw error;
}

/**
 * Helper pour supprimer une ligne.
 */
export async function dbDelete(table: string, filters: Record<string, any>) {
  let query = supabase.from(table).delete();
  for (const [key, value] of Object.entries(filters)) {
    query = query.eq(key, value);
  }
  const { error } = await query;
  if (error) throw error;
}


