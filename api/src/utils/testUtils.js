import { db } from '../lib/db'

// TODO: rmeove? tests clearing db automatically now
export const clearDbTables = async () => {
  const modelMap = await db._dmmf.modelMap
  const tables = Object.keys(modelMap)

  for (const table in tables) {
    await db.$queryRaw(`DELETE FROM "${table}";`)
  }
}
