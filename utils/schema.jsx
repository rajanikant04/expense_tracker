import { integer, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Budgets=pgTable('Budgets', {
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
    icon:varchar('icon'),
    createdBy:varchar('createdBy').notNull()
})

export const Expenses=pgTable('Expenses',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
    budgetId:integer('budgetId').references(()=> Budgets.id),
    createdAt:varchar('createdAt').notNull()
})